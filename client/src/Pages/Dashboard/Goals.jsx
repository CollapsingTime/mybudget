import React from "react";
import styled from "styled-components";
import LineGraphGoals from "../../Components/Charts/LinegraphGoals";
import moment from "moment";
import { DataContainerOver, ExpenseCategory } from "./DashBoardStyle";
import { device } from "../mediaQueries";
import ToggleNewGoal from "../../Components/NewGoals/ToggleNewGoal.jsx";


const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ExpenseString = styled.div`
  padding: 20px 0 20px 0;
  border-bottom: 2px solid rgb(248, 250, 253);
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
  background-color: aqua;
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



const GoalContainer = ({ currency, heading, obj }) => {
  return (
    <>
      <Heading>{heading}</Heading>
     
      {obj.map((goal) => (
        <ExpenseString key={goal.goal_id}>
          <ColumnContainer>
            {`${currency} ${parseFloat(goal.goal_amount).toFixed(2)}`}
            <ExpenseDate>
              {moment
                .utc(goal.goal_date)
                .format("DD MMM YYYY, hh:mm:ss")}
            </ExpenseDate>
          </ColumnContainer>
          <ExpenseCategory>
            {goal.goal_category.length > 9
              ? goal.goal_category.slice(0, 9).concat("...")
              : goal.goal_category}
              {/* {goal.goal_category} */}
          </ExpenseCategory>
        </ExpenseString>
      ))}
    </>
  );
};

const Main = ({ goals, currency }) => {
  document.title = "Dashboard - Goal";
  const newobj = goals.slice(Math.max(goals.length - 4, 0));
  return (
    <Container>
      <DataContainerOver>
        <ToggleNewGoal/>
        <GoalContainer
          obj={newobj}
          currency={currency}
          heading={"Мои цели"}
        />
        
      </DataContainerOver>
      <DataContainerOver>
        <LineGraphGoals currency={currency} goals={goals} />
      </DataContainerOver>
    </Container>
  );
};

export default Main;
