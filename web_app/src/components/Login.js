// Import FirebaseAuth and firebase.
import React, {useState} from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from "firebase";
import {Typography, useTheme} from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery/useMediaQuery";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {useHistory} from 'react-router-dom';

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
    padding: 36,
    textAlign: 'center',
    color: 'rgb(68, 68, 68)',
    minHeight: 400
  },
  title: {
    color: 'rgb(68, 68, 68)',
    fontSize: 26,
    fontWeight: 'bold',
    fontFamily: 'kanit',
    margin: '10px 0px 25px 0px'
  },
}));

export function Login({returnUri='/', onLoginSuccess}){
  const theme = useTheme();
  const classes= useStyles();
  const history= useHistory();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
  const user= "";//getCurrentUser();
// Configure FirebaseUI.
  const firebaseUIConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    callbacks: {
      signInSuccessWithAuthResult: function (authResult) {
        const user= authResult.user;
        const profile= authResult.additionalUserInfo.profile;
        const cfUser= {
          email: user.email,
          displayName: user.displayName,
          isSignUp: authResult.additionalUserInfo.isNewUser
        };
        if(profile && profile.given_name){
          cfUser.firstName= profile.given_name;
        }
        console.log(authResult);
        onLoginSuccess(cfUser);
        history.push(returnUri);
        return false;
      }
    },
    // We will display Google and Facebook as auth providers.
    signInOptions: [
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID
    ]
  };
    return (
        <div className={classes.popupContent}>
          <Typography className={classes.title} variant={"h3"}>Login to Couponfog</Typography>
          <StyledFirebaseAuth uiConfig={firebaseUIConfig} firebaseAuth={firebase.auth()}/>
        </div>
    );
}