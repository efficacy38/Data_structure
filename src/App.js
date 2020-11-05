import React, {useState} from 'react';
import logo from './logo.svg';
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
      } from "mdbreact";
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css'; 
import 'bootstrap-css-only/css/bootstrap.min.css'; 
import 'mdbreact/dist/css/mdb.css';
import HomePage from './HomePage';
import InsertionSort from './demo1/mainPg';
import SelectionSort from './demo2/selectionSort';
import CountingSort from './demo4/countingSort';
import BubbleSort from './demo3/BubbleSort';
import ShellSort from './demo5/ShellSort';
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
          <MDBNavItem>
            <MDBNavLink to="/CountingSort" className="white-text font-weight-bolder">CountingSort</MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBNavLink to="/BubbleSort" className="white-text font-weight-bolder">BubbleSort</MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBNavLink to="/ShellSort" className="white-text font-weight-bolder">ShellSort</MDBNavLink>
          </MDBNavItem>
        </MDBNavbarNav>
      </MDBCollapse>
    </MDBNavbar>
    
    <Switch>
      <Route exact path='/' children={HomePage}></Route>
      <Route path='/InsertionSort' component={InsertionSort}></Route>
      <Route path='/SelectionSort' component={SelectionSort}></Route>
      <Route path='/CountingSort' component={CountingSort}></Route>
      <Route path='/BubbleSort' component={BubbleSort}></Route>
      <Route path='/ShellSort' component={ShellSort}></Route>
      {/* <Route path={`${'/Article'}/:id`} component = {Article} /> */}
    </Switch>
  </Router>
  );
}

const Footer = () =>{
  return(
    <MDBFooter className="font-small pt-4 mt-4 bg-dark-blue">
    <MDBContainer fluid className="text-center text-md-left">
      <MDBRow>
        <MDBCol md="6">
          <h5 className="title">demo~</h5>
          <p>
            react data structure demo
          </p>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
    <div className="footer-copyright text-center py-3">
      <MDBContainer fluid>
        &copy; {new Date().getFullYear()} Copyright: efficacy38
      </MDBContainer>
    </div>
  </MDBFooter>
  )
}

function App() {
  return (
    <>
      <div className="App" style = {{minHeight: "100vh"}}>
        <Nav />
      </div>
      <Footer />
    </>
  );
}

export default App;