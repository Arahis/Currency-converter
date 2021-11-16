import React from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

const Nav = styled.nav`
  padding: 2em;
  ul {
    display: flex;
    justify-content: center;
    list-style: none;
  }
  li {
    margin: 0 1em;
    &.active {
      background-color: yellow;
    }
  }
  a {
    text-decoration: none;
    color: #000;
  }
`;

const Navbar = () => {
  const location = useLocation();
  const { pathname } = location;
  const splitLocation = pathname.split("/");

  return (
    <Nav>
      <ul>
        <li className={splitLocation[1] === "" ? "active" : ""}>
          <Link to="/">Exchange Form</Link>
        </li>
        <li className={splitLocation[1] === "dashboard" ? "active" : ""}>
          <Link to="/dashboard">Exchange Table</Link>
        </li>
      </ul>
    </Nav>
  );
};

export default Navbar;
