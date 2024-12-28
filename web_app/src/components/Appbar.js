import React, {useEffect, useState} from 'react';
import {makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import logo from "../cflogo.png";
import Searchbar from "./Searchbar";
import {Link, useHistory} from "react-router-dom";
import CloseIcon from '@material-ui/icons/Close';
import 'react-smartbanner/dist/main.css';
import MiniSearch from "minisearch";

const useStyles = makeStyles(theme => ({
  logo: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'inline-flex',
      flex: '0 0 auto',
      width: 140,
      maxHeight: 33
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
    position: 'fixed'
  },
  appToolbar: {
    minHeight: 61,
    width: '100%',
    maxWidth: 1140,
    margin: '0 auto',
    [theme.breakpoints.down('sm')]: {
      padding: '0 8px',
    }
  },
  appBanner: {
    display: 'flex',
    flexDirection: 'column'
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
    textAlign: 'left',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  }
}));

export default function Appbar({allStores}) {
  const classes = useStyles();
  const history= useHistory();
  const [searchFocused, setSearchFocused]= useState(false);

  const handleSearchFocus= focused => event => {
    if(window.innerWidth<668){
      setSearchFocused(focused);
    }
  };
  const handleStoreSelected= slug => {
    history.push(`/coupons/${slug}${window.location.search}`);
  };

  return (
      <AppBar className={classes.appbar}>
        <Toolbar className={classes.appToolbar}>
          <Link to={'/'} className={classes.logo} hidden={window.innerWidth<668}>
            <img alt={"couponfog logo"} className={classes.logoImg} src={logo}/>
          </Link>
          <Searchbar
              onFocusCallback={handleSearchFocus(true)}
              onBlurCallback={handleSearchFocus(false)}
              onClickCallback={handleStoreSelected}
              allStores={allStores}
          />
          {
            searchFocused &&
                <CloseIcon fontSize={"large"}/>
          }
        </Toolbar>
      </AppBar>
  );
}
