import React, {useState} from "react";
import Card from "@material-ui/core/Card";
import CloseIcon from '@material-ui/icons/Close';
import {makeStyles} from "@material-ui/core";
import {DB} from "../app/DB";
import {Config} from "../app/Config";

const useStyles = makeStyles(theme => ({
  appBanner: {
    display: 'flex',
    flexDirection: 'column',
    padding: 5,
    marginBottom: 10
  },
  appBannerInner: {
    display: 'flex'
  },
  appBannerClose: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: 38
  },
  appBannerLogo: {
    width: 50,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  appBannerLogoImg: {
    maxWidth: '100%'
  },
  appBannerContent: {
    fontSize: 12,
    padding: 6,
    marginLeft: 10,
    textAlign: 'left',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    flex: '1 1 100%'
  }
}));
export default function AppDownloadBanner(){
  const classes = useStyles();

  const [hidden, setHidden]= useState(false);

  const onClose= () => {
    setHidden(true);
    DB.setCachedItem("appBannerUserAction", {action: "close"}, Config.androidApp.promo.hideDurationAfterClose);
  };
  const onClick= () => {
    setHidden(true);
    DB.setCachedItem("appBannerUserAction", {action: "click"}, Config.androidApp.promo.hideDurationAfterClick);
    window.open(`${Config.androidApp.url+"&referrer=utm_source%3Dcouponfog.com%26utm_medium%3Dbrowser%26utm_campaign%3Dget-app-banner"}`, "_blank");
  };
  return(
      !hidden &&
      <Card className={classes.appBanner}>
        <div className={classes.appBannerInner}>
          <div onClick={onClick} className={classes.appBannerLogo}>
            <img alt="google play icon" src="/google_play.png" className={classes.appBannerLogoImg}/>
          </div>
          <div onClick={onClick} className={classes.appBannerContent}>
            <div>Download our app
            </div>
            <div>FREE - Available on Google Play</div>
          </div>
          <div className={classes.appBannerClose}>
            <CloseIcon onClick={onClose}/>
          </div>
        </div>
      </Card>
  );
}