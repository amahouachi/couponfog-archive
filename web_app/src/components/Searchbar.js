import React, {createRef, useEffect, useState} from "react";
import InputBase from "@material-ui/core/InputBase";
import {makeStyles} from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from '@material-ui/core/Divider';
import ListSubheader from '@material-ui/core/ListSubheader';
import AppMenu from "./AppMenu";
import {DB} from "../app/DB";
import MiniSearch from 'minisearch';

const useStyles = makeStyles(theme => ({
  searchWrapper: {
    flex: '100 1 auto',
  },
  search: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "#fff",
    color: "#444",
    [theme.breakpoints.up('sm')]: {
      marginRight: theme.spacing(2),
      marginLeft: theme.spacing(2),
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: "#888",
    padding: '0 15px'
  },
  closeIcon: {
    color: theme.palette.action.active
  },
  inputRoot: {
    color: 'inherit',
    display: 'initial',
    flex: '1 1 auto',
  },
  inputInput: {
    padding: theme.spacing(1, 0, 1, 2),
    transition: theme.transitions.create('width'),
    flex: '1 1 auto',
    color: 'inherit',
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '100%',
    },
    textOverflow: 'ellipsis'
  },
  suggestions: {
    position: 'absolute',
    width: '100%',
    backgroundColor: '#ffffff',
    zIndex: 10000,
    display: 'block',
    left: 0,
    listStyle: 'none',
    margin: 0,
    color: '#444',
    textAlign: 'left',
    top: 35,
    borderLeft: '1px solid #f5f5f5',
    borderRight: '1px solid #f5f5f5',
    borderBottom: '1px solid #f5f5f5',
    paddingTop: 10,
    boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)'
  },
  historySubheader: {
    marginLeft: 10,
    fontSize: 14
  },
  suggestionActive: {
    backgroundColor: 'rgba(0, 0, 0, 0.08)'
  },
  backdrop: {
    zIndex: 9999
  }
}));

const getSearchHistory= async () => {
  let stores= await DB.getItem("searchHistory");
  if(!stores){
    stores= [];
  }
  return stores;
};
const addToSearchHistory = async (store) => {
  let stores= await getSearchHistory();
  for(let i= 0; i<stores.length; i++){
    let s= stores[i];
    if(s.id===store.id){
      //already in history, push to the top
      stores.splice(i,1);
      stores.push(store);
      DB.setItem("searchHistory", stores);
      return stores;
    }
  }
  if(stores.length===5){
    stores.splice(0, 1);
  }
  stores.push(store);
  DB.setItem("searchHistory", stores);
  return stores;
};
const miniSearchOptions = {
  fields: ['name'], // fields to index for full-text search
  storeFields: ['id', 'name', 'slug', 'popularity'] // fields to return with search results
};

