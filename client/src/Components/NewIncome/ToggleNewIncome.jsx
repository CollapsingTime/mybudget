import React from "react";
import styled from "styled-components";
import ModalService from "../Modal/ModalService";
import NewIncomeModal from "../Modal/NewIncome";
import { Button } from "../Button/Button";

const Wrap = styled.div`
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
`

const ToggleNewIncome = () => {
  const addModal = () => {
    ModalService.open(NewIncomeModal);
  };
  return (
    <>
      <Wrap>
        <Button primary onClick={addModal}>Добавить доходы</Button>
      </Wrap>
    </>
  );
};

export default ToggleNewIncome;
