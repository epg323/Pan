import PropTypes from "prop-types";
import React from "react";
import { Button, Nav, Navbar, Form } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import GlobalStyle from "../globalStyles";
import Logo from "./logo";

const Navigation = styled(Nav)`
  border: 4px solid #e6f7ff;
  box-sizing: border-box;
  border-radius: 10px;

  font-family: IBM Plex Mono !important;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 24px;
  padding: 0.5% 1.5% 0.5% 1.5% !important;
  text-align: center;
  a {
    padding: 8px 36px !important;
  }

  .active {
    background: #e6f7ff;
    padding: 8px 36px !important;

    box-shadow: 0px 2px 0px rgba(0, 0, 0, 0.016);
    border-radius: 10px;
  }
`;

const Layout = ({ children }) => {
  const location = useLocation();

  return (
    <div>
      <GlobalStyle />
      <Navbar expand="lg" className="p-3 font-weight-bold text-capitalize">
        <Navbar.Brand as={Link} to="/">
          <Logo />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Navigation className="mr-auto ml-auto">
            <Navigation.Link
              active={location.pathname === "/"}
              as={Link}
              to="/"
            >
              Swap
            </Navigation.Link>
            <Navigation.Link
              active={location.pathname === "/claims-page"}
              as={Link}
              to="/claims-page"
            >
              Claim
            </Navigation.Link>
          </Navigation>
          <Form inline>
            <Button className="text-capitalize">Connect Wallet</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
      {children}
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
