import React, { useState } from "react";
import {
  ArchiveContainer,
  H3,
  HeaderContainer,
  Icon,
  IconContainer,
  Input,
} from "./DashBoardStyle";
import { Table, Colgroup, Thead, Tr, Th, Tbody, Td } from "./DashBoardStyle";
import moment from "moment";

const Archive = ({ expenses, currency, setExpenses }) => {
  document.title = "Dashboard - Archive";

  const [sort, setSort] = useState(false);
  const [sortedExpenses, setSortedExpenses] = useState([...expenses].reverse());
  const [disabled, setDisabled] = useState(true);
  const [selectedExpense, setSelectedExpense] = useState({});

  async function deleteExpense(expense_id) {
    try {
      console.log(`Expense id is ${expense_id}`);
      const res = await fetch(`/api/dashboard/expense/${expense_id}`, {
        method: "DELETE",
        headers: { jwtToken: localStorage.token },
      });

      setSortedExpenses(
        sortedExpenses.filter(
          (sortedExpense) => sortedExpense.expense_id !== expense_id
        )
      );
      setExpenses(
        expenses.filter((expense) => expense.expense_id !== expense_id)
      );

      setDisabled(!disabled);
      console.log(`Expense was deleted! Response is ${res}`);
    } catch (err) {
      console.error(err.message);
    }
  }

  async function sortElements() {
    try {
      sort
        ? setSortedExpenses(expenses)
        : setSortedExpenses([...expenses].reverse());
      setSort(!sort);
    } catch (err) {
      console.error(err.message);
    }
  }

  async function makeExpenseEditable(expense) {
    try {
      setSelectedExpense(expense);
      setDisabled(!disabled);
    } catch (err) {
      console.error(err.message);
    }
  }

  async function onSubmitEditForm(e) {
    e.preventDefault();
    try {
      const body = selectedExpense;
      const response = await fetch("/api/dashboard/expense", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          jwtToken: localStorage.token,
        },
        body: JSON.stringify(body),
      });

      sortedExpenses.forEach((expense) => {
        if (expense.expense_id === selectedExpense.expense_id) {
          expense.expense_amount = selectedExpense.expense_amount;
          expense.expense_description = selectedExpense.expense_description;
          expense.expense_category = selectedExpense.expense_category;
        }
      });

      setDisabled(!disabled);
      console.log(response);
    } catch (err) {
      console.error(err.message);
    }
  }

  const updateField = (e) => {
    setSelectedExpense({
      ...selectedExpense,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <ArchiveContainer>
      <HeaderContainer>
        <H3>Таблица расходов</H3>
      </HeaderContainer>
      <Table>
        <Colgroup></Colgroup>
        <Thead>
          <Tr>
            <Th>Изменить</Th>
            <Th>Количество</Th>
            <Th>Описание</Th>
            <Th>Категория</Th>
            <Th onClick={() => sortElements()}>
              Date <Icon className="fas fa-sort"></Icon>
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {disabled ? (
            sortedExpenses.map((expense) => (
              <Tr key={expense.expense_id}>
                <Td data-label="Изменить">
                  <IconContainer>
                    <Icon
                      className="far fa-edit"
                      onClick={() => makeExpenseEditable(expense)}
                    />
                  </IconContainer>
                </Td>
                <Td data-label="Сумма">
                  {`${currency} ${parseFloat(expense.expense_amount).toFixed(
                    2
                  )}`}
                </Td>
                <Td data-label="Описание">
                  {expense.expense_description.length === 0
                    ? "Без описания"
                    : expense.expense_description}
                </Td>
                <Td data-label="Категория">{expense.expense_category}</Td>
                <Td data-label="Дата">
                  {moment.utc(expense.expense_date).format("DD MMM YYYY")}
                </Td>
              </Tr>
            ))
          ) : (
            <Tr key={selectedExpense.expense_id}>
              <Td data-label="Modify">
                <IconContainer>
                  <Icon
                    className="fas fa-times"
                    onClick={() => setDisabled(!disabled)}
                  />
                  <Icon className="fas fa-check" onClick={onSubmitEditForm} />
                  <Icon
                    className="far fa-trash-alt"
                    onClick={() => deleteExpense(selectedExpense.expense_id)}
                  />
                </IconContainer>
              </Td>
              <Td data-label="Количество">
                <Input
                  required
                  type="number"
                  name="expense_amount"
                  min="0.01"
                  step="0.01"
                  value={selectedExpense.expense_amount}
                  onChange={(e) => updateField(e)}
                />
              </Td>
              <Td data-label="Описание">
                <Input
                  required
                  name="expense_description"
                  type="text"
                  value={selectedExpense.expense_description}
                  onChange={(e) => updateField(e)}
                />
              </Td>
              <Td data-label="Категория">
                <Input
                  required
                  name="expense_category"
                  type="text"
                  value={selectedExpense.expense_category}
                  onChange={(e) => updateField(e)}
                />
              </Td>
              <Td data-label="Дата">
                {moment
                  .utc(selectedExpense.expense_date)
                  .format("DD MMM YYYY")}
              </Td>
            </Tr>
          )}
        </Tbody>
      </Table>
    </ArchiveContainer>
  );
};
export default Archive;
