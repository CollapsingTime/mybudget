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

const TableIncome = ({ incomes, currency, setIncomes }) => {
  document.title = "Dashboard - Income";

  const [sort, setSort] = useState(false);
  const [sortedIncomes, setSortedIncomes] = useState([...incomes].reverse());
  const [disabled, setDisabled] = useState(true);
  const [selectedIncome, setSelectedIncome] = useState({});

  async function deleteIncome(income_id) {
    try {
      console.log(`Income id is ${income_id}`);
      const res = await fetch(`/api/dashboard/income/${income_id}`, {
        method: "DELETE",
        headers: { jwtToken: localStorage.token },
      });

      setSortedIncomes(
        sortedIncomes.filter(
          (sortedIncomes) => sortedIncomes.income_id !== income_id
        )
      );
      setIncomes(
        incomes.filter((income) => income.income_id !== income_id)
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
        ? setSortedIncomes(incomes)
        : setSortedIncomes([...incomes].reverse());
      setSort(!sort);
    } catch (err) {
      console.error(err.message);
    }
  }

  async function makeIncomeEditable(income) {
    try {
      setSelectedIncome(income);
      setDisabled(!disabled);
    } catch (err) {
      console.error(err.message);
    }
  }

  async function onSubmitEditForm(e) {
    e.preventDefault();
    try {
      const body = selectedIncome;
      const response = await fetch("/api/dashboard/income", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          jwtToken: localStorage.token,
        },
        body: JSON.stringify(body),
      });

      sortedIncomes.forEach((income) => {
        if (income.income_id === selectedIncome.income_id) {
          income.income_amount = selectedIncome.income_amount;
          income.income_description = selectedIncome.income_description;
          income.income_category = selectedIncome.income_category;
        }
      });

      setDisabled(!disabled);
      console.log(response);
    } catch (err) {
      console.error(err.message);
    }
  }

  const updateField = (e) => {
    setSelectedIncome({
      ...selectedIncome,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <ArchiveContainer>
      <HeaderContainer>
        <H3>Таблица доходов</H3>
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
            sortedIncomes.map((income) => (
              <Tr key={income.income_id}>
                <Td data-label="Изменить">
                  <IconContainer>
                    <Icon
                      className="far fa-edit"
                      onClick={() => makeIncomeEditable(income)}
                    />
                  </IconContainer>
                </Td>
                <Td data-label="Сумма">
                  {`${currency} ${parseFloat(income.income_amount).toFixed(
                    2
                  )}`}
                </Td>
                <Td data-label="Описание">
                  {income.income_description.length === 0
                    ? "Без описания"
                    : income.income_description}
                </Td>
                <Td data-label="Категория">{income.income_category}</Td>
                <Td data-label="Дата">
                  {moment.utc(income.income_date).format("DD MMM YYYY")}
                </Td>
              </Tr>
            ))
          ) : (
            <Tr key={selectedIncome.income_id}>
              <Td data-label="Modify">
                <IconContainer>
                  <Icon
                    className="fas fa-times"
                    onClick={() => setDisabled(!disabled)}
                  />
                  <Icon className="fas fa-check" onClick={onSubmitEditForm} />
                  <Icon
                    className="far fa-trash-alt"
                    onClick={() => deleteIncome(selectedIncome.income_id)}
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
                  value={selectedIncome.income_amount}
                  onChange={(e) => updateField(e)}
                />
              </Td>
              <Td data-label="Описание">
                <Input
                  required
                  name="expense_description"
                  type="text"
                  value={selectedIncome.income_description}
                  onChange={(e) => updateField(e)}
                />
              </Td>
              <Td data-label="Категория">
                <Input
                  required
                  name="expense_category"
                  type="text"
                  value={selectedIncome.income_category}
                  onChange={(e) => updateField(e)}
                />
              </Td>
              <Td data-label="Дата">
                {moment
                  .utc(selectedIncome.income_date)
                  .format("DD MMM YYYY")}
              </Td>
            </Tr>
          )}
        </Tbody>
      </Table>
    </ArchiveContainer>
  );
};
export default TableIncome;
