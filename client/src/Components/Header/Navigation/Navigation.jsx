import React from "react";
import { StyledLink } from "../../Button/ButtonStyle.jsx";
import styled from "styled-components";
import { Button } from "../../Button/Button.jsx";
import {
  NavbarWrapper,
  NavMenu,
  NavbarContainer,
  NavItem,
} from "./NavigationStyle.jsx";

const LogoWrapper = styled(StyledLink)`
  display: flex;
  gap: 1px;
  align-items: center;
  justify-content: center;
  transition: color 0.3s;
`;

const Text = styled.span`
  font-size: 1.1em;
  color: #5865f2;
  font-weight: 600;
  &:hover {
    color: rgba(88, 101, 242, 0.7);
  }
`;

const LogoText = () => (
  <LogoWrapper to="/">
    <Text>MyBudget</Text>
  </LogoWrapper>
);

const Navbar = () => {
  return (
    <NavbarWrapper>
      <NavbarContainer>
        <LogoText />
        <NavMenu>
          <NavItem>
            <Button to="/signin">Логин</Button>
          </NavItem>
          <NavItem>
            <Button to="/signup">Регистрация</Button>
          </NavItem>
        </NavMenu>
      </NavbarContainer>
    </NavbarWrapper>
  );
};

export default Navbar;
