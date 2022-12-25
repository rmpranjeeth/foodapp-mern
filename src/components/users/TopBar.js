import React from "react";
import { useNavigate } from "react-router-dom";
import FastfoodOutlinedIcon from "@mui/icons-material/FastfoodOutlined";
import Badge from "react-bootstrap/Badge";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


function TopBar(props) {
  let navigate = useNavigate();
  return (
    <>
      <Navbar sticky="top" bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand><FastfoodOutlinedIcon/> FoodApp</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link onClick={() => navigate("/user-menu")}>Home</Nav.Link>
            <Nav.Link onClick={() => navigate("/user-cart")}>Cart <Badge bg="danger">{props.value.cart.length}</Badge></Nav.Link>
            <Nav.Link onClick={() => navigate("/order-success")}>My Orders</Nav.Link>
            <Nav.Link onClick={()=>navigate('/login')}>Logout</Nav.Link>
          </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default TopBar;
