import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import CouponList from "./CouponList";
import CircularProgress from '@material-ui/core/CircularProgress';
import {DB} from "../app/DB";
import {Server} from "../app/Server";
import PageMeta from "./PageMeta";
import {Config} from "../app/Config";
import {Client} from "../app/Client";

const useStyles = makeStyles(theme => ({
  mainContent: {
    marginLeft: 0,
    textAlign: 'left',
    flex: '1 1 100%'
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

export default function FavedCoupons(){
  const classes= useStyles();
  const [coupons, setCoupons]= useState([]);
  const [status, setStatus]= useState(STATUS_NOT_LOADED);
  useEffect( () => {
    (async () => {
      setStatus(STATUS_NOT_LOADED);
      try{
        let foundCoupons= await DB.getCachedItem("favedCoupons");
        if(!foundCoupons) {
          console.log("faved coupons not found in cache or cache expired");
          foundCoupons= await Server.getFavedCoupons();
        }else{
          console.log("got faved coupons from cache");
        }
        if(foundCoupons){
          setCoupons(foundCoupons);
          setStatus(STATUS_LOADED);
        }else{
          setStatus(STATUS_SERVER_ERROR);
        }
      }catch (e) {
        setStatus(STATUS_SERVER_ERROR);
        console.log(e);
      }
    })();
  }, []);

  return (
      <React.Fragment>
        {
          status===STATUS_NOT_LOADED?
              <CircularProgress className={classes.progressBar}/>
              :
              status===STATUS_SERVER_ERROR?
                  <React.Fragment>
                    <span className={classes.error}>{Server.serverError}</span>
                  </React.Fragment>
                  :
                  <React.Fragment>
                    <div className={classes.mainContent}>
                      <Typography variant="h1" className={classes.mainHeadline}>Coupons for your favorite stores</Typography>
                      {
                        coupons.length>0?
                            <CouponList coupons={coupons}/>
                            :
                            Client.favoriteStores.length>0?
                                <span>We have no current coupon for your favorite stores. Please check again later.</span>
                                :
                                <span>You did not add any store to your favorites yet.</span>
                      }
                    </div>
                  </React.Fragment>
        }
        <PageMeta
            title={`${Config.webApp.name} - Coupons for your favorite stores`}
            description={`Find all coupons and promotions for your favorite stores`}
            uri="/faved-stores-coupons"/>
      </React.Fragment>
  );
}
