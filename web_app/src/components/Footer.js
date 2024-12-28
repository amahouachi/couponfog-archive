import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {getCurrentYear} from "../app/Util";

const useStyles= makeStyles( theme => ({
  footer: {
    height: 100,
    backgroundColor: '#444',
    position: 'relative'
  },
  footerInner: {
    margin: '0 auto',
    maxWidth: 1140,
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    color: '#e4e4e4'
  },
  link: {
    padding: '5px 20px',
    textDecoration: 'none',
    color: '#efefef'
  },
  copyright: {
    color: 'rgba(255,255,255,.6)'
  }
}));
export default function Footer(props){
  const classes= useStyles();

  return (
    <div className={classes.footer}>
      <div className={classes.footerInner}>
        <div>
          <a target="_blank" className={classes.link} href='/terms.html'>Terms</a>
          <a target="_blank" className={classes.link} href='/privacy-policy.html'>Privacy</a>
          <a target="_blank" className={classes.link} href='/affiliate-disclosure.html'>Disclosure</a>
        </div>
        <span className={classes.copyright}>Copyright &copy; Couponfog {getCurrentYear()}</span>
      </div>
      <div id="snackbar-placeholder"></div>
    </div>
  );
}