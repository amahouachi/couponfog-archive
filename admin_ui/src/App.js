import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {BrowserRouter, Route, Switch, Link as RouterLink} from "react-router-dom";
import Stores from "./components/Stores";
import Coupons,{STATUS_REMOVED,STATUS_EXPIRED,STATUS_PUBLISHED_NONAME,STATUS_PUBLISHED,STATUS_DRAFT} from "./Coupons";
import {Server} from "./app/Server";
import {Config} from "./app/Config";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import Store from "./components/Store";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function App(props) {
  Server.initialize({url: Config.serverUrl, auth: Config.auth});
  const { container } = props;
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
      <div>
        <div className={classes.toolbar} />
        <Divider />
        <List>
          <ListItem key={"stores"} button component="a" href={"/stores"}>
            <ListItemText primary={"Stores"}/>
          </ListItem>
        </List>
      </div>
  );

  return (
      <BrowserRouter>
        <div className={classes.root}>
          <CssBaseline />
          <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
              <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                  className={classes.menuButton}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap>
                Responsive drawer
              </Typography>
            </Toolbar>
          </AppBar>
          <nav className={classes.drawer} aria-label="mailbox folders">
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            <Hidden smUp implementation="css">
              <Drawer
                  container={container}
                  variant="temporary"
                  anchor={'left'}
                  open={mobileOpen}
                  onClose={handleDrawerToggle}
                  classes={{
                    paper: classes.drawerPaper,
                  }}
                  ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                  }}
              >
                {drawer}
              </Drawer>
            </Hidden>
            <Hidden xsDown implementation="css">
              <Drawer
                  classes={{
                    paper: classes.drawerPaper,
                  }}
                  variant="permanent"
                  open
              >
                {drawer}
              </Drawer>
            </Hidden>
          </nav>
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <Switch>
              <Route path={"/stores"} exact>
                <Stores/>
              </Route>
              <Route path={"/stores/:id"}>
                <Store/>
              </Route>
              <Route path={"/draft-coupons"}>
                <Coupons status={STATUS_DRAFT}/>
              </Route>
              <Route path={"/published-coupons"}>
                <Coupons status={STATUS_PUBLISHED}/>
              </Route>
              <Route path={"/published-noname-coupons"}>
                <Coupons status={STATUS_PUBLISHED_NONAME}/>
              </Route>
              <Route path={"/expired-coupons"}>
                <Coupons status={STATUS_EXPIRED}/>
              </Route>
              <Route path={"/removed-coupons"}>
                <Coupons status={STATUS_REMOVED}/>
              </Route>
            </Switch>
          </main>
        </div>

      </BrowserRouter>
  );
}

export default App;
