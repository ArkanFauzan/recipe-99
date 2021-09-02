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
import React, {useEffect, useContext, useState} from "react";
import {GlobalContext} from '../../GlobalContext';
import axios from 'axios';
import {Link} from 'react-router-dom';

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col
} from "reactstrap";

// core components
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import CardsFooter from "components/Footers/CardsFooter.js";

const MyRecipes = ()=>{
  const {BASE_URL, cookie, arrRecipes} = useContext(GlobalContext);
  // const [myRecipes, setMyRecipes] = useState([]); //list of my recipes
  // list of my recipes when search. data always filtered
  // if search=false, then filtered recipe is full data
  const [filteredMyRecipes, setFilteredMyRecipes] = useState([]); 

  useEffect(()=>{
    const source = axios.CancelToken.source();
      axios.get(`${BASE_URL}/recipes`).then(res=>{
        const recipes = [];
        for(const recipe of res.data.recipes){  
            // to only show the post who posted by the user
            if(recipe.user_id===cookie.getCookie('id')){
                recipes.push(recipe);
            }
        }
        // setMyRecipes([...recipes]);
        setFilteredMyRecipes([...recipes]);
        source.cancel()
      }).catch(err=>{
        if(axios.isCancel(err)) return;
      })
    return ()=>source.cancel();
  },[BASE_URL, arrRecipes, cookie]);

  return (
    <>
      <DemoNavbar />
      <main>
        <div className="position-relative">
          {/* shape Hero */}
          <section className="section section-lg section-shaped pb-250">
            <div className="shape shape-style-1 shape-default">
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
            <Container className="py-lg-md d-flex">
              <div className="col px-0">
                <Row>
                  <Col lg="6">
                    <h1 className="display-3 text-white">
                      My Recipes{" "}
                      <span className="display-4">You Can See and Edit Your Recipes</span>
                    </h1>
                    <p className="lead text-white">
                    </p>
                  </Col>
                </Row>
              </div>
            </Container>
            {/* SVG separator */}
            <div className="separator separator-bottom separator-skew">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                version="1.1"
                viewBox="0 0 2560 100"
                x="0"
                y="0"
              >
                <polygon
                  className="fill-white"
                  points="2560 0 2560 100 0 100"
                />
              </svg>
            </div>
          </section>
          {/* 1st Hero Variation */}
        </div>
        <section className="section section-lg pt-lg-0 mt--200">
          <Container>
            <Row className="justify-content-center">
              <Col lg="12">
                <Row className="row-grid">
                  {filteredMyRecipes.map((recipe, idx)=>{
                    return(
                      <Col lg="4" key={idx} className="mb-4">
                        <Card className="card-lift--hover shadow border-0">
                          <CardHeader className="text-right">
                            <Link className="mr-2" to={`/my-recipe/${recipe.name.replace(/\s/g,'-')}/${recipe.id}/edit`}>
                              <button type="button" className="btn btn-sm btn-warning">Edit <i className="fa fa-pencil"></i></button>
                            </Link>
                            <button type="button" className="btn btn-sm btn-danger">hapus <i className="fa fa-trash-o"></i></button>
                          </CardHeader>
                          <CardBody className="py-5">
                            <div style={{width:'100%',position:'relative', paddingTop:'75%', overflow: 'hidden'}}>
                              <img src={recipe.recipe_photos[0].secure_url}
                                   style={{position:'absolute',top:'50%', left:0, transform: 'translateY(-50%)'}}
                                   width="100%" alt={recipe.name} title={recipe.name}
                              />
                            </div>
                            <div className="mt-3">
                              <h6 className={`${idx%3===0 ? 'text-primary':(idx%3===1 ? 'text-success':'text-warning')}`}>
                                <span className="text-uppercase">{recipe.name}</span> <br/>
                                <span style={{fontSize:'0.85rem'}}>
                                  Posted by: {recipe.username.split(' ').map(value=>{
                                    const textLower = value.toLowerCase();
                                    const text0 = value[0].toUpperCase();
                                    return `${text0}${textLower.substring(1, textLower.length)}`
                                    }).join(' ')} (me)
                                </span>
                              </h6>
                            </div>
                            <Button
                              className="mt-4"
                              color={`${idx%3===0 ? 'primary': (idx%3===1 ? 'success':'warning')}`}
                              href="#pablo"
                              onClick={e => e.preventDefault()}
                            >
                              More detail
                            </Button>
                          </CardBody>
                        </Card>
                      </Col>
                    )
                  })}
                </Row>
              </Col>
            </Row>
          </Container>
        </section>
      </main>
      <CardsFooter />
    </>
  )
}

export default MyRecipes;
