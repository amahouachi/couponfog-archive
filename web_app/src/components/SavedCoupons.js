import React from "react";
import {makeStyles} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import CouponList from "./CouponList";
import {Client} from "../app/Client";
import {Analytics} from "../app/Analytics";
import PageMeta from "./PageMeta";
import {Config} from "../app/Config";

const useStyles = makeStyles(theme => ({
  mainHeadline: {
    textAlign: 'left',
    fontWeight: 700,
    marginBottom: 20,
    [theme.breakpoints.up('sm')]: {
      marginBottom: 40
    },
  },
  mainContent: {
    flex: '1 1 100%'
  }
}));

export default function SavedCoupons(){
  const classes= useStyles();

  Analytics.logSavedCouponsView();

  const coupons= Client.savedCoupons;

  return (
      <React.Fragment>
        {coupons.length > 0 ?
            <div className={classes.mainContent}>
              <Typography variant="h1" className={classes.mainHeadline}>Your Saved Coupons</Typography>
              <CouponList coupons={coupons}/>
            </div>
            :
            <span>You did not save any coupon yet</span>
        }
        <PageMeta
            title={`${Config.webApp.name} - Your saved coupons`}
            description={`Like a coupon but don't have time to use it immediately? Save coupons you like and use them later`}
            uri="/saved-coupons"/>
      </React.Fragment>
  );
}