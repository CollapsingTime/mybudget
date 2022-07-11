import React from "react";
import { OutlineButton } from "../../Button/Button.jsx";
import { Link } from "react-scroll";
import {
  Container,
  RowOne,
  RowTwo,
  ExploreBtn,
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
        <ExploreBtn>
          <Link spy={true} smooth={true} to="MainPage">
            <OutlineButton>Обзор</OutlineButton>
          </Link>
        </ExploreBtn>
        <ContactBtn>
          <OutlineButton primary href="https://github.com/CollapsingTime">
            Контакты
          </OutlineButton>
        </ContactBtn>
        <Embed />
      </RowTwo>
    </Container>
  );
};

export default Welcome;
