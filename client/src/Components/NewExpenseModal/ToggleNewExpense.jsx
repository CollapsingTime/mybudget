import React from "react";
import styled from "styled-components";
import { Button } from "../Button/Button";
import ModalService from "../Modal/ModalService";
import NewExpenseModal from "../Modal/NewExpense";

const Wrap = styled.div`
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
`

const ToggleNewExpense = () => {
  const addModal = () => {
    ModalService.open(NewExpenseModal);
  };
  return (
    <>
      <Wrap>
        <Button primary onClick={addModal}>Добавить расходы</Button>
      </Wrap>
    </>
  );
};

export default ToggleNewExpense;
