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
import {ucWords, slug} from '../../function/text';

// reactstrap components
import {
  Button,
  Card,
  CardBody,
  Container,
  Row,
  Col
} from "reactstrap";

// core components
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import CardsFooter from "components/Footers/CardsFooter.js";

const Recipes = ()=>{
  const {BASE_URL, arrRecipes} = useContext(GlobalContext);

  const [filteredRecipes, setFilteredRecipes] = useState([]);

  
  useEffect(()=>{
    const source = axios.CancelToken.source();
      axios.get(`${BASE_URL}/recipes`, {cancelToken: source.token}).then(res=>{
        arrRecipes.splice(0,arrRecipes.length);
        for(const recipe of res.data.recipes){
          arrRecipes.push(recipe);
        }
        setFilteredRecipes([...arrRecipes])
        source.cancel()
      })
      .catch(err=>{
        if(axios.isCancel(err)) return;
      }) 

    return ()=>source.cancel();
  },[BASE_URL, arrRecipes]);

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
                      Explore Recipes{" "}
                      <span className="display-4">Find Your Favourite Recipe</span>
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
                  {filteredRecipes.map((recipe, idx)=>{
                    return(
                      <Col lg="4" key={idx} className="mb-4">
                        <Card className="card-lift--hover shadow border-0">
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
                                  Posted by: {ucWords(recipe.username)}
                                </span>
                              </h6>
                            </div>
                            <Link to={`/recipe/${slug(recipe.name)}/${recipe.id}`}>
                              <Button
                                className="mt-4"
                                color={`${idx%3===0 ? 'primary': (idx%3===1 ? 'success':'warning')}`}
                                type="button"
                              >
                                More detail
                              </Button>
                            </Link>
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

export default Recipes;
