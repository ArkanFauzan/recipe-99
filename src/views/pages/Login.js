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
import React, { useState, useContext} from "react";
import {GlobalContext} from '../../GlobalContext';
import {Link} from 'react-router-dom';

// reactstrap components
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  FormGroup,
  Form,
  Input,
  FormFeedback,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col
} from "reactstrap";

// core components
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import CardsFooter from "components/Footers/CardsFooter.js";

// import package
import axios from 'axios';

const Login = ()=>{
  const {BASE_URL,cookie} = useContext(GlobalContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState({
    email:  {status: false, message: ""},
    password: {status: false, message: ""}
  });

  const validate = async ()=>{
    setEmail(email.trim());
    let errEmail = {status:false, message:''};
    let errPass = {status:false, message:''};

    if(email.trim().length===0){errEmail = {status:true, message:"Email can't be empty"}}
    else if(!email.trim().match(/\w+@\w+\.\w+/)){errEmail = {status:true, message:"Wrong email format"}}

    if(password.length === 0){errPass = {status:true, message:"Password can't be empty"}}

    setErr({
      email : errEmail,
      password: errPass
    })

    return !errEmail.status && !errPass.status ? true : false;
  }

  const handleSubmit = async ()=>{
    const valid = await validate();
    if(valid){
      const data = {
        email, password
      }
      axios.post(`${BASE_URL}/login`, data).then(res=>{
        if(res.status===200){
          cookie.setCookie('token',res.data.token,17);
          cookie.setCookie('id',res.data.user.id,17);
          cookie.setCookie('name',res.data.user.name,17);
          cookie.setCookie('email',res.data.user.email,17);

          window.location.href = '/recipes'
        }
      }).catch(error=>{
        setErr({
          email: {status:false, message:''},
          password: {status: true, message: error.response.data.message}
        })
      })
    }
  }

  return(
    <>
        <DemoNavbar />
        <main>
          <section className="section section-shaped section-lg">
            <div className="shape shape-style-1 bg-gradient-default">
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
            <Container className="pt-lg-7">
              <Row className="justify-content-center">
                <Col lg="5">
                  <Card className="bg-secondary shadow border-0">
                    <CardBody className="px-lg-5 pt-lg-5 pb-lg-3">
                      <div className="text-center text-muted mb-4">
                        <p>Login to Your Account</p>
                      </div>
                      <Form role="form">
                        <FormGroup>
                          <InputGroup className="input-group-alternative mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-email-83" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input placeholder="Email" type="text" 
                                  invalid={err.email.status} value={email}
                                  onChange={(e)=>setEmail(e.target.value)}
                            />
                            <FormFeedback>{err.email.status && `${err.email.message}`}</FormFeedback>
                          </InputGroup>
                        </FormGroup>
                        <FormGroup>
                          <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-lock-circle-open" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder="Password"
                              type="password"
                              autoComplete="off"
                              value={password}
                              onChange={(e)=>setPassword(e.target.value)}
                              invalid={err.password.status}
                            />
                            <FormFeedback>{err.password.status && `${err.password.message}`}
                            </FormFeedback>
                          </InputGroup>
                        </FormGroup>
                        <div className="text-center">
                          <Button
                            className="mt-4"
                            color="primary"
                            type="button"
                            onClick={()=>handleSubmit()}
                          >
                            Login
                          </Button>
                        </div>
                      </Form>
                    </CardBody>
                    <CardFooter>
                      <Link to="/register"><small>Don't have account? Register</small></Link>
                    </CardFooter>
                  </Card>
                </Col>
              </Row>
            </Container>
          </section>
        </main>
        <CardsFooter />
      </>
  )
}

export default Login;
