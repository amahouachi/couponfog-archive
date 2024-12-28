import React, {useState} from 'react';
import {makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import logo from "../cflogo.png";
import Searchbar from "./Searchbar";
import { useHistory } from "react-router-dom";
import AppMenu from "./AppMenu";
import CloseIcon from '@material-ui/icons/Close';
import 'react-smartbanner/dist/main.css';

const useStyles = makeStyles(theme => ({
  logo: {
    width: 110,
    flex: '0 0 auto',
    [theme.breakpoints.up('md')]: {
      width: 140,
    },
  },
  logoImg: {
    height: 'auto',
    maxWidth: '100%',
    marginTop: 5
  },
  appbar: {
    backgroundColor: '#00838f',
    height: 61,
    position: 'relative'
  },
  appbarInner: {
    minHeight: 61,
    width: '100%',
    maxWidth: 1140,
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'center'
  }
}));

export default function NoActionAppbar() {
  const classes = useStyles();
  const history= useHistory();


  return (
      <AppBar className={classes.appbar}>
        <div className={classes.appbarInner}>
          <a onClick={()=>history.push('/')} className={classes.logo}>
            <img alt={"logo"} className={classes.logoImg} src={logo}/>
          </a>
        </div>
      </AppBar>
  );
}
