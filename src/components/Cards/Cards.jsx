import React from "react";

import { Card, CardContent, Grid, Typography } from "@material-ui/core";

import cx from "classnames";

import CountUp from "react-countup";

import classes from "./Cards.module.css";

import Spinner from "../UI/Spinner";

const cards = ({ data: { confirmed, recovered, deaths, lastUpdate } }) => {
  if (!confirmed) {
    return <Spinner />;
  }

  const cardData = [
    {
      id: 1,
      name: "Infected",
      classN: classes.infected,
      end: confirmed.value,
      last: lastUpdate,
      para: "Infected",
    },
    {
      id: 2,
      name: "Recovered",
      classN: classes.recovered,
      end: recovered.value,
      last: lastUpdate,
      para: "Recovered",
    },
    {
      id: 3,
      name: "Deaths",
      classN: classes.deaths,
      end: deaths.value,
      last: lastUpdate,
      para: "Dead",
    },
  ];

  const cardArray = cardData.map((card) => (
    <Grid
      key={card.id}
      item
      component={Card}
      xs={12}
      md={3}
      className={cx(classes.card, card.classN)}
    >
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          {card.name}
        </Typography>
        <Typography variant="h5">
          <CountUp
            start={0}
            end={card.end}
            duration={2.5}
            seperator=","
          ></CountUp>
        </Typography>
        <Typography color="textSecondary">
          {new Date(card.last).toDateString()}
        </Typography>
        <Typography variant="body2">
          Number of {card.para.toLowerCase()} cases of COVID-19
        </Typography>
      </CardContent>
    </Grid>
  ));

  return (
    <div className={classes.container}>
      <Grid container spacing={3} justify="center">
        {cardArray}
      </Grid>
    </div>
  );
};

export default cards;
