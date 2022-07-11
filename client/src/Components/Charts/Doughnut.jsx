import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { DoughnutWrapper } from "./ChartsStyle";
import moment from "moment";
import { NoDataWarning } from "./ChartsStyle.jsx";

ChartJS.register(ArcElement, Tooltip, Legend);

export const options = {
  maintainAspectRatio: true,
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: 'bottom'
    }
  },
};

const PieChart = ({ expenses, currentMonth }) => {
  let currentMonthExpenses = expenses.filter(
    (expense) =>
      moment.utc(expense.expense_date).format("MMMM YYYY") === currentMonth
  );

  var expensesMerged = currentMonthExpenses.reduce((object, item) => {
    var category = item.expense_category;
    var amount = item.expense_amount;

    if (!object.hasOwnProperty(category)) {
      object[category] = 0;
    }

    object[category] += parseFloat(amount);
    return object;
  }, {});

  var keys = Object.keys(expensesMerged);
  var values = keys.map(function (key) {
    return expensesMerged[key];
  });

  const data = {
    labels: keys,
    datasets: [
      {
        label: "Суммарные траты",
        data: values,
        backgroundColor: [
          "blue",
          "red",
          "aqua",
          "yellow",
          "grey",
          "green",
        ],
        borderColor: ["black"],
        borderWidth: 2,
      },
    ],
  };

  return (
    <DoughnutWrapper>
      {values.length === 0 ? (
        <NoDataWarning>Нет данных для отображения</NoDataWarning>
      ) : (
        <Doughnut data={data} options={options} />
      )}
    </DoughnutWrapper>
  );
};

export default PieChart;