import React, { useState } from "react";
import {
  ArchiveContainer,
  Icon,
  IconContainer,
  Input,
} from "./DashBoardStyle";
import { Table, Colgroup, Thead, Tr, Th, Tbody, Td } from "./DashBoardStyle";
import moment from "moment";
import LineGraphGoals from "../../Components/Charts/LinegraphGoals";
import { DataContainerOver } from "./DashBoardStyle";
import ToggleNewGoal from "../../Components/NewGoals/ToggleNewGoal.jsx";

const GoalsTable = ({ goals, currency, setGoals }) => {
  document.title = "Dashboard - Goal";

  const [sort, setSort] = useState(false);
  const [sortedGoals, setSortedGoals] = useState([...goals].reverse());
  const [disabled, setDisabled] = useState(true);
  const [selectedGoal, setSelectedGoal] = useState({});

  async function deleteGoal(goal_id) {
    try {
      console.log(`Income id is ${goal_id}`);
      const res = await fetch(`/api/dashboard/goal/${goal_id}`, {
        method: "DELETE",
        headers: { jwtToken: localStorage.token },
      });

      setSortedGoals(
        sortedGoals.filter(
          (sortedGoals) => sortedGoals.goal_id !== goal_id
        )
      );
      setGoals(
        goals.filter((goal) => goal.goal_id !== goal_id)
      );

      setDisabled(!disabled);
      console.log(`Income was deleted! Response is ${res}`);
    } catch (err) {
      console.error(err.message);
    }
  }

  async function sortElements() {
    try {
      sort
        ? setSortedGoals(goals)
        : setSortedGoals([...goals].reverse());
      setSort(!sort);
    } catch (err) {
      console.error(err.message);
    }
  }

  async function makeGoalEditable(goal) {
    try {
      setSelectedGoal(goal);
      setDisabled(!disabled);
    } catch (err) {
      console.error(err.message);
    }
  }

  async function onSubmitEditForm(e) {
    e.preventDefault();
    try {
      const body = selectedGoal;
      const response = await fetch("/api/dashboard/goal", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          jwtToken: localStorage.token,
        },
        body: JSON.stringify(body),
      });

      sortedGoals.forEach((goal) => {
        if (goal.goal_id === selectedGoal.goal_id) {
          goal.goal_amount = selectedGoal.goal_amount;
          goal.goal_now = selectedGoal.goal_now;
          goal.goal_description = selectedGoal.goal_description;
          goal.goal_category = selectedGoal.goal_category;
          goal.goal_date_stop = selectedGoal.goal_date_stop;
        }
      });

      setDisabled(!disabled);
      console.log(response);
    } catch (err) {
      console.error(err.message);
    }
  }

  const updateField = (e) => {
    setSelectedGoal({
      ...selectedGoal,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <ArchiveContainer>
        <ToggleNewGoal/>
      
      <Table>
        <Colgroup></Colgroup>
        <Thead>
          <Tr>
            <Th>Название цели</Th>
            <Th>Описание</Th>
            <Th>Цель</Th>
            <Th>Итого</Th>
            <Th>Процент завершения</Th>
            <Th>Ежемесячный платеж</Th>
            <Th onClick={() => sortElements()}>
              Дата начала <Icon className="fas fa-sort"></Icon>
            </Th>
            <Th onClick={() => sortElements()}>
              Дата окончания <Icon className="fas fa-sort"></Icon>
            </Th>
            <Th>Изменить</Th>
          </Tr>
        </Thead>
        <Tbody>
          {disabled ? (
            sortedGoals.map((goal) => (
              <Tr key={goal.goal_id}>

                <Td data-label="Категория">{goal.goal_category}</Td>

                <Td data-label="Описание">
                  {goal.goal_description.length === 0
                    ? "Без описания"
                    : goal.goal_description}
                </Td>

                <Td data-label="Цель">
                  {`${currency} ${parseFloat(goal.goal_amount).toFixed(
                    2
                  )}`}
                </Td>

                <Td data-label="Итого">
                  {`${currency} ${parseFloat(goal.goal_now).toFixed(2)}`}
                </Td>

                <Td data-label="Процент завершения">
                  {`${parseFloat(parseFloat(goal.goal_now).toFixed(2)/parseFloat(goal.goal_amount).toFixed(2)*100).toFixed(2)} ${`%`}`}
                </Td>

                <Td data-label="Ежемесячный платеж">
                  {`${currency} ${parseFloat((parseFloat(goal.goal_amount).toFixed(2) - parseFloat(goal.goal_now).toFixed(2))/((moment(goal.goal_date_stop).format("x") - moment(goal.goal_date).format("x"))/(1000*60*60*24)/30)).toFixed(2)}`}
                </Td>

                <Td data-label="Дата начала">
                  {moment.utc(goal.goal_date).format("DD MMM YYYY")}
                </Td>

                <Td data-label="Дата завершения">
                  {moment.utc(goal.goal_date_stop).format("DD MMM YYYY")}
                </Td>

                <Td data-label="Изменить">
                  <IconContainer>
                    <Icon
                      className="far fa-edit"
                      onClick={() => makeGoalEditable(goal)}
                    />
                  </IconContainer>
                </Td>

              </Tr>
            ))
          ) : (
            <Tr key={selectedGoal.goal_id}>

              <Td data-label="Категория">
                <Input
                  required
                  name="goal_category"
                  type="text"
                  value={selectedGoal.goal_category}
                  onChange={(e) => updateField(e)}
                />
              </Td>

              <Td data-label="Описание">
                <Input
                  required
                  name="goal_description"
                  type="text"
                  value={selectedGoal.goal_description}
                  onChange={(e) => updateField(e)}
                />
              </Td>

              <Td data-label="Количество">
                <Input
                  required
                  type="number"
                  name="goal_amount"
                  min="0.01"
                  step="0.01"
                  value={selectedGoal.goal_amount}
                  onChange={(e) => updateField(e)}
                />
              </Td>

              <Td data-label="Накопление">
                <Input
                  required
                  type="number"
                  name="goal_now"
                  min="0.01"
                  step="0.01"
                  value={selectedGoal.goal_now}
                  onChange={(e) => updateField(e)}
                />
              </Td>

              <Td data-label="Итого">
              </Td>

              <Td data-label="Процент">
              </Td>
              
              <Td data-label="Дата">
                {moment
                  .utc(selectedGoal.goal_date)
                  .format("DD MMM YYYY")}
              </Td>

              <Td data-label="Дата">
                <Input
                  required
                  type="date"
                  name="goal_date_stop"
                  /* min="0.01"
                  step="0.01" */
                  value={selectedGoal.goal_date_stop}
                  onChange={(e) => updateField(e)}
                />
                {/* {moment
                  .utc(selectedGoal.goal_date_stop)
                  .format("DD MMM YYYY")} */}
              </Td>

              <Td data-label="Modify">
                <IconContainer>
                  <Icon
                    className="fas fa-times"
                    onClick={() => setDisabled(!disabled)}
                  />
                  <Icon className="fas fa-check" onClick={onSubmitEditForm} />
                  <Icon
                    className="far fa-trash-alt"
                    onClick={() => deleteGoal(selectedGoal.goal_id)}
                  />
                </IconContainer>
              </Td>
            </Tr>
          )}
        </Tbody>
      </Table>

      <DataContainerOver>
        <LineGraphGoals currency={currency} goals={goals} />
      </DataContainerOver>    
    </ArchiveContainer>
  );
};
export default GoalsTable;
