import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import moment from "moment";
import { GraphWrapper } from "./ChartsStyle";


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

let newDate = new Date();
let date = newDate.getDate();
let month = (newDate.getMonth() + 1).toString().padStart(2, "0");
let year = newDate.getFullYear();

let currentUserDate = `${date}/${month}/${year}`;

const options = {
  tooltips: {
    mode: "index",
    intersect: false,
  },
  hover: {
    mode: "index",
    intersect: false,
  },
  maintainAspectRatio: false,
  responsive: true,
  plugins: {
    legend: false,
  },
  scales: {
    x: {
      grid: {
        display: false,
        drawBorder: false,
      },
      tooltips: {
        mode: "label",
      },
      ticks: {
        autoSkip: false,
        display: true,
      },
    },
    y: {
      grid: {
        display: true,
        drawBorder: false,
      },
      ticks: {
        autoSkip: false,
        display: true,
      },
    },
  },
};

const LineGraphGoals = ({ goals }) => {
  let numOfGoalToday = 0;
  let spentInTotal = 0;

  goals.map((goal) =>
    moment.utc(goal.goal_date).format("DD.MM.Y") === currentUserDate
      ? numOfGoalToday++
      : null
  );

  let labels = goals.map((goal) =>(goal.goal_category)
  );

  const data = {
    labels,
    datasets: [
      {
        fill: false,
        label: "Цель",
        data: goals.map((goal) => (goal.goal_amount)),
        borderColor: "blue",
        backgroundColor: "grey",
        radius: 5,
        tension: 0.3,
      },
      {
        fill: false,
        label: "Цель",
        data: goals.map((goal) => (goal.goal_now)),
        borderColor: "blue",
        backgroundColor: "blue",
        radius: 5,
        tension: 0.3,
      },
    ],
  };

  return (
    <>
      <GraphWrapper>
        <Bar options={options} data={data} />
      </GraphWrapper>
    </>
  );
};

export default LineGraphGoals;
