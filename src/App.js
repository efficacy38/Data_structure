import React, {useState, Component} from 'react';
import logo from './logo.svg';
import {MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBDropdown,
  MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon} from "mdbreact";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css'; 
import 'bootstrap-css-only/css/bootstrap.min.css'; 
import 'mdbreact/dist/css/mdb.css';
import HomePage from './HomePage';
import InsertionSort from './demo1/mainPg';
import './App.css';

const Nav = () =>{
  const [isOpen, setOpen] = useState(false);
  const toggleCollapse = ()=>{
    setOpen(!isOpen);
  };
  return(
    <Router>
    <MDBNavbar className = "bg-white navbar-light" expand="md">
      <MDBNavbarBrand>
        <p className="black-text m-0 font-weight-bold">data structure demo</p>
      </MDBNavbarBrand>
      <MDBNavbarToggler onClick={toggleCollapse} />
      <MDBCollapse id="navbarCollapse3" isOpen={isOpen} navbar>
        <MDBNavbarNav left  className = "black-text">
          <MDBNavItem active = {false}>
            <MDBNavLink exact to="/" className="text-dark-blue font-weight-bold">Home</MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBNavLink to="/Article/12" className="text-dark-blue font-weight-bold">Article</MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBNavLink to="/InsertionSort" className="text-dark-blue font-weight-bold">selectionSort</MDBNavLink>
          </MDBNavItem>
        </MDBNavbarNav>
      </MDBCollapse>
    </MDBNavbar>
    
    <Switch>
      <Route exact path='/' children={HomePage}></Route>
      <Route path='/InsertionSort' component={InsertionSort}></Route>
      {/* <Route path={`${'/Article'}/:id`} component = {Article} /> */}
    </Switch>
  </Router>
  );
}

function App() {
  return (
    <div className="App">
      <Nav />
    </div>
  );
}

export default App;