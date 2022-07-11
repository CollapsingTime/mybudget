import styled from "styled-components";

export const FeaturesContainer = styled.div`
  padding-bottom: 100px;
  padding-top: 100px;
  max-height: 100%;
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  justify-content: center;
  margin: auto;
`;

export const RowOne = styled.div`
  padding: 10px;
  margin-left: 10px;
`;

export const RowOneHeading = styled.h2`
  font-size: 1.7em;
  font-weight: 700;
  padding: 0 0 15px 0;
  background-image: linear-gradient(#1767b8, aqua);
  background-repeat: no-repeat;
  background-size: 100px 5%, calc(100% - 80%) 100%;
  background-position: left bottom, 1px 0;
`;

export const RowOneSubheading = styled.p`
  display: flex;
  flex-direction: column;
  margin-top: -5px;
  font-size: 0.813rem;
  color: #929091;
  font-weight: 500;
`;

export const RowTwo = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  margin: auto;
  gap: 42px;
  flex-wrap: wrap;
  margin-top: 100px;
  justify-content: center;
`;

export const Br = styled.br``;
