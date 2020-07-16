import React, { useState, useEffect } from "react";

import { Line, Bar } from "react-chartjs-2";

import { fetchDailyData } from "../../api/index";

import classes from "./Chart.module.css";

const Chart = ({ data: { confirmed, deaths, recovered }, country }) => {
  const [dailyData, setDailyData] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      setDailyData(await fetchDailyData());
    };
    fetchApi();
  }, []);

  const barChart = confirmed ? (
    <Bar
      data={{
        labels: ["Infected", "Recovered", "Deaths"],
        datasets: [
          {
            label: "People",
            backgroundColor: [
              "rgba(0, 0, 255, 0.5)",
              "rgba(0, 255, 0, 0.5)",
              "rgba(255, 0, 0, 0.5)",
            ],
            data: [confirmed.value, recovered.value, deaths.value],
          },
        ],
      }}
      options={{
        scales: {
          yAxes: [
            {
              ticks: {
                fontColor: "black",
                fontWeight: "bold",
              },
            },
          ],
          xAxes: [
            {
              ticks: {
                fontColor: "black",
                fontWeight: "bold",
              },
            },
          ],
        },
        legend: { display: false },
        title: {
          display: true,
          text: `Current state in ${country}`,
          fontColor: "black",
          fontWeight: "bold",
        },
      }}
    />
  ) : null;

  const lineChart = dailyData.length ? (
    <Line
      options={{
        scales: {
          yAxes: [
            {
              ticks: {
                fontColor: "black",
                fontFamily: "bold",
              },
            },
          ],
          xAxes: [
            {
              ticks: {
                fontColor: "black",
                fontFamily: "bold",
              },
            },
          ],
        },
      }}
      data={{
        labels: dailyData.map(({ date }) => date.slice(5)),
        datasets: [
          {
            data: dailyData.map(({ confirmed }) => confirmed),
            label: "Infected",
            borderColor: "#3333ff",
            fill: true,
          },
          {
            data: dailyData.map(({ deaths }) => deaths),
            label: "Deaths",
            borderColor: "red",
            backgroundColor: "rgba(255,0,0,0.5)",
            fill: true,
          },
        ],
      }}
    ></Line>
  ) : null;

  return (
    <div className={classes.container}>{country ? barChart : lineChart}</div>
  );
};

export default Chart;
