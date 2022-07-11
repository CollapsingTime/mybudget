import React from "react";
import styled from "styled-components";
import LineGraph from "../../Components/Charts/LinegraphExpense";
import moment from "moment";
import 'moment/locale/ru';
import { StyledNavLink } from "../../Components/Button/ButtonStyle";
import { DataContainerOver, ExpenseCategory } from "./DashBoardStyle";
import { device } from "../mediaQueries";
import ToggleNewExpense from "../../Components/NewExpenseModal/ToggleNewExpense";

export const LinkWrapper = styled(StyledNavLink)`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #5865f2;
  transition: color 0.3s;
  -webkit-tap-highlight-color: transparent;
  font-size: 0.9em;
  font-weight: 600;
  color: #5865f2;
  &:hover {
    color: rgba(88, 101, 242, 0.7);
  }
  &:active {
    color: #5865f2;
  }
  gap: 5px;
`;

export const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const ExpenseString = styled.div`
  padding: 20px 0 20px 0;
  border-bottom: 1px solid #404040;
  gap: 20px;
  align-items: center;
  display: flex;
  &:last-child {
    border: none !important;
  }
`;

export const ExpenseDate = styled.div`
  position: relative;
  font-size: 0.7em;
  font-weight: 550;
  color: grey;
`;

export const ButtonWrapper = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
`;

export const Container = styled.div`
  padding: 20px;
  background-color: #1B94C4;
  display: grid;
  grid-template-columns: 0.7fr 1fr;
  gap: 20px;
  @media ${device.laptop} {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
  }
`;

export const Heading = styled.h3`
  padding: 0;
  margin: 0;
  font-size: 1.35em;
`;

export const ViewAllContainer = styled.div`
  margin: auto;
  margin-top: 20px;
  width: fit-content;
`;

export const ExpenseContainer = ({ currency, heading, obj }) => {
  return (
    <>
      <Heading>{heading}</Heading>
      {obj.map((expense) => (
        <ExpenseString key={expense.expense_id}>
          <ColumnContainer>
            {`${currency} ${parseFloat(expense.expense_amount).toFixed(2)}`}
            <ExpenseDate>
              {moment
                .utc(expense.expense_date)
                .format("DD MMM YYYY, hh:mm:ss")}
            </ExpenseDate>
          </ColumnContainer>
          <ExpenseCategory>
            {expense.expense_category.length > 9
              ? expense.expense_category.slice(0, 9).concat("...")
              : expense.expense_category}
          </ExpenseCategory>
        </ExpenseString>
      ))}
    </>
  );
};

const Main = ({ expenses, currency }) => {
  document.title = "Dashboard - Overview";
  const newobj = expenses.slice(Math.max(expenses.length - 4, 0));
  return (
    <Container>
      <DataContainerOver>
        <ToggleNewExpense/>
        <ExpenseContainer
          obj={newobj}
          currency={currency}
          heading={"Последние траты"}
        />
        <ViewAllContainer>
          <LinkWrapper to="/dashboard/archive">
            Показать все
            <i className="fas fa-chevron-right fa-xs"></i>
          </LinkWrapper>
        </ViewAllContainer>
      </DataContainerOver>
      <DataContainerOver>
        <LineGraph currency={currency} expenses={expenses} />
      </DataContainerOver>
    </Container>
  );
};

export default Main;
