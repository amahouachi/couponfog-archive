import React from "react";
import {Paper} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  container: {
    textAlign: 'left',
    marginBottom: 40,
    minHeight: 106,
    [theme.breakpoints.up('sm')]: {
      minHeight: 150,
    },
    cursor: 'pointer'
  },
  content: {
    padding: 6,
    paddingTop: 13,
    [theme.breakpoints.up('sm')]: {
      padding: '10px 20px',
    }
  },
  answer: {
    color: '#78909c',
    fontSize: 14,
    fontWeight: 300,
    display: 'block',
    padding: '10px 0px'
  },
  question: {
    fontSize: 14,
    fontWeight: 400,
    [theme.breakpoints.up('sm')]: {
      fontSize: 18,
    },
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    display: '-webkit-box',
    '-webkit-line-clamp': 2,
    '-webkit-box-orient': 'vertical'
  },
}));

function getLdJson(qa){
  const ldJson= {
    "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": []
  };
  for(const {q,a} of qa){
    ldJson.mainEntity.push({
      "@type": "Question",
      "name": q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": a
      }
    })
  }

  return ldJson;
}

export default function QA({qa}){
  const classes= useStyles();

  return (
      <React.Fragment>
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(getLdJson(qa))}}></script>
        <Paper className={classes.container}>
          {
            qa.map(({q,a}) => {
              return <div className={classes.content}>
                <Typography variant="h2" className={classes.question}>{q}</Typography>
                <Typography variant="body1" className={classes.answer}> {a} </Typography>
              </div>

            })
          }
        </Paper>
      </React.Fragment>
  );
}
