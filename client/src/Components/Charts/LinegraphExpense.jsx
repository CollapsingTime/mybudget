import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import moment from "moment";
import { GraphWrapper, H3, TextContainer } from "./ChartsStyle";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
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

export const options = {
  tooltips: {
    mode: "index",
    intersect: false,
  },
  hover: {
    mode: "index",
    intersect: true,
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

const LineGraph = ({ expenses, currency }) => {
  let numOfExpensesToday = 0,
    spentInTotal = 0;
    /* spentToday = 0; */

  expenses.map((expense) =>
    moment.utc(expense.expense_date).format("DD.MM.Y") === currentUserDate
      ? numOfExpensesToday++
      : null
  );

  let labels = expenses.map((expense) =>
    moment.utc(expense.expense_date).format("DD.MM.Y")
  );

  const data = {
    labels,
    datasets: [
      {
        fill: true,
        label: "Суммарные траты",
        data: expenses.map(
          (expense) => (spentInTotal += parseFloat(expense.expense_amount))
        ),
        borderColor: "blue",
        backgroundColor: "grey",
        radius: 5,
        tension: 0.3,
      },
    ],
  };

  return (
    <>
      <TextContainer>
        <H3>{` ${currency} ${spentInTotal.toFixed(2)}`}</H3>
        Суммарные траты
      </TextContainer>
      <GraphWrapper>
        <Line options={options} data={data} />
      </GraphWrapper>
    </>
  );
};

export default LineGraph;
