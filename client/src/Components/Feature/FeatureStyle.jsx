import styled from "styled-components";
import { device } from "../../Pages/mediaQueries";
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 240px;
  height: 250px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-radius: 15px;
  padding: 10px;
  text-align: center;
  transition: margin-top 0.2s;
  user-select: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  :hover {
    margin-top: -20px;
  }
  @media ${device.tablet} {
    :hover {
      margin-top: 0px;
    }
  }
`;

export const Heading = styled.h4`
  font-size: 0.9em;
  color: blue;
  font-weight: 600;

  margin-bottom: -5px;
`;

export const Icon = styled.i`
  margin-top: 50px;
  color: aqua;
`;

export const P = styled.p`
  color: #425466;
`;
