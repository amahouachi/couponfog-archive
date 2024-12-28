import React, {useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import {Typography} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from '@material-ui/icons/Close';
import makeStyles from "@material-ui/core/styles/makeStyles";
import withStyles from "@material-ui/core/styles/withStyles";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {openCouponNewWindow, openStoreWebsite} from "../app/Util";
import {Client} from "../app/Client";
import clsx from "clsx";
import {Analytics} from "../app/Analytics";

const useStyles = makeStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  couponPopup: {
    textAlign: 'center',
    padding: theme.spacing(2)
  },
  popupHeader: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'flex-end'
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  popupContent: {
    padding: 40,
    textAlign: 'center',
    color: 'rgb(68, 68, 68)',
    minWidth: 600,
    [theme.breakpoints.down('xs')]: {
      minWidth: 'auto'
    },
  },
  storeName: {
    color: 'rgb(68, 68, 68)',
    fontSize: 31,
    fontWeight: 'bold',
    fontFamily: 'kanit',
    margin: '10px 0px 25px 0px'
  },
  couponName: {
    fontSize: 21
  },
  instructions: {
    fontSize: 12,
    marginTop: 19
  },
  couponCodeContainer: {
    marginTop: 25,
    minHeight: 80,
  },
  couponCode: {
    color: 'rgb(68, 68, 68)',
    display: 'inline-block',
    textTransform: 'uppercase',
    border: '1px solid rgb(205, 205, 205)',
    borderRadius: '4px 4px 4px 4px',
    font: 'normal normal 600 normal 24px / normal "Helvetica Neue", Helvetica, Arial, sans-serif',
    padding: '9px 11px'
  },
  copyCouponCode: {
    color: 'rgb(8, 180, 223)',
    display: 'inline-block',
    left: '3px',
    position: 'relative',
    right: '0px',
    top: '-4px',
    border: '2px solid rgb(8, 180, 223)',
    borderRadius: '2px 2px 2px 2px',
    font: 'normal normal 500 normal 15px / 42px HelveticaNeue'
  },
  codeCopied: {
    fontSize: 12,
    marginTop: 10,
    visibility: 'visible'
  },
  codeCopiedHidden: {
    visibility: 'hidden'
  },
  shopButton: {
    backgroundColor: 'rgb(8, 180, 223)',
    color: '#ffffff',
    marginTop: 40
  },
  couponDetails: {
    textAlign: 'left',
    fontSize: 11,
    color: '#9d9d9d',
    marginTop: 56,
    borderTop: '1px solid #9d9d9d',
    paddingTop: 3
  }
}));

export default function CouponPopup({coupon, onClose}) {
  const theme = useTheme();
  const classes= useStyles();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
  const [codeCopied, setCodeCopied]= useState(false);
  const codeHidden= coupon && coupon.type==='code' && coupon.storeId!==Client.lastOpenedStoreId;
  const onRevealClick= event => {
    Client.setLastOpenedStore(coupon.storeId);
    openCouponNewWindow(coupon.id);
    openStoreWebsite(coupon.storeId, coupon.storeName, coupon.id, false);
  };
  const ShopButton = withStyles(theme => ({
    root: {
      color: '#fff',
      backgroundColor: 'rgb(8, 180, 223)',
      '&:hover': {
        backgroundColor: 'rgb(28,171,223)',
      },
      textTransform: 'none',
      minWidth: 190,
      marginTop: 40
    },
  }))(Button);
  const RevealButton = withStyles(theme => ({
    root: {
      color: '#fff',
      backgroundColor: 'rgb(8, 180, 223)',
      '&:hover': {
        backgroundColor: 'rgb(28,171,223)',
      },
      textTransform: 'none',
      minWidth: 190,
      marginTop: 40
    },
  }))(Button);

  useEffect(() => {
    if(coupon!=null){
      Analytics.logCouponView(coupon);
    }
  },[coupon]);

  return (
      <div className={classes.couponPopup}>
        {
          coupon?
              <Dialog
                  disableBackdropClick
                  disableEscapeKeyDown
                  fullScreen={fullScreen}
                  open={coupon!=null}
                  onClose={()=>{setCodeCopied(false); onClose();}}
                  aria-labelledby="responsive-dialog-title"
              >
                <div className={classes.popupHeader}>
                  <IconButton aria-label="close" className={classes.closeButton} onClick={()=>{setCodeCopied(false); onClose();}}>
                    <CloseIcon />
                  </IconButton>
                </div>
                <div className={classes.popupContent}>
                  <Typography className={classes.storeName} variant={"h3"}>{coupon.storeName}</Typography>
                  <Typography className={classes.couponName} variant={"h1"}>{coupon.name+((coupon.details!=='')?'*':'')}</Typography>
                  <p hidden={coupon.type!=='code' || codeHidden} className={classes.instructions}>Copy the code below and paste it at checkout</p>
                  <div hidden={coupon.type!=='code' || codeHidden} className={classes.couponCodeContainer}>
                    <CopyToClipboard text={coupon.code}
                                     onCopy={
                                       () => {
                                         setCodeCopied(true);
                                         setTimeout(() => {setCodeCopied(false)},2000);
                                       }
                                     }
                    >
                      <div className={classes.couponCode}>{coupon.code}</div>
                    </CopyToClipboard>
                    <div className={clsx(classes.codeCopied, {[classes.codeCopiedHidden]: !codeCopied || codeHidden})}>Copied!</div>
                  </div>
                  {
                    (coupon.type==='code' && codeHidden)?
                        <RevealButton onClick={onRevealClick} href={""} variant={"contained"}>Reveal Code</RevealButton>
                        :
                        <ShopButton onClick={()=>{openStoreWebsite(coupon.storeId, coupon.storeName, coupon.id,  true)}} href={""} variant={"contained"}>{"View Offer"}</ShopButton>
                  }
                  {
                    coupon.details!=="" && !codeHidden &&
                        <p className={classes.couponDetails}>*{coupon.details}</p>
                  }
                </div>
              </Dialog>
          :
              ""
        }
      </div>
);
}