export default function Searchbar({onFocusCallback, onBlurCallback, onClickCallback, allStores}){
  const classes= useStyles();


  const [showSuggestions, setShowSuggestions]= useState(false);
  const [showClearIcon, setShowClearIcon]= useState(false);
  const [searchFocused, setSearchFocused]= useState(false);
  const [userInput, setUserInput]= useState("");
  const [stores, setStores]= useState([]);
  const [activeSuggestion, setActiveSuggestion]= useState(-1);
  const [history, setHistory]= useState([]);
  const [miniSearch, setMiniSearch]= useState(null);

  useEffect( () => {
    if(allStores.length>0){
      const _miniSearch = new MiniSearch(miniSearchOptions);
      _miniSearch.addAll(allStores);
      setMiniSearch(_miniSearch);
    }
  }, [allStores]);

  useEffect( () => {
    /*
        fetch('/config/all_stores.json.gz', {mode: "cors"})
            .then((response) => {
              response.json()
                  .then( (_allStores) => {
                    const miniSearch = new MiniSearch(miniSearchOptions);
                    miniSearch.addAll(_allStores);
                    setMiniSearch(miniSearch);
                  });
            });
    */
    getSearchHistory().then( (stores) => {
      setHistory(Array.from(stores).reverse());
    });
  },[]);
  const findStoresLikeName= (name) => {
    if(miniSearch!=null){
      let searchResults= miniSearch.search(name, {prefix: true});
      for(let i=0; i<searchResults.length && i<=6; i++){
        for(let j=i+1; j<searchResults.length; j++){
          if(searchResults[i].popularity<searchResults[j].popularity){
            let tmp= searchResults[i];
            searchResults[i]= searchResults[j];
            searchResults[j]= tmp;
          }
        }
      }
      if(searchResults.length>6){
        searchResults.splice(6);
      }
      setStores(searchResults);
      setActiveSuggestion(-1);
      setShowSuggestions(true);
    }
  };
// Event fired when the input value is changed
  const onChange = e => {
    const userInput = e.currentTarget.value;
    setUserInput(userInput);
    if(userInput.length>0){
      setShowClearIcon(true);
      if(userInput.length>0){
        findStoresLikeName(userInput);
      }
    }else{
      setStores([]);
      if(history.length>0){
        setShowSuggestions(true);
      }
      setShowClearIcon(false);
    }
  };

  const onMouseDown= e => {
    e.preventDefault();
  };

  const onFocus= e => {
    //onFocusCallback(e);
    setSearchFocused(true);
    if(userInput.length>0){
      setShowClearIcon(true);
      e.target.setSelectionRange(0, userInput.length)
    }else{
      if(history.length>0){
        setActiveSuggestion(-1);
        setShowSuggestions(true);
      }
    }
  };
  const onBlur= e => {
    setActiveSuggestion(-1);
    setSearchFocused(false);
    setShowSuggestions(false);
    setShowClearIcon(false);
    onBlurCallback(e);
  };
  const onClick = store => e => {
    setActiveSuggestion(-1);
    setStores([]);
    setShowSuggestions(false);
    setUserInput("");
    if(onClickCallback){
      onClickCallback(store.slug);
    }
    searchInputRef.current.blur();
    addToSearchHistory(store).then( (stores) => {
      setHistory(Array.from(stores).reverse());
    });
  };
  const onClearSearch= () => {
    setUserInput("");
    setStores([]);
    setShowSuggestions(true);
    setShowClearIcon(false);
  };

// Event fired when the user presses a key down
  const onKeyDown = e => {
    switch (e.keyCode) {
      case 27:
        //esc key
        setActiveSuggestion(-1);
        setShowSuggestions(false);
        break;
      case 13:
        //enter key
        if(!showSuggestions){
          return;
        }
        if(activeSuggestion===-1){
          return;
        }
        if(activeSuggestion<stores.length){
          onClick(stores[activeSuggestion])(e);
        }else{
          onClick(history[activeSuggestion-stores.length])(e);
        }
        break;
      case 38:
        //up key
        if(!showSuggestions){
          return;
        }
        if (activeSuggestion === 0) {
          setActiveSuggestion(stores.length+history.length-1);
          return;
        }
        setActiveSuggestion(activeSuggestion-1);
        break;
      case 40:
        //down key
        if(!showSuggestions){
          return;
        }
        if (activeSuggestion  === stores.length+history.length-1) {
          setActiveSuggestion(0);
        }else{
          setActiveSuggestion(activeSuggestion+1);
        }
        break;
      default:
        return;
    }
  };
  const renderSuggestion= (suggestion, index, absIndex) => {
    let className= "";

    // Flag the active suggestion with a class
    if (index+absIndex === activeSuggestion) {
      className= classes.suggestionActive;
    }

    return (
          <ListItem component={"li"} key={suggestion.slug} button className={className}>
            <ListItemText
                          onClick={onClick(suggestion)}
                          onMouseDown={onMouseDown} primary={suggestion.name} />
          </ListItem>
    );

  };
  let suggestionsListComponent;

  if (showSuggestions) {
    if (stores.length || history.length) {
      suggestionsListComponent = (
          <List component="nav" className={classes.suggestions}>
            {
              stores.map((suggestion, index) => {
                return renderSuggestion(suggestion, index, 0);
              })
            }
            {
              (stores.length>0 && history.length>0 && <Divider component={"hr"}/>)
            }
            {
              history.length>0 &&
              <ListSubheader className={classes.historySubheader} disableGutters disableSticky>Recently Searched</ListSubheader>
            }
            {
              history.map((suggestion, index) => {
                return renderSuggestion(suggestion, index, stores.length);
              })
            }
          </List>
      );
    }
  }

  const searchInputRef= createRef();

  return(
        <div className={classes.searchWrapper}>
        <div className={classes.search}>
          <AppMenu searchFocused={searchFocused}/>
          <InputBase
              inputRef={searchInputRef}
              onFocus={onFocus}
              onBlur={onBlur}
              onChange={onChange}
              onKeyDown={onKeyDown}
              value={userInput}
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
          />
          {suggestionsListComponent && suggestionsListComponent}
          <div className={classes.searchIcon}>
            {
              showClearIcon?
                  <CloseIcon className={classes.closeIcon} onMouseDown={onMouseDown} onClick={onClearSearch} />
                  :
                  <SearchIcon onClick={searchInputRef.onFocus} />
            }
          </div>
        </div>
      </div>
  );
}