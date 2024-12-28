import React, {useEffect, useState} from 'react';
import './App.css';
import Appbar from "./components/Appbar";
import Store from "./components/Store";
import {CssBaseline, makeStyles} from "@material-ui/core";
import { createMuiTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles';
import {BrowserRouter,Switch,Route} from "react-router-dom";
import SavedCoupons from "./components/SavedCoupons";
import FavedStores from "./components/FavedStores";
import AppDownloadBanner from "./components/AppDownloadBanner";
import Footer from "./components/Footer";
import FavedCoupons from "./components/FavedCoupons";
import {Client} from "./app/Client";
import {Server} from "./app/Server";
import {Config} from "./app/Config";
import {PushService} from "./app/PushService";
import CircularProgress from "@material-ui/core/CircularProgress";
import LatestCoupons from "./components/LatestCoupons";
import firebase from "firebase/app";
import {Analytics} from "./app/Analytics";
import CookieConsent from "react-cookie-consent";
import About from "./components/About";
import AllStores from "./components/AllStores";


const useStyles = makeStyles(theme => ({
  main: {
    marginTop: 20,
    flex: '1 1 100%',
    [theme.breakpoints.up('sm')]: {
      marginTop: 53,
    },
    fontWeight: 300
  },
  mainContainer: {
    position: 'relative',
    width: '100%',
    maxWidth: 1140,
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column-reverse',
    justifyContent: 'center',
    padding: '0px 8px',
    [theme.breakpoints.up('sm')]: {
      padding: '0px 24px'
    },
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row'
    },
  },
  appbarFix: {
    display: 'block',
    height: 0,
    marginTop: 61
  }
}));



export let theme = createMuiTheme(
    {
      typography: {
        htmlFontSize: 16,
        h1: {
          fontSize: 1.7
        },
        h2: {
          fontSize: 1.3
        },
        fontFamily: [
          'Kanit',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif'
        ].join(','),
        overrides: {
          MuiCssBaseline: {
            '@global': {
              '@font-face': ['Kanit']
            },
          },
        },
      },
      palette: {
        background: {
          default: '#f3f5f5'
        }
      }
    });

theme = responsiveFontSizes(theme);

function App() {
  const classes= useStyles();
  const [isInitialized, setInitialized]= useState(false);
  const [allStores, setAllStores]= useState([]);
  const [topStores, setTopStores]= useState([]);

  useEffect( ()=>{
    (async function initialize(){
      Server.initialize(Config.server);
      firebase.initializeApp(Config.firebaseConfig);
      PushService.initialize();
      await Client.initialize();
      Analytics.initialize(Config.analytics);
      setAllStores(await Server.getAllStores());
      setTopStores(await Server.getTopStores());
      setInitialized(true);
    })();
  }, []);

  return (
      isInitialized?
          <ThemeProvider theme={theme}>
            <BrowserRouter>
              <div className="App">
                <CssBaseline/>
                <Appbar allStores={allStores}/>
                <div className={classes.appbarFix}/>
                {Client.shouldDisplayAppBannerFlag && <AppDownloadBanner/>}
                <main className={classes.main}>
                  <div className={classes.mainContainer}>
                    <Switch>
                      <Route path="/" exact>
                        <LatestCoupons topStores={topStores}/>
                      </Route>
                      <Route path="/coupons/:slug">
                        <Store topStores={topStores}/>
                      </Route>
                      <Route path="/saved-coupons">
                        <SavedCoupons/>
                      </Route>
                      <Route path="/all-stores">
                        <AllStores allStores={allStores}/>
                      </Route>
                      <Route path="/faved-stores">
                        <FavedStores/>
                      </Route>
                      <Route path="/faved-stores-coupons">
                        <FavedCoupons/>
                      </Route>
                      <Route path="/about">
                        <About/>
                      </Route>
                    </Switch>
                  </div>
                </main>
                <CookieConsent style={{justifyContent: 'space-around'}}>
                  We use cookies to enhance your experience while using our website. Read our <a href={"/privacy-policy.html"} target={"_blank"} style={{color: '#fff'}}>Privacy Policy</a> for more details
                </CookieConsent>
                <Footer/>
              </div>
            </BrowserRouter>
          </ThemeProvider>
          :
          <CircularProgress/>
  );
}

export default App;
