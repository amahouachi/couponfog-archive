import React from "react";
import Paper from "@material-ui/core/Paper";
import makeStyles from "@material-ui/core/styles/makeStyles";
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteIconBorder from '@material-ui/icons/FavoriteBorder';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";
import {openStoreWebsite} from "../app/Util";
import {Link} from "react-router-dom";

const useStyles = makeStyles(theme => ({
  storeNameContainer: {
    display: 'none',
    justifyContent: 'center',
    flexDirection: 'column',
    height: 200,
    textAlign: 'center',
    [theme.breakpoints.up('md')]: {
      display: 'flex'
    },
  },
  storeNameWrapper: {
    position: 'relative',
    flex: '1 1 100%'
  },
  storeName: {
    textAlign: 'center',
    fontSize: 31,
    fontFamily: 'Kanit',
    fontWeight: 'bold',
    color: 'rgb(68, 68, 68)',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
    width: '100%'
  },
  description: {
    fontSize: 14,
    marginTop: 20,
    color: '#607d8b',
  },
  descriptionTitle: {
    padding: '10px 10px 5px 10px',
    color: 'rgba(0, 0, 0, 0.87)',
    fontSize: 16,
    fontWeight: 400
  },
  descriptionContent: {
    padding: '5px 10px 10px 10px',
    fontWeight: 300
  },
  sidebar: {
    width: '100%',
    marginBottom: 30,
    textAlign: 'left',
    [theme.breakpoints.up('md')]: {
      display: 'block',
      minWidth: 270,
      maxWidth: 270,
      marginRight: 20,
    }
  },
  storeNameVisit: {
    marginTop:5
  },
  favIcon: {
    color: 'red'
  },
  storeActions: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  relatedStoreList: {
    margin: 0,
    padding: 0
  },
  relatedStoreListItem: {
    listStyleType: 'none'
  }
}));
export default function StoreSidebar({id,name,url,description,relatedStores,favorite,onToggleFavorite,topStores}){
  const classes= useStyles();

  const onStoreLinkClick= () => {
    openStoreWebsite(id, name, null, true);
  };

  return(
      <div className={classes.sidebar}>
        <Paper>
          <div className={classes.storeNameContainer}>
            <div className={classes.storeNameWrapper}>
              <div className={classes.storeName}>
                {name}
              </div>
            </div>
            <Divider component={"hr"}/>
            <div className={classes.storeActions}>
              <IconButton aria-label="favorite-store" onClick={onToggleFavorite}>
                {favorite?<FavoriteIcon className={classes.favIcon}/>:<FavoriteIconBorder/>}
              </IconButton>
              <IconButton onClick={onStoreLinkClick}>
                <OpenInNewIcon/>
              </IconButton>
            </div>
          </div>
        </Paper>
          {
            description && description.length>0?
                <Paper key={`description`} className={classes.description}>
                  {
                    description.map(({title,content}, index) => {
                      return (
                          <React.Fragment>
                          <div key={"desc-title"} className={classes.descriptionTitle}>{title}</div>
                          <div key={"desc-content"} className={classes.descriptionContent}>{content}</div>
                          </React.Fragment>
                    )
                    })
                  }
                  </Paper>
                :
                ""
          }
        {
          relatedStores && relatedStores.length>0
              ?
              <Paper key={"related-stores"} className={classes.description}>
                <div key={"related-stores-title"} className={classes.descriptionTitle}>Related Stores</div>
                <div key={"related-stores-content"} className={classes.descriptionContent}>
                  <ul className={classes.relatedStoreList}>
                    {
                      relatedStores.map(({id,name,slug}) => {
                        return (
                            <li className={classes.relatedStoreListItem}><Link to={`/coupons/${slug}`}>{name}</Link></li>
                        )
                      })
                    }
                  </ul>
                </div>
              </Paper>
              :
              ""
        }
        {
          topStores && topStores.length>0
              ?
              <Paper key={"top-stores"} className={classes.description}>
                <div key={"top-stores-title"} className={classes.descriptionTitle}>Top Stores</div>
                <div key={"top-stores-content"} className={classes.descriptionContent}>
                  <ul className={classes.relatedStoreList}>
                    {
                      topStores.map(({id,name,slug}) => {
                        return (
                            <li className={classes.relatedStoreListItem}><Link to={`/coupons/${slug}`}>{name}</Link></li>
                        )
                      })
                    }
                  </ul>
                </div>
              </Paper>
              :
              ""
        }

      </div>
  );
}