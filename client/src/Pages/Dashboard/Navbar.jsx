import React from "react";
import styled, { keyframes } from "styled-components";
import { StyledLink } from "../../Components/Button/ButtonStyle.jsx";

export const PpContainer = styled.div``;

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

const PpCircle = styled.div`
  background: blue;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NameFirstLetter = styled.div`
  font-size: 0.8em;
  color: white;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -o-user-select: none;
  user-select: none;
  text-align: left;
`;

const UserCreds = styled.div`
  color: #404040;
  display: flex;
  gap: 5px;
  justify-content: center;
  align-items: center;
  background-color: rgb(248, 250, 253);
  padding: 7px;
  border-radius: 15px;
`;

const NavbarWrapper = styled.nav`
  z-index: 999;
  display: flex;
  position: fixed;
  left: 0;
  right: 0;
  top: 0px;
  background-color: #F0EFE9;
`;

const NavMenu = styled.div`
  padding: 0 5px 0 0;
  margin: 0;
  gap: 20px;
  list-style: none;
  display: flex;
  align-items: center;
  margin-left: auto;
`;
const NavbarContainer = styled.div`
  height: 70px;
  padding-right: 20px;
  padding-left: 29px;
  display: flex;
  align-items: center;
  width: 100vw;
`;
const UserName = styled.span`
  font-weight: 700;
  font-size: 0.7em;
`;

const Nav = ({ name }) => {
  return (
    <NavbarWrapper>
      <NavbarContainer>
        <LogoText />
        <NavMenu>
          <UserCreds>
            <UserName>{name}</UserName>
            <PpContainer>
              <PpCircle>
                <NameFirstLetter>{name[0]}</NameFirstLetter>
              </PpCircle>
            </PpContainer>
          </UserCreds>
        </NavMenu>
      </NavbarContainer>
    </NavbarWrapper>
  );
};

export default Nav;
