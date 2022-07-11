import React, { useState } from "react";
import styled from "styled-components";
import {
  Heading,
  ExpenseString,
  ColumnContainer,
  ExpenseDate,
} from "./Overview";
import {
  MonthSwitcher,
  DataContainer,
  DataContainerToday,
  DataContainerNext,
  MonthContainer,
  ExpenseCategory,
  FixedDataContainer,
  ArrowWestIcon,
  ArrowEastIcon,
} from "./DashBoardStyle";
import moment from "moment";
import PieChart from "../../Components/Charts/Doughnut";
let currentYear = new Date().getFullYear();
const months = [
  "январь",
  "февраль",
  "март",
  "апрель",
  "май",
  "июнь",
  "июль",
  "август",
  "сентябрь",
  "октябрь",
  "ноябрь",
  "декабрь",
];

for (let i = 0; i < months.length; i++) {
  months[i] += " " + currentYear;
}

const Container = styled.div`
  padding: 20px;
  background-color: #1B94C4;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(1fr, auto));
  gap: 20px;
`;

let currentMonth = new Date().toLocaleString("en-RU", { month: "2-digit" });
const Expenses = ({ expenses, currency }) => {
  document.title = "Dashboard - Expenses";

  const [counter, setCounter] = useState(currentMonth - 1);
  let incrementCounter = () => setCounter(counter + 1);
  let decrementCounter = () => setCounter(counter - 1);
  if (counter < 1) {
    decrementCounter = () => setCounter(months.length - 1);
  }
  if (counter >= months.length - 1) {
    incrementCounter = () => setCounter(0);
  }

  let currentMonthExpenses = expenses.filter(
    (expense) =>
      moment.utc(expense.expense_date).format("MMMM YYYY") === months[counter]
  );

  return (
    <Container>
      <DataContainer>
        <DataContainerToday>
          <MonthSwitcher>
            <ArrowWestIcon
              className="fas fa-chevron-left fa-1x"
              onClick={decrementCounter}
            />
            <MonthContainer>{`${months[counter]}`}</MonthContainer>
            <ArrowEastIcon
              className="fas fa-chevron-right fa-1x"
              onClick={incrementCounter}
            />
          </MonthSwitcher>
          <PieChart
            currency={currency}
            currentMonth={months[counter]}
            expenses={expenses}
          />
      </DataContainerToday>

      <DataContainerNext>
        <MonthSwitcher>
          <MonthContainer>{`${months[counter-1]}`}</MonthContainer>
        </MonthSwitcher>
        <PieChart
          currency={currency}
          currentMonth={months[counter-1]}
          expenses={expenses}
        />
      </DataContainerNext>
      </DataContainer>
      {currentMonthExpenses.length === 0 ? null : (
        <FixedDataContainer>
          <>
            <Heading>{`Расходы за ${months[counter]}`}</Heading>
            {currentMonthExpenses.map((expense) => (
              <>
                <ExpenseString>
                  <ColumnContainer>
                    {`${currency} 
                    ${parseFloat(expense.expense_amount).toFixed(2)}`}
                    <ExpenseDate>
                      {moment.utc(expense.expense_date).format("DD MMM YYYY")}
                    </ExpenseDate>
                  </ColumnContainer>
                  <ExpenseCategory>
                    {expense.expense_category.length > 9
                      ? expense.expense_category.slice(0, 9).concat("...")
                      : expense.expense_category}
                  </ExpenseCategory>
                </ExpenseString>
              </>
            ))}
          </>
        </FixedDataContainer>
      )}
    </Container>
  );
};

export default Expenses;
