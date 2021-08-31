/*!

=========================================================
* Argon Design System React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-design-system-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-design-system-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import { Link } from "react-router-dom";
// JavaScript plugin that hides or shows a component based on your scroll
import Headroom from "headroom.js";
// import global context
import {GlobalContext} from '../../GlobalContext';
// reactstrap components
import {
  Button,
  UncontrolledCollapse,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
  NavbarBrand,
  Navbar,
  NavItem,
  Nav,
  Container,
  Row,
  Col,
} from "reactstrap";

import axios from 'axios';

class DemoNavbar extends React.Component {
  componentDidMount() {
    let headroom = new Headroom(document.getElementById("navbar-main"));
    // initialise
    headroom.init();

    // check the user (logged or not)
    this.getUser();
  }
  state = {
    collapseClasses: "",
    collapseOpen: false,
    logged: {
      status: this.context.cookie.getCookie('token') || '',
      id: this.context.cookie.getCookie('id'),
      name: this.context.cookie.getCookie('name'),
      email: this.context.cookie.getCookie('email')
    }
  };

  onExiting = () => {
    this.setState({
      collapseClasses: "collapsing-out"
    });
  };

  onExited = () => {
    this.setState({
      collapseClasses: ""
    });
  };

  static contextType = GlobalContext;

  // check the user (logged or not)
  getUser = async ()=>{
    const {BASE_URL, cookie} = this.context;
    const token = cookie.getCookie('token');
    if(token==='') {return};

    await axios.get(`${BASE_URL}/get-user`,{
      headers:{
        "token" : token
      }
    }).then(res=>{
      if(res.status===200){
        let user = res.data.user;
        this.setState(prev=>
          prev.logged={
            status: true,
            id: user.id,
            name: user.name,
            email: user.email
          }
        )
      }
    }).catch(e=>{
      this.logout();
    })
  }

  logout = ()=>{
    const {cookie} = this.context;
    cookie.setCookie('token','',-1);
    cookie.setCookie('id','',-1);
    cookie.setCookie('name','',-1);
    cookie.setCookie('email','',-1);
    this.setState(prev=>
      prev.logged={
        status: false,
        id: '',
        name: '',
        email: ''
      }
    )
    window.location.href = '/recipes';
  }

  render() {
    return (
      <>
        <header className="header-global">
          <Navbar
            className="navbar-main navbar-transparent navbar-light headroom"
            expand="lg"
            id="navbar-main"
            >
            <Container>
              <NavbarBrand className="mr-lg-5" to="/" tag={Link}>
                <img
                  alt="..."
                  src={require("assets/img/brand/argon-react-white.png")}
                />
              </NavbarBrand>
              <button className="navbar-toggler" id="navbar_global">
                <span className="navbar-toggler-icon" />
              </button>
              <UncontrolledCollapse
                toggler="#navbar_global"
                navbar
                className={this.state.collapseClasses}
                onExiting={this.onExiting}
                onExited={this.onExited}
              >
                <div className="navbar-collapse-header">
                  <Row>
                    <Col className="collapse-brand" xs="6">
                      <Link to="/">
                        <img
                          alt="..."
                          src={require("assets/img/brand/argon-react.png")}
                        />
                      </Link>
                    </Col>
                    <Col className="collapse-close" xs="6">
                      <button className="navbar-toggler" id="navbar_global">
                        <span />
                        <span />
                      </button>
                    </Col>
                  </Row>
                </div>
                <Nav className="navbar-nav-hover align-items-lg-center ml-lg-auto" navbar>
                  <span>
                    <i className="ni ni-collection d-lg-none mr-1 custom-icon-link" />
                    <Link to="/recipes" className="custom-nav-link">Explore Recipes</Link>
                  </span>

                  {this.state.logged.status ? 
                    <>
                      <UncontrolledDropdown nav>
                        <DropdownToggle nav>
                          <i className="ni ni-collection d-lg-none mr-1 custom-icon-link" />
                          <span className="nav-link-inner--text">Hi, {this.state.logged.name} <i className="ni ni-bold-down"></i></span>
                        </DropdownToggle>
                        <DropdownMenu>
                          <DropdownItem to="/my-recipes" tag={Link}>
                            My Recipes
                          </DropdownItem>
                          <DropdownItem to="/add-recipes" tag={Link}>
                            Add New Recipes
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                      <span className="display-only-mobile">
                        <i className="ni ni-collection d-lg-none mr-1 custom-icon-link" />
                        <span onClick={()=>this.logout()} className="custom-nav-link">Logout</span>
                      </span>
                      <NavItem className="d-none d-lg-block ml-lg-4">
                        <Button
                          className="btn-neutral btn-icon"
                          color="default"
                          onClick={()=>this.logout()}
                        >
                          <span className="nav-link-inner--text ml-1">
                            Logout
                          </span>
                        </Button>
                      </NavItem>
                    </>

                    :

                    <>
                      <span className="display-only-mobile" style={{padding:'0.625rem 0'}}>
                        <i className="ni ni-collection d-lg-none mr-1 custom-icon-link" />
                        <Link to="/login" className="custom-nav-link">Login</Link>
                      </span>
                      <NavItem className="d-none d-lg-block ml-lg-4">
                        <Link
                          className="btn-neutral btn-icon btn btn-default"
                          color="default"
                          to="/login"
                        >
                          <span className="nav-link-inner--text ml-1">
                            Login
                          </span>
                        </Link>
                      </NavItem>
                    </>


                  }
                </Nav>
              </UncontrolledCollapse>
            </Container>
          </Navbar>
        </header>
      </>
    );
  }
}

export default DemoNavbar;
