import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import CouponList from "./CouponList";
import CircularProgress from '@material-ui/core/CircularProgress';
import {DB} from "../app/DB";
import {Server} from "../app/Server";
import {getCurrentMonthYear} from "../app/Util";
import {Config} from "../app/Config";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import {Analytics} from "../app/Analytics";
import PageMeta from "./PageMeta";
import AllStores from "./AllStores";
import TopStoresSidebar from "./TopStoresSidebar";

const useStyles = makeStyles(theme => ({
  mainContent: {
    marginLeft: 0,
    textAlign: 'left',
    flex: '1 1 100%',
    [theme.breakpoints.up('sm')]: {
      marginTop: 9
    },
  },
  mainHeadline: {
    textAlign: 'left',
    fontWeight: 700,
    marginBottom: 20,
    [theme.breakpoints.up('sm')]: {
      marginBottom: 40
    },
  },
  progressBar: {
    color: '#00838f'
  },
  error: {
    fontSize: 18,
    fontWeight: 'normal'
  }
}));

const STATUS_NOT_LOADED= 0;
const STATUS_LOADED= 1;
const STATUS_SERVER_ERROR= 2;

export default function LatestCoupons({topStores}){
  const classes= useStyles();
  const [coupons, setCoupons]= useState([]);
  const [status, setStatus]= useState(STATUS_NOT_LOADED);
  const [serverErrorAlert, showServerErrorAlert]= useState(false);
  useEffect( () => {
    (async () => {
      setStatus(STATUS_NOT_LOADED);
      const cachedItem= await DB.getCachedItem("latestCoupons", false);
      let foundCoupons;
      if(cachedItem && !cachedItem.expired){
        foundCoupons= cachedItem.item;
      }
      if(!foundCoupons) {
        console.log("latest coupons not found in cache or cache expired");
        foundCoupons= await Server.getLatestCoupons();
      }else{
        console.log("got latest coupons from cache");
      }
      if(foundCoupons){
        setCoupons(foundCoupons);
        setStatus(STATUS_LOADED);
      }else{
        if(cachedItem){
          setCoupons(cachedItem.item);
          setStatus(STATUS_LOADED);
          showServerErrorAlert(true);
        }else{
          setStatus(STATUS_SERVER_ERROR);
        }
      }
    })();
    Analytics.logHomeView();
  }, []);

  return (
      <React.Fragment>
        <PageMeta
            title={`Latest Coupons & Promo Codes for ${getCurrentMonthYear()} - ${Config.webApp.name}`}
            description={`Find the best coupons and promotions for your favorite stores with ${Config.webApp.name}`}
            uri="/"/>
            <TopStoresSidebar topStores={topStores}/>
        {
          status===STATUS_NOT_LOADED?
              <CircularProgress className={classes.progressBar}/>
              :
              status===STATUS_SERVER_ERROR?
                  <React.Fragment>
                    <h4 className={classes.error}>{Server.serverError}</h4>
                  </React.Fragment>
                  :
                  <React.Fragment>
                    <div className={classes.mainContent}>
                      <Typography variant="h1" className={classes.mainHeadline}>Latest Coupons &amp; Promo Codes</Typography>
                      <CouponList coupons={coupons}/>
                    </div>
                  </React.Fragment>
        }
        <Snackbar
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center', }}
            open={serverErrorAlert}
            autoHideDuration={6000}
            onClose={()=>showServerErrorAlert(false)}
            message={"Failed to retrieve data from server"}
            action={
              <React.Fragment>
                <IconButton aria-label="close" color="inherit" className={classes.close} onClick={()=>showServerErrorAlert(false)} >
                  <CloseIcon />
                </IconButton>
              </React.Fragment>
            }
        />
      </React.Fragment>
  );
}
