import React from "react";
import {Paper} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import StarBorder from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';
import {getCouponExpireLabel, openCouponNewWindow} from "../app/Util";
import {Client} from "../app/Client";
import clsx from "clsx";

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    textAlign: 'left',
    marginBottom: 10,
    minHeight: 116,
    [theme.breakpoints.up('sm')]: {
      minHeight: 150,
      marginBottom: 20,
    },
    cursor: 'pointer'
  },
  content: {
    display: 'flex',
    flex: '1 1 100%',
    flexDirection: 'column',
    padding: 6,
    paddingTop: 6,
    [theme.breakpoints.up('sm')]: {
      padding: '10px 20px',
      paddingTop: 13,
    },
    justifyContent: 'space-between'
  },
  badge: {
    paddingTop: 6,
    paddingBottom: 6,
    [theme.breakpoints.up('sm')]: {
      paddingBottom: 10,
      paddingTop: 20,
    },
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRight: '1px solid #ddd',
    fontFamily: 'Kanit'
  },
  badgeDiscount: {
    width: 127
  },
  badgeStoreName: {
    width: 179
  },
  discount: {
    textAlign: 'center',
    padding: '0 4px',
    fontWeight: 400,
    fontSize: 12,
    marginTop: 3,
    [theme.breakpoints.up('sm')]: {
      fontSize: 17,
      fontWeight: 700,
      marginTop: 0
    },
    wordBreak: 'break-word'
  },
  couponType: {
    fontSize: 14,
    [theme.breakpoints.up('sm')]: {
      fontSize: 15,
    },
  },
  couponDescription: {
    color: '#607d8b',
    fontSize: 12,
    fontWeight: 300,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    display: '-webkit-box',
    '-webkit-line-clamp': 2,
    '-webkit-box-orient': 'vertical',
    [theme.breakpoints.up('md')]: {
      display: 'block',
      padding: '10px 0px'
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: 14,
    },
  },
  couponName: {
    fontSize: 17,
    fontWeight: 400,
    [theme.breakpoints.up('sm')]: {
      fontSize: 20,
    },
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    display: '-webkit-box',
    '-webkit-line-clamp': 2,
    '-webkit-box-orient': 'vertical'
  },
  arrowContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    color: '#777',
    padding: '0 6px',
    [theme.breakpoints.up('sm')]: {
      padding: '0 10px',
    }
  },
  arrow: {
    fontSize: 17
  },
  savedIcon: {
    fontSize: 22,
    [theme.breakpoints.up('sm')]: {
      fontSize: 25,
    },
    fill: '#fbc02d'
  },
  unsavedIcon: {
    fontSize: 22,
    [theme.breakpoints.up('sm')]: {
      fontSize: 25,
    },
  },
  meta: {
    color: '#78909c',
    fontSize: 12,
    [theme.breakpoints.up('sm')]: {
      fontSize: 13,
    },
  },
  expire: {
    paddingRight: 20
  },
  lastWorked: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'inline'
    },
  },
  expiredColor: {
    color: '#78909c'
  },
  couponTypeCode: {
    color: '#e91e63'
  },
  couponTypeSale: {
    color: '#024ce9'
  },
  couponTypeInStore: {
    color: '#33691e'
  },
  couponTypeDeal: {
    color: '#6433e9'
  },
  discountLine1: {
    fontSize: 19,
    fontWeight: 600,
    [theme.breakpoints.up('sm')]: {
      fontSize: 21
    },
  },
  discountLine2: {
    fontWeight: 400,
    fontSize: 14,
    [theme.breakpoints.up('sm')]: {
      fontSize: 17
    },
  },
  storeName: {
    fontWeight: 600,
    fontSize: 16
  }
}));

export default function Coupon({coupon, displayStore, isSaved, onSave, onUnsave, onClick, expired=false}){
  const classes= useStyles();
  const expireLabel= getCouponExpireLabel(coupon.endDate);

  const handleClickCoupon = () => {
    //TODO rework this
    if(coupon.storeId!==Client.lastOpenedStoreId) {
      openCouponNewWindow(coupon.id);
    }
    onClick(coupon);
  };

  const getBadgeStoreName= () => {
    return (
          <div className={classes.storeName}>{coupon.storeName}</div>
    );
  };
  const getDiscount= () => {
    let line1, line2;
    switch(coupon.discount.type){
      case "dollarOff":
      case "percentOff":
        line1= coupon.discount.value;
        line2= "OFF";
        break;
      case "priceFrom":
        line1= "FROM";
        line2= coupon.discount.value;
        break;
      case "freeShipping":
        line1= "FREE";
        line2= "SHIPPING";
        break;
      case "freeGift":
        line1= "FREE";
        line2= "GIFT";
        break;
      case "freeTrial":
        line1= "FREE";
        line2= "TRIAL";
        break;
      case "bogo":
        line1= "BOGO";
        line2= "";
        break;
      case "rebate":
        line1= "REBATE";
        line2= "";
        break;
      default:
        line1= "DEAL";
        line2= "";
    }
    return (
        <React.Fragment>
          <div className={classes.discountLine1}>{line1}</div>
          <div className={classes.discountLine2}>{line2}</div>
        </React.Fragment>
    );
  };

  let badgeClass= 'couponType';
  switch (coupon.type) {
    case 'code':
      badgeClass+= "Code";
      break;
    case "in-store":
      badgeClass+= "InStore";
      break;
    case "deal":
      badgeClass+= "Deal";
      break;
    default:
      badgeClass+= "Sale";
      break;
  }
  let couponNameClass= classes.couponName;
  let discountClass= classes.discount;
  if(expired){
    badgeClass= "expiredColor";
    discountClass= clsx(classes.discount, classes.expiredColor);
    couponNameClass= clsx(classes.couponName, classes.expiredColor);
  }

  return (
      <React.Fragment>
        <Paper className={classes.container}>
          <div onClick={handleClickCoupon} className={displayStore?clsx(classes.badge, classes.badgeStoreName):clsx(classes.badge, classes.badgeDiscount)}>
            <div className={discountClass}>
              {displayStore?getBadgeStoreName():getDiscount()}
            </div>
            <div className={[classes.couponType, classes[badgeClass]].join(' ')}>
              {coupon.type}
            </div>
          </div>
          <div onClick={handleClickCoupon} className={classes.content}>
            <Typography variant="h2" className={couponNameClass}>{coupon.name}</Typography>
            <Typography variant="body1" className={classes.couponDescription}>
              {coupon.description}
            </Typography>
            <div className={classes.meta}>
              <span hidden={expireLabel===""} className={classes.expire}>{expireLabel}</span>
            </div>
          </div>
          <div className={classes.arrowContainer}>
            {
              isSaved?
                  <StarIcon onClick={()=>{onUnsave(coupon.id);}} className={classes.savedIcon}/>
                  :
                  <StarBorder onClick={()=>{onSave(coupon);}} className={classes.unsavedIcon}/>

            }
            {/*<ArrowForwardIosIcon className={classes.arrow}/>*/}
          </div>
        </Paper>
      </React.Fragment>
  );
}