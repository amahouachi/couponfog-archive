import React from "react";
import {Helmet} from "react-helmet";
import {Config} from "../app/Config";

export default function PageMeta({title, description, uri}){
  const url= Config.webApp.baseUrl+uri;
  return (
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
        <meta property="og:site_name" content={Config.webApp.name}/>
        <meta property="og:title" content={title}/>
        <meta property="og:type" content="website"/>
        <meta property="og:url" content={url}/>
        <meta property="og:description" content={description}/>
        <link rel="canonical" href={url} />
      </Helmet>
  );
}