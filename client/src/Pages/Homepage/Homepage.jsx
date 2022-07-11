import React from "react";
import Header from "../../Components/Header/Header";
import Feature from "../../Components/Feature/Feature.jsx";
import {
  FeaturesContainer,
  RowOne,
  RowTwo,
  RowOneHeading,
  RowOneSubheading,
} from "./HomepageStyle";

const featureObjOne = {
  headline: "Отслеживание доходов и расходов",
  description: "Все доходы и расходы дублируются в табличном виде",
  icon: "far fa-chart-bar",
  alt: "alt",
};

const featureObjTwo = {
  headline: "Расширенная визуализация",
  description:
    "Добавлена возможность визуализации расходов на графике по категориям",
  icon: "fas fa-chart-pie",
};

const featureObjThree = {
  headline: "Ставь новые цели",
  description: "Планируй будущие расходы заранее и отслеживай текущие накопления",
  icon: "fas fa-users",
};

const featureObjFour = {
  headline: "Личный кабинет",
  description: "Будет добавлена функция изменения пароля",
  icon: "fas fa-users",
};

const Homepage = () => {
  document.title = "MyBudget";

  return (
    <>
      <Header />
      <FeaturesContainer>
        <RowOne>
          <RowOneHeading>Текущие обновления</RowOneHeading>
          <RowOneSubheading>
            В современном мире полезно следить за своими доходами и расходами,
            поэтому для большего удобства добавлены следующие изменения
          </RowOneSubheading>
        </RowOne>
        <RowTwo>
          <Feature {...featureObjOne} />
          <Feature {...featureObjTwo} />
          <Feature {...featureObjThree} />
        </RowTwo>
      </FeaturesContainer>
    </>
  );
};

export default Homepage;
