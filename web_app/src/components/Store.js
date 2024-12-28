import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Sidebar from "./StoreSidebar";
import {useParams} from 'react-router-dom';
import CouponList from "./CouponList";
import {getCurrentMonthYear, isMobileAndroid, openStoreWebsite} from '../app/Util';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteIconBorder from '@material-ui/icons/FavoriteBorder';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import CloseIcon from '@material-ui/icons/Close';
import GetAppIcon from '@material-ui/icons/GetApp';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import {Client} from "../app/Client";
import {DB} from "../app/DB";
import {Server} from "../app/Server";
import {PushService} from "../app/PushService";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import {Config} from "../app/Config";
import clsx from "clsx";
import {Analytics} from "../app/Analytics";
import PageMeta from "./PageMeta";
import QA from "./QA";

const useStyles = makeStyles(theme => ({
  mainContainer: {
    position: 'relative',
    width: '100%',
    maxWidth: 1140,
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column-reverse',
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row'
    },
  },
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
  actionsContainer: {
    marginBottom: 20,
    display: 'block',
    [theme.breakpoints.up('md')]: {
      display: 'none'
    },
  },
  expiredColor: {
    color: '#78909c'
  },
  actionButton: {
    marginRight: 5,
    fontSize: 11,
    textTransform: 'none'
  },
  actionIcon: {
    fontSize: 11
  },
  favIcon: {
    color: 'red'
  },
  progressBar: {
    color: '#00838f'
  },
  hidden:{
    display: 'none'
  },
  noCoupons: {
    marginBottom: 24
  }
}));

const STATUS_STORE_NOT_LOADED= 0;
const STATUS_STORE_FOUND= 1;
const STATUS_STORE_NOT_FOUND= 2;
const STATUS_SERVER_ERROR= 3;

