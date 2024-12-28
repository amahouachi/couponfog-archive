import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Link, useHistory} from 'react-router-dom';
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import FavoriteIconBorder from '@material-ui/icons/FavoriteBorder';
import StarBorder from '@material-ui/icons/StarBorder';
import LoyaltyOutlinedIcon from '@material-ui/icons/LoyaltyOutlined';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import AndroidOutlinedIcon from '@material-ui/icons/AndroidOutlined';
import ListSubheader from "@material-ui/core/ListSubheader";
import NotificationsNoneOutlinedIcon from '@material-ui/icons/NotificationsNoneOutlined';
import ToggleNotificationPopup from "./ToggleNotificationPopup";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import logo from "../cflogo.png";
import {Config} from "../app/Config";
import {SwipeableDrawer} from "@material-ui/core";

const useStyles= makeStyles(theme => ({
  accountIcon: {
    width: 35,
    height: 35,
    fill: '#ffffff',
    marginTop: 5
  },
  mainMenuIcon: {
    padding: 7,
    color: '#888'
  },
  drawer: {
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 400
    },
  },
  closeMenuContainer: {
    padding: '5px 5px',
    color: '#444',
    display: 'flex',
    justifyContent: 'flex-end',
    position: 'absolute',
    right: 0,
    top: 0
  },
  menuItem: {
    fontSize: 14
  },
  drawerHeader:{
    backgroundColor: '#00838f',
    height: 176,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  logo: {
    width: 170,
    display: 'block',
    margin: '0 auto'
  },
  logoImg: {
    width: '100%'
  }
}));
const menu= {
  '': [
    { uri: '/', label : 'Home', icon : HomeOutlinedIcon},
    { uri: '/saved-coupons', label : 'Saved Coupons', icon : StarBorder},
    { uri: '/faved-stores', label : 'Favorite Stores', icon : FavoriteIconBorder },
    { uri: '/faved-stores-coupons', label : 'Your Coupons', icon : LoyaltyOutlinedIcon},
  ],
  Settings: [
    { uri: '/notifications', label : 'Notifications', icon : NotificationsNoneOutlinedIcon}
  ],
  Tools: [
    { uri: `${Config.androidApp.url+"&referrer=utm_source%3Dcouponfog.com%26utm_medium%3Dbrowser%26utm_campaign%3Dapp-menu"}`, label : 'Android App', icon : AndroidOutlinedIcon},
    //{ uri: '/browser-extension', label : 'Browser Extension', icon : ExtensionOutlinedIcon}
  ],
  About: [
    {uri: '/about#about', label: 'Who Are We'},
    {uri: '/about#contact', label: 'Contact Us'},
    {uri: '/about#credits', label: 'Credits'}
  ]
};

const renderSection= ({section, sectionIndex, classes, last, onClick}) => {
  return (
      <React.Fragment key={`f${sectionIndex}`}>
        <ListSubheader disableSticky>{section}</ListSubheader>
        {
          menu[section].map(menuItem => {
            let Icon= menuItem.icon;
            return (
                <ListItem button key={menuItem.uri} component={"a"} onClick={onClick(menuItem.uri)}>
                  {
                    Icon &&
                    <ListItemIcon><Icon/></ListItemIcon>
                  }
                  <ListItemText inset={!menuItem.icon} classes={{ primary: classes.menuItem, }} primary={menuItem.label} />
                </ListItem>
                )
              }
          )
        }
        {
          !last && <Divider component={"hr"}/>
        }
      </React.Fragment>
  )

};
export default function AppMenu({searchFocused}) {
  const classes= useStyles();
  const history= useHistory();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [isNotificationPopupOpen, setNotificationPopupOpen] = React.useState(false);

  const onMenuItemClick= uri => event => {
    if(uri==='/notifications') {
      setNotificationPopupOpen(true);
    }else if(uri.indexOf('http')===0){
      window.open(uri, '_blank');
    }else{
      history.push(uri);
    }
  };
  const toggleMenu= open => event => {
    setMenuOpen(open);
  };

  return (
      <div>
        <IconButton className={classes.mainMenuIcon} color={"inherit"} onClick={toggleMenu(true)}>
          {searchFocused? <ArrowBackIcon/> : <MenuIcon fontSize={"default"}/>}
        </IconButton>
        <SwipeableDrawer
            classes={{ paper: classes.drawer, }} anchor="left"
            variant="temporary" open={menuOpen} onClose={toggleMenu(false)} >
          <div role="presentation" onClick={toggleMenu(false)} onKeyDown={toggleMenu(false)}>
            <div className={classes.drawerHeader}>
              <Link to={'/'} className={classes.logo}>
                <img alt={"couponfog logo"} className={classes.logoImg} src={logo}/>
              </Link>
            </div>
            <List>
              {
                Object.keys(menu).map((section,index) => {
                  let last= false;
                  if(index===Object.keys(menu).length-1){
                    last= true;
                  }
                  return renderSection({section: section, sectionIndex: index, classes: classes, last: last, onClick: onMenuItemClick});
                })
              }

            </List>
          </div>
        </SwipeableDrawer>
        <ToggleNotificationPopup onClose={()=>{setNotificationPopupOpen(false)}} show={isNotificationPopupOpen}/>
      </div>
  );
}