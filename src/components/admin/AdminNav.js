import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {useNavigate} from 'react-router-dom'
import FastfoodOutlinedIcon from '@mui/icons-material/FastfoodOutlined';


function AdminNav() {
  let navigate = useNavigate()
  return <>
      <Navbar sticky="top" bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand><FastfoodOutlinedIcon/> FoodApp</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link onClick={()=>navigate('/dashboard')}>Dashboard</Nav.Link>
            <Nav.Link onClick={()=>navigate('/food-management')}>Food Management</Nav.Link>
            <Nav.Link onClick={()=>navigate('/login')} href="javascript(void)">Logout</Nav.Link>
          </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
  </>
}

export default AdminNav