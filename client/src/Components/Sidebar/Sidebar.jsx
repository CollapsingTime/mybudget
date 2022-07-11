import React, { useState } from "react";
import {
  SidebarWrapper,
  IconRow,
  MenuEl,
  SideSubWrapper,
} from "./SidebarStyle.jsx";
import styled from "styled-components";
import { StyledNavLink } from "../Button/ButtonStyle.jsx";
import { Button } from "../Button/Button.jsx";
import { device } from "../../Pages/mediaQueries";

export const LinkWrapper = styled(StyledNavLink)`
  color: #3A5378;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: color 0.3s;
  &:hover {
    color: #404040;
  }
  &:active {
    color: rgba(88, 101, 242, 0.7);
  }
  &.active {
    color: #404040;
  }
  -webkit-tap-highlight-color: transparent;

  @media ${device.laptop} {
    border-radius: 100%;
    margin: auto;
    gap: 0;
    width: 30px;
    height: 30px;
    justify-content: center;
    color: rgb(209, 205, 205);
    &.active {
      color: white;
    }
    &:hover {
      color: white;
      background-color: RGBA(71, 69, 84, 0.2);
    }
  }
`;

const MenuIcon = styled.i`
  z-index: 1000;
  cursor: pointer;
  position: fixed;
  top: 19px;
  left: 80px;
  background-color: rgb(248, 250, 253);
  padding: 9px;
  border-radius: 10px;
  margin-left: 100px;
  color: blue;
  transition: background-color 0.2s;
  :hover {
    background-color: rgba(88, 101, 242, 0.7);
    color: white;
  }
  @media ${device.laptop} {
    display: none;
  }
`;

export const MenuSpan = styled.span`
  @media ${device.laptop} {
    display: none;
  }
`;

export const Sidebar = ({ logout }) => {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  return (
    <>
      <MenuIcon onClick={handleClick} className="fas fa-bars fa-sm" />
      <SidebarWrapper onclick={handleClick} click={click}>
        <SideSubWrapper>
          <MenuEl>
            <LinkWrapper to="/dashboard/overview">
              <i className="fas fa-home"></i>
              <MenuSpan>Главная страница</MenuSpan>
            </LinkWrapper>
          </MenuEl>

          <MenuEl>
            <LinkWrapper to="/dashboard/goalstable">
              <i className="fas fa-server"></i>
              <MenuSpan>Цели</MenuSpan>
            </LinkWrapper>
          </MenuEl>

          <MenuEl>
            <LinkWrapper to="/dashboard/archive">
              <i className="fas fa-minus-square"></i>
              <MenuSpan>Таблица расходов</MenuSpan>
            </LinkWrapper>
          </MenuEl>

          <MenuEl>
            <LinkWrapper to="/dashboard/expenses">
              <i className="fas fa-minus"></i>
              <MenuSpan>Расходы</MenuSpan>
            </LinkWrapper>
          </MenuEl>

          <MenuEl>
            <LinkWrapper to="/dashboard/income">
              <i className="fas fa-plus"></i>
              <MenuSpan>Доходы</MenuSpan>
            </LinkWrapper>
          </MenuEl>

          <MenuEl>
            <LinkWrapper to="/dashboard/tableincome">
              <i className="fas fa-plus-square"></i>
              <MenuSpan>Таблица доходов</MenuSpan>
            </LinkWrapper>
          </MenuEl>

          <MenuEl>
            <LinkWrapper to="/dashboard/settings">
              <i className="fas fa-cog"></i>
              <MenuSpan>Настройки аккаунта</MenuSpan>
            </LinkWrapper>
          </MenuEl>
          <IconRow>
            <MenuEl>
              <Button onClick={(e) => logout(e)}>Выйти</Button>
            </MenuEl>
          </IconRow>
        </SideSubWrapper>
      </SidebarWrapper>
    </>
  );
};
export default Sidebar;
