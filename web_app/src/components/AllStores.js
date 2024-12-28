import React, {useEffect, useState} from "react";
import Paper from "@material-ui/core/Paper";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Link} from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  description: {
    fontSize: 14,
    color: '#607d8b',
    textAlign: 'left'
  },
  descriptionTitle: {
    padding: '10px 10px 5px 10px',
    color: 'rgba(0, 0, 0, 0.87)',
    fontSize: 20,
    fontWeight: 400,
    textTransform: 'uppercase'
  },
  descriptionContent: {
    padding: '5px 10px 10px 10px',
    fontWeight: 300
  },
  relatedStoreList: {
    margin: 0,
    padding: 0
  },
  relatedStoreListItem: {
    listStyleType: 'none'
  },
  mainHeadline: {
    textAlign: 'left',
    fontWeight: 700,
    marginBottom: 20,
    [theme.breakpoints.up('sm')]: {
      marginBottom: 40
    },
  },
}));
export default function AllStores({allStores}){
  const classes= useStyles();
  const [_sortedStores, setSortedStores]= useState(null);

  useEffect( () => {
    if(allStores.length>0){
      const _allStores= allStores.slice();
      const _sortedStores= [];
      ['abcdefghijklmnopqrstuvwxyz','0123456789'].map((letters, idx1) => {
        const _storesByLetter= {};
        letters.split('').map((firstLetter) => {
          let idx= 0;
          for(const s of _allStores){
            if(s.name.toLowerCase().startsWith(firstLetter)){
              if(!(firstLetter in _storesByLetter)){
                _storesByLetter[firstLetter]= [];
              }
              _storesByLetter[firstLetter].push(s);
              _allStores.splice(idx, 1);
            }else{
              idx++;
            }
          }
        });
        _sortedStores.push(_storesByLetter)
      });

      setSortedStores(_sortedStores);
    }

  }, [allStores]);


  return(
      <div>
        <Typography variant="h1" className={classes.mainHeadline}>All Stores</Typography>
        <Grid container>
                {
                  _sortedStores?
                      _sortedStores.map(storesByLetter => {
                        return Object.keys(storesByLetter).map((firstLetter) => {
                          return (
                              <Grid item key={`stores-grid-item-${firstLetter}`} xs={6} sm={4} md={3} lg={2}>
                                <div className={classes.description}>
                                  <div key={`store-first-${firstLetter}`} className={classes.descriptionTitle}>{firstLetter}</div>
                                  <div key={`store-list-${firstLetter}`} className={classes.descriptionContent}>
                                    <ul className={classes.relatedStoreList}>
                                      {
                                        storesByLetter[firstLetter].map(({id,name,slug}) => {
                                          return (
                                              <li className={classes.relatedStoreListItem}><Link to={`/coupons/${slug}`}>{name}</Link></li>
                                          )
                                        })
                                      }
                                    </ul>
                                  </div>

                                </div>

                              </Grid>
                          )
                        })
                      })
                      :
                      ""
                }
              </Grid>
      </div>
  );
}
