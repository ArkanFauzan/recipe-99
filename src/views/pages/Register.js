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

const Register = ()=>{
  const {BASE_URL} = useContext(GlobalContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRepassword] = useState('');
  const [err, setErr] = useState({
    name:false,
    email: {status:false, message:""},
    password:false,
    repassword:false
  })

  const changeName = (e)=>{
    const nameFilter = e.target.value.replace(/[^A-Z\sa-z]/g, "");
    setName(nameFilter);
  }

  const changePassword = (password)=>{
    let pass = password;
    setPassword(pass);

    const errPass = ( !pass.match(/[a-z]/) || !pass.match(/[A-Z]/) 
                      || !pass.match(/[0-9]/) || pass.length<8) && pass.length!==0 ? true : false ;
    setErr({
      name: err.name,
      email: err.email,
      password: errPass,
      repassword: password!==repassword && repassword.length!==0 ? true : false
    })
  }

  const changeRepassword = (repass)=>{
    setRepassword(repass);

    const errRepass = repass.length!==0 && repass!==password ? true : false ;

    setErr({
      name: err.name,
      email: err.email,
      password: err.password,
      repassword: errRepass
    })
  }

  const validate = async ()=>{
    const errName = name.trim().length<3 ? true : false;
    const errEmail = !email.trim().match(/\w+@\w+\.\w+/) ? true : false;
    const errPass = password.length === 0 ? true : (err.password? true : false);
    let errRepass = repassword.length === 0 ? true : (err.repassword? true : false);

    setErr({
      name:errName,
      email:errEmail?{status:true, message:"Wrong email format"}:{status:false, message:""},
      password:errPass,
      repassword:errRepass
    })

    setEmail(email.trim());
    setName(name.trim()); 

    return !errName && !errEmail && !errPass && !errRepass ? true : false;
  }

  const handleSubmit = async ()=>{
    const valid = await validate();
    if(valid){
      const data = {
        name, email, password
      }
      axios.post(`${BASE_URL}/register`, data).then(res=>{
        if(res.status===200){
          alert('Registration success, login to your account');
          setTimeout(()=>{
            window.location.href = '/login'
          },500)
        }
      }).catch(error=>{
        if(error.response.status===422){
          setErr({
            name: err.name,
            email: {status: true, message: error.response.data.email.message},
            password: err.password,
            repassword: err.repassword
          })
        }
      });
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
                    <CardBody className="px-lg-5 pt-lg-5 pb-lg-2">
                      <div className="text-center text-muted mb-4">
                        <p>Sign Up</p>
                      </div>
                      <Form role="form">
                        <FormGroup>
                          <InputGroup className="input-group-alternative mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-hat-3" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input placeholder="Name" type="text"  
                                  invalid={err.name} value={name}
                                  onChange={(e)=>changeName(e)}
                            />
                            <FormFeedback>{err.name && "Name at least 3 character"}</FormFeedback>
                          </InputGroup>
                        </FormGroup>
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
                            <FormFeedback>{err.email.status && err.email.message}</FormFeedback>
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
                              onChange={(e)=>changePassword(e.target.value)}
                              invalid={err.password}
                            />
                            <FormFeedback>{err.password && <>Password must contain: <br/>
                                                                1. Uppercase letter <br/>
                                                                2. Lowercase letter <br/>
                                                                3. Number <br/>
                                                                4. Minimum 8 character</>}
                            </FormFeedback>
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
                              placeholder="Re-type password"
                              type="password"
                              autoComplete="off"
                              value={repassword}
                              onChange={(e)=>changeRepassword(e.target.value)}
                              invalid={err.repassword}
                            />
                            <FormFeedback>{err.repassword && "Password not match"}</FormFeedback>
                          </InputGroup>
                        </FormGroup>
                        <div className="text-center">
                          <Button
                            className="mt-4"
                            color="primary"
                            type="button"
                            onClick={()=>handleSubmit()}
                          >
                            Create account
                          </Button>
                        </div>
                      </Form>
                    </CardBody>
                    <CardFooter>
                      <Link to="/login"><small>Have an account? Login</small></Link>
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

export default Register;
