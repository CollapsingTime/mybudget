import React from "react";
import styled from "styled-components";
import ModalService from "../Modal/ModalService";
import NewGoalModal from "../Modal/NewGoal";
import { Button } from "../Button/Button";

const Wrap = styled.div`
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  padding-top: 20px;
`

const ToggleNewGoal = () => {
  const addModal = () => {
    ModalService.open(NewGoalModal);
  };
  return (
    <>
        <Wrap>
          <Button primary onClick={addModal}>Добавить расходы</Button>
      </Wrap>
    </>
  );
};

export default ToggleNewGoal;
