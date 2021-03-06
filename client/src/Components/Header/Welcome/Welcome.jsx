import React from "react";
import { OutlineButton } from "../../Button/Button.jsx";
import { Link } from "react-scroll";
import {
  Container,
  RowOne,
  RowTwo,
  ContactBtn,
  WelcomeHeading,
  WelcomeSubheading,
  Br,
  Embed,
} from "./WelcomeStyle.jsx";
const Welcome = () => {
  return (
    <Container>
      <RowOne>
        <WelcomeHeading>Учебный проект</WelcomeHeading>
        <WelcomeSubheading>
          Создай свой аккаунт и начни
          <Br /> управлять своими расходами
        </WelcomeSubheading>
      </RowOne>
      <RowTwo>
        <Embed />
      </RowTwo>
    </Container>
  );
};

export default Welcome;
