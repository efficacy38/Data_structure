import React, {useState} from 'react';
import logo from './logo.svg';
import {MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse} from "mdbreact";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css'; 
import 'bootstrap-css-only/css/bootstrap.min.css'; 
import 'mdbreact/dist/css/mdb.css';
import HomePage from './HomePage';
import InsertionSort from './demo1/mainPg';
import SelectionSort from './demo2/selectionSort';
import CountingSort from './demo4/countingSort';
import './App.css';

const Nav = () =>{
  const [isOpen, setOpen] = useState(false);
  const toggleCollapse = ()=>{
    setOpen(!isOpen);
  };
  return(
    <Router>
    <MDBNavbar className = "bg-dark-blue navbar-light" expand="md">
      <MDBNavbarBrand>
        <p className="white-text m-0 font-weight-bold">data structure <span className = 'text-light-blue'>demo</span></p>
      </MDBNavbarBrand>
      <MDBNavbarToggler onClick={toggleCollapse} />
      <MDBCollapse id="navbarCollapse3" isOpen={isOpen} navbar>
        <MDBNavbarNav left  className = "white-text">
          <MDBNavItem active = {false}>
            <MDBNavLink exact to="/" className="white-text font-weight-bolder">Home</MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBNavLink to="/Article/12" className="white-text font-weight-bolder">Article</MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBNavLink to="/InsertionSort" className="white-text font-weight-bolder">InsertionSort</MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBNavLink to="/SelectionSort" className="white-text font-weight-bolder">SelectionSort</MDBNavLink>
          </MDBNavItem>
        </MDBNavbarNav>
      </MDBCollapse>
    </MDBNavbar>
    
    <Switch>
      <Route exact path='/' children={HomePage}></Route>
      <Route path='/InsertionSort' component={InsertionSort}></Route>
      <Route path='/SelectionSort' component={SelectionSort}></Route>
      <Route path='/CountingSort' component={CountingSort}></Route>
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