import React from "react";
import styled from "styled-components";
import LineGraphIncome from "../../Components/Charts/LinegraphIncome";
import moment from "moment";
import { StyledNavLink } from "../../Components/Button/ButtonStyle";
import { DataContainerOver, ExpenseCategory } from "./DashBoardStyle";
import { device } from "../mediaQueries";
import ToggleNewIncome from "../../Components/NewIncome/ToggleNewIncome";

const LinkWrapper = styled(StyledNavLink)`
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

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ExpenseString = styled.div`
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

const Container = styled.div`
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

const Heading = styled.h3`
  padding: 0;
  margin: 0;
  font-size: 1.35em;
`;

const ViewAllContainer = styled.div`
  margin: auto;
  margin-top: 20px;
  width: fit-content;
`;

const IncomeContainer = ({ currency, heading, obj }) => {
  return (
    <>
      <Heading>{heading}</Heading>
      {obj.map((income) => (
        <ExpenseString key={income.income_id}>
          <ColumnContainer>
            {`${currency} ${parseFloat(income.income_amount).toFixed(2)}`}
            <ExpenseDate>
              {moment
                .utc(income.income_date)
                .format("DD MMM YYYY, hh:mm:ss")}
            </ExpenseDate>
          </ColumnContainer>
          <ExpenseCategory>
            {income.income_category.length > 9
              ? income.income_category.slice(0, 9).concat("...")
              : income.income_category}
          </ExpenseCategory>
        </ExpenseString>
      ))}
    </>
  );
};

const Main = ({ incomes, currency }) => {
  document.title = "Dashboard - Income";
  const newobj = incomes.slice(Math.max(incomes.length - 4, 0));
  return (
    <Container>
      <DataContainerOver>
      <ToggleNewIncome/>
        <IncomeContainer
          obj={newobj}
          currency={currency}
          heading={"Мой доход"}
        />
        <ViewAllContainer>
          <LinkWrapper to="/dashboard/tableincome">
            Показать все
            <i className="fas fa-chevron-right fa-xs"></i>
          </LinkWrapper>
        </ViewAllContainer>
      </DataContainerOver>
      <DataContainerOver>
        <LineGraphIncome currency={currency} incomes={incomes} />
      </DataContainerOver>
    </Container>
  );
};

export default Main;
