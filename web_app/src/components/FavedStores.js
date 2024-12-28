import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteIconBorder from '@material-ui/icons/FavoriteBorder';
import Divider from "@material-ui/core/Divider";
import {useHistory} from 'react-router-dom';
import {Client} from '../app/Client';
import {Analytics} from "../app/Analytics";
import PageMeta from "./PageMeta";
import {Config} from "../app/Config";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    textAlign: 'center'
  },
  storeNameContainer: {
    position: 'relative',
    minHeight: 123,
    cursor: 'pointer'
  },
  storeName: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
    textAlign: 'center',
    fontWeight: 400,
    padding: 0,
    fontSize: 17,
    [theme.breakpoints.up('sm')]: {
      fontSize: 19,
    },
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    maxWidth: '80%',
    maxHeight: 120
  },
  mainHeadline: {
    textAlign: 'left',
    fontWeight: 700,
    marginBottom: 20,
    [theme.breakpoints.up('sm')]: {
      marginBottom: 40
    },
  },
  favIconContainer: {
    padding: 0
  },
  favIcon: {
    color: 'red'
  }
}));

export default function FavedStores() {
  const classes = useStyles();

  Analytics.logFavoriteStoresView();

  return (
      <div className={classes.root}>
        <Typography variant="h1" className={classes.mainHeadline}>Your Favorite Stores</Typography>
        {
          Client.favoriteStores.length>0?
              <Grid container spacing={3}>
                {
                  Client.favoriteStores.map(store => {
                    return (
                        <Grid key={`store-${store.slug}`} item xs={6} sm={3}>
                          <FavedStore store={store}/>
                        </Grid>
                    );
                  })
                }
              </Grid>
              :
              <span>You did not add any store to your favorites yet</span>
        }
        <PageMeta
            title={`${Config.webApp.name} - Your Favorite Stores`}
            description={`Like a store and want a quick access to its coupons? Add it to your favorites and instantly find it on this page`}
            uri="/faved-stores"/>
      </div>
  );
}

function FavedStore({store}){
  const classes= useStyles();

  const [favorite, setFavorite]= useState(true);
  const history= useHistory();

  const onToggleFavorite= e => {
    if(favorite){
      Client.removeFavoriteStore(store.id);
      //removeFavStore(store.id);
    }else{
      Client.addFavoriteStore(store);
      //addFavStore(store);
    }
    setFavorite(!favorite);
  };
  const onStoreClick= event => {
    history.push(`/coupons/${store.slug}`);
  };

  return (
      <Paper className={classes.paper}>
        <div className={classes.storeNameContainer} onClick={onStoreClick}>
          <div className={classes.storeName}>
            {store.name}
          </div>
        </div>
        <Divider component={"hr"}/>
        <div className={classes.favIconContainer}>
          <IconButton aria-label="favorite-store" onClick={onToggleFavorite}>
            {favorite?<FavoriteIcon className={classes.favIcon}/>:<FavoriteIconBorder/>}
          </IconButton>
        </div>
      </Paper>

  );
}