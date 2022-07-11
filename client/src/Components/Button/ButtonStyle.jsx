import styled from "styled-components";
import { Link, NavLink } from "react-router-dom";

export const StyledButton = styled.button`
  width: fit-content;
  min-width: 97px;
  font-weight: 550;
  border: thin solid aqua;
  border-radius: 3px;
  cursor: pointer;
  transition: opacity 0.5s;
  background-color: #5865f2;
  border-radius: 10px;
  color: white;
  height: 40px;
  font-size: 1em;
  :hover {
    opacity: 0.3;
  }
  :active {
    opacity: 0.9;
  }
`;

export const StyledOutlineButton = styled(StyledButton)`
  font-size: 25px !important;
  width: 155px;
  height: 70px;
  border: none;
  background-color: lightcoral;
  color: black;
  transition: background-color 0.5s;
  :hover {
    background-color: rgb(248, 250, 253);
    color: #5865f2;
  }
`;

export const StyledPrimaryOutlineButton = styled(StyledOutlineButton)`
  width: 100%;
  font-size: 20px !important;
  height: 45px;
  background: #5865f2;
  :hover {
    color: #56595e;
  }
`;
export const A = styled.a`
  align-items: center;
  text-decoration: none !important;
  &:active {
    color: aqua;
  }
`;

export const StyledLink = styled(Link)`
  align-items: center;
  color: #404040;
  text-decoration: none !important;
`;

export const StyledNavLink = styled(NavLink)`
  align-items: center;
  color: #404040;
  text-decoration: none !important;
`;
