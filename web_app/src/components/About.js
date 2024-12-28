import React from "react";
import {makeStyles} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import PageMeta from "./PageMeta";
import {Config} from "../app/Config";

const useStyles = makeStyles(theme => ({
  mainContent: {
    marginLeft: 0,
    textAlign: 'left',
    flex: '1 1 100%'
  },
  header: {
    marginTop: 35
  },
}));


export default function About(){
  const classes= useStyles();

  return (
      <React.Fragment>
        <PageMeta
            title={`About ${Config.webApp.name}`}
            description={`${Config.webApp.name} collects coupons from different sources and consolidate them into a high quality database of coupons to help shoppers save on their favorite stores`}
            uri="/about"/>
        <div className={classes.mainContent}>
          <Typography id={"about"} variant="h1">About Us</Typography>
          <p>We are a coupon aggregator. We collect coupons from various sources and make them available for shoppers on Couponfog website and mobile apps. We try to provide users with high quality and working coupons, so that they are able to enjoy their shopping trips and save money at their favorite stores.</p>
          <Typography id={"contact"} variant="h1" className={classes.header}>Contact</Typography>
          <p>If you have any question, feedback or request, please send us a mail on this email address : contact@couponfog.com</p>
          <Typography id={"credits"} variant="h1" className={classes.header}>Credits</Typography>
          <p>Couponfog is proudly built using various open source projects and tools, provided by awesome people and organizations, for the community :</p>
          <ul>
            <li><a target={"_blank"} href={"https://reactjs.org/"}>React JS</a> : A JavaScript library for building user interfaces by Facebook</li>
            <li><a target={"_blank"} href={"https://material-ui.com/"}>Material-UI</a> : A library of React components to quickly build beautiful, modern and responsive user interfaces</li>
            <li><a target={"_blank"} href={"https://github.com/lucaong/minisearch"}>MiniSearch</a> : A tiny but powerful javascript in-memory fulltext search engine</li>
            <li><a target={"_blank"} href={"https://nodejs.org/"}>Node.js</a> : The javascript runtime environment for server-side applications and more</li>
            <li>Essential tools for modern javascript development like <a target={"_blank"} href={"https://webpack.js.org/"}>Webpack</a>, <a target={"_blank"} href={"https://babeljs.io/"}>Babel</a>, <a href={"https://eslint.org/"} target={"_blank"}>ESLint</a> and more</li>
            <li><a target={"_blank"} href={"http://www.haproxy.org/"}>HAProxy</a> : The Reliable, High Performance TCP/HTTP Load Balancer</li>
            <li><a target={"_blank"} href={"https://github.com/localForage/localForage"}>localForage</a> : a fast and simple storage library for JavaScript</li>
            <li><a target={"_blank"} href={"https://redis.io/"}>Redis</a> : the blazing fast in-memory data store and <a href={"https://github.com/luin/ioredis"} target={"_blank"}>ioredis</a> one of its best javascript clients</li>
            <li><a target={"_blank"} href={"https://github.com/arimorty/floatingsearchview"}>Floating Search View</a> : a beautiful floating search bar for android</li>
          </ul>
        </div>
      </React.Fragment>
  );
}