export default function Store({topStores}){
  const classes= useStyles();
  const {slug}= useParams('slug');
  const [store, setStore]= useState(null);
  const [favorite, setFavorite]= useState(false);
  const [status, setStatus]= useState(STATUS_STORE_NOT_LOADED);
  const [enableNotificationAlert, showEnableNotificationAlert]= useState(false);
  const [serverErrorAlert, showServerErrorAlert]= useState(false);
  useEffect( () => {
    (async () => {
      setStatus(STATUS_STORE_NOT_LOADED);
      let foundStore;
      let error;
      let cachedStore;
      cachedStore= await DB.getCachedItem("store:"+slug, false);
      if(cachedStore){
        if(!cachedStore.expired){
          foundStore= cachedStore.item;
        }
      }
      if(!foundStore) {
        [foundStore, error]= await Server.getStore(slug);
      }
      if(foundStore){
        setStore(foundStore);
        setStatus(STATUS_STORE_FOUND);
        setFavorite(Client.isFavoriteStore(foundStore.id));
        Analytics.logStoreView(foundStore);
      }else{
        if(cachedStore){
          setStore(cachedStore.item);
          setStatus(STATUS_STORE_FOUND);
          setFavorite(Client.isFavoriteStore(cachedStore.item.id));
          showServerErrorAlert(true);
          Analytics.logStoreView(cachedStore.item);
        }else{
          if(error){
            setStatus(STATUS_SERVER_ERROR);
          }else{
            setStatus(STATUS_STORE_NOT_FOUND);
          }
        }
      }
      window.scrollTo(0, 0);
    })();
  }, [slug]);
  const toggleFavorite= async () => {
    if(!favorite){
      if(PushService.notificationStatus===PushService.NOTIFICATION_STATUS_NEUTRAL){
        showEnableNotificationAlert(true);
      }
      Client.addFavoriteStore({id: store.id, name: store.name, slug: store.slug});
      Analytics.logFaveStore(store);
    }else{
      Client.removeFavoriteStore(store.id);
      Analytics.logUnfaveStore(store);
    }
    setFavorite(!favorite);
  };
  const enableNotifications= () => {
    showEnableNotificationAlert(false);
    PushService.enableNotification();
  };

  return (
      status===STATUS_STORE_NOT_LOADED?
          <CircularProgress className={classes.progressBar}/>
          :
          status===STATUS_SERVER_ERROR?
              <React.Fragment>
                <span>We are having trouble with our servers. Please retry later.</span>
              </React.Fragment>
              :
              store?
                  <React.Fragment>
                    <PageMeta
                        title={`${store.name} Coupons & Promo Codes for ${getCurrentMonthYear()} - ${Config.webApp.name}`}
                        description={`Find the best ${store.name} coupons with ${Config.webApp.name}`}
                        uri={`/coupons/${store.slug}`}/>
                    <Sidebar {...store} topStores={topStores} favorite={favorite} onToggleFavorite={toggleFavorite}/>
                    <div className={classes.mainContent}>
                      <Typography variant="h1" className={classes.mainHeadline}>{store?store.name+" Coupons & Promo Codes":""}</Typography>
                      <div className={classes.actionsContainer}>
                        <Button
                            variant="outlined"
                            className={classes.actionButton}
                            size={"small"}
                            color="default"
                            startIcon={favorite?<FavoriteIcon  style={{fontSize: 14}} className={classes.favIcon}/>:<FavoriteIconBorder style={{fontSize: 14}}/>}
                            onClick={toggleFavorite}
                        >
                          {favorite?"Remove Favorite":"Add Favorite"}
                        </Button>
                        <Button
                            variant="outlined"
                            size={"small"}
                            color="default"
                            className={classes.actionButton}
                            startIcon={<OpenInNewIcon style={{fontSize: 14}} />}
                            onClick={()=>{openStoreWebsite(store.id, store.name, null, true)}}
                        >
                          {"Shop"}
                        </Button>
                        <Button
                            hidden={true}
                            variant="outlined"
                            size={"small"}
                            color="default"
                            className={clsx(classes.actionButton,{[classes.hidden]: !isMobileAndroid()})}
                            startIcon={<GetAppIcon style={{fontSize: 14}} />}
                            onClick={()=>{window.open(`${Config.androidApp.url+"&referrer=utm_source%3Dcouponfog.com%26utm_medium%3Dbrowser%26utm_campaign%3Dopen-in-app"}`, "_blank")}}
                        >
                          {"Open In-App"}
                        </Button>
                      </div>
                      {
                        store.coupons.length>0?
                            <CouponList coupons={store.coupons} store={{id: store.id, name: store.name, slug: store.slug, url: store.url}}/>
                            :
                            <div className={classes.noCoupons}>{`We have no working coupon for ${store.name} right now. Please check again later.`}</div>
                      }
                      {
                        store.qa.length>0?
                            <React.Fragment>
                              <Typography variant="h1" className={classes.mainHeadline}>{store?store.name+" Frequently Asked Questions":""}</Typography>
                            <QA qa={store.qa}/>
                            </React.Fragment>
                            :
                            ""
                      }
                        {
                        store.expiredCoupons.length>0?
                            <React.Fragment>
                              <Typography variant="h1" className={clsx(classes.mainHeadline,classes.expiredColor)}>{store?"Recently Expired "+store.name+" Coupons":""}</Typography>
                            <CouponList coupons={store.expiredCoupons} expired={true} store={{id: store.id, name: store.name, slug: store.slug, url: store.url}}/>
                            </React.Fragment>
                            :
                            ""
                      }
                          </div>
                    <Snackbar
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'center', }}
                        open={enableNotificationAlert}
                        autoHideDuration={30000}
                        onClose={()=>showEnableNotificationAlert(false)}
                        message={"Receive notifications of new offers from your favorite stores"}
                        action={
                          <React.Fragment>
                            <Button color="secondary" size="small" onClick={enableNotifications}>ENABLE</Button>
                            <IconButton aria-label="close" color="inherit" className={classes.close} onClick={()=>showEnableNotificationAlert(false)} >
                              <CloseIcon />
                            </IconButton>
                          </React.Fragment>
                        }
                    />
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
                  :
                  <h2>Store {slug} does not exist</h2>

  );
}