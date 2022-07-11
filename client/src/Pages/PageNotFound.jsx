import React from "react";
import styled from "styled-components";
import { Button } from "../Components/Button/Button.jsx";

export const Container = styled.div`
  text-align: center;
  color: aqua;
  z-index: -1;
  margin-top: 75px;
  margin-right: 20px;
  margin-left: 20px;
  z-index: 100;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  border-radius: 20px;
`;

export const Heading = styled.h1`
  font-weight: 550;
  font-size: 5em;
  margin: 10px;
`;

export const SubHeading = styled.h2`
  font-weight: 550;
  font-size: 2em;
  margin: 10px;
`;
export const P = styled.p`
  font-size: 1em;
  max-width: 430px;
`;

const PageNotFound = () => {
  document.title = "MyBudget - 404";

  async function changeWindowLocation() {
    window.location = "/";
  }

  return (
    <Container>
      <Heading>Что-то пошло не так</Heading>
      <SubHeading>404 - Страница не найдеда</SubHeading>
      <P>Страница временно недоступна или удалена</P>
      <Button onClick={changeWindowLocation}>Тест</Button>
    </Container>
  );
};

export default PageNotFound;
