import React, {useEffect, useState} from "react";
import Paper from "@material-ui/core/Paper";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Link} from "react-router-dom";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  description: {
    fontSize: 14,
    color: '#607d8b',
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
  mainHeadline: {
    textAlign: 'left',
    fontWeight: 700,
    padding: '10px 10px 5px 10px',
    color: 'rgba(0, 0, 0, 0.87)',
    margin: 0
  },
  relatedStoreList: {
    margin: 0,
    padding: 0
  },
  relatedStoreListItem: {
    listStyleType: 'none'
  },
}));
export default function TopStoresSidebar({topStores}){
  const classes= useStyles();

  return(
      <div className={classes.sidebar}>
        <Paper key={'top-stores-container'} className={classes.description}>
          {
            topStores && topStores.length>0
                ?
                <React.Fragment>
                  <Typography variant="h1" className={classes.mainHeadline}>Top Stores</Typography>
                  <div key={"top-stores-content"} className={classes.descriptionContent}>
                    <ul className={classes.relatedStoreList}>
                      {
                        topStores.map(({id,name,slug}) => {
                          return (
                              <li className={classes.relatedStoreListItem}><Link to={`/coupons/${slug}`}>{name}</Link></li>
                          )
                        })
                      }
                      <li className={classes.relatedStoreListItem}><Link to={'/all-stores'}>See all stores</Link></li>
                    </ul>
                  </div>
                </React.Fragment>
                :
                ""
          }
        </Paper>
      </div>
  );
}
