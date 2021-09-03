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
import React,{useState, useEffect, useContext} from "react";
import {GlobalContext} from '../../GlobalContext';
import '../../assets/css/custom-css.css'
import axios from 'axios';
import {useParams, Link} from 'react-router-dom';
import {ucFirst, ucWords, slug} from '../../function/text';

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
  UncontrolledCarousel
} from "reactstrap";

// core components
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import CardsFooter from "components/Footers/CardsFooter";

const ShowRecipe = ()=>{
  const {BASE_URL, cookie} = useContext(GlobalContext);
  const {id} = useParams();

  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState([
    {ingredient: ''},
    {ingredient: ''}
  ]);
  const [cookingSteps, setCookingSteps] = useState([
    {step: ''}
  ]);
  const [file, setFile] = useState([]);

  // to edit if the user who make the recipe
  const [isMyPost, setIsMyPost] = useState(false);

//   get data recipe
  useEffect(()=>{
    const source = axios.CancelToken.source();
      axios.get(`${BASE_URL}/recipe/${id}`, {
        cancelToken: source.token
      })
      .then(res=>{
        const {name, ingredients, cooking_steps, recipe_photos, user_id} = res.data.recipe;
        setName(name); setIngredients(ingredients); setCookingSteps(cooking_steps);
        const images = [];
        recipe_photos.forEach((image, idx)=>{
          images.push({
            src: image.secure_url,
            altText: name,
            caption: "",
            header: "",
            key: idx,
          })
        })
        setFile([...images]);
        if(cookie.getCookie('id')===user_id){
          setIsMyPost(true);
        }
        source.cancel()
      })
      .catch(err=>{
          alert('something error')
          if(axios.isCancel(err)) return;
      }) 

    return ()=>source.cancel();
  },[BASE_URL, id, cookie]);

  const handleDelete = ()=>{
    let q = window.confirm(`Do you want to delete ${name}`)
    if(q){
      axios.delete(`${BASE_URL}/recipes/${id}`,{
        headers:{
          token: cookie.getCookie('token')
        }
      })
      .then(res=>{
        if(res.status===200){
          window.location.href = '/my-recipes'
        }
      })
      .catch(err=>{
      })
    }
  }

  return(
    <>
      <DemoNavbar/>
      <main>
        <div className="position-relative">
          {/* shape Hero */}
          <section className="section section-shaped section-lg">
            <div className="shape shape-style-1 shape-default">
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
            <Container className="pt-lg-3">
              <Row className="justify-content-center">
                <Col sm="10" xs="12">
                  <Card className="bg-secondary shadow border-0">
                    {isMyPost && 
                      <CardHeader className="text-right">
                        <Link className="mr-2" to={`/my-recipe/${slug(name)}/${id}/edit`}>
                          <button type="button" className="btn btn-sm btn-warning">Edit <i className="fa fa-pencil"></i></button>
                        </Link>
                        <button type="button" className="btn btn-sm btn-danger" onClick={()=>{handleDelete()}}>Hapus <i className="fa fa-trash-o"></i></button>
                      </CardHeader>
                    }
                    <CardBody className="px-lg-5 pt-lg-4 pb-lg-3">
                      <div className="text-center mb-4">
                        <p className="text-bold h3">{ucWords(name)}</p>
                      </div>
                      <Row>
                        <Col className="mx-auto">
                          <UncontrolledCarousel items={file} />
                        </Col>
                      </Row>
                      <Row>
                        <Col className="mx-auto mt-4">
                          <p className="text-bold h4">Ingredients</p>
                          <Row>
                            {
                              ingredients.map((ingredient, idx)=>{
                                return(
                                  <Col xs="12" md="6" lg="4" key={idx}>
                                      <p>{idx+1}. {ucFirst(ingredient.ingredient)}</p>
                                  </Col>
                                )
                              })
                            }
                          </Row>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="mx-auto mt-4">
                          <p className="text-bold h4">Cooking Steps</p>
                          <Row>
                            {
                              cookingSteps.map((step, idx)=>{
                                return(
                                  <Col xs="12" key={idx}>
                                    <p style={{marginBottom:"0px"}}>Step {idx+1}</p>
                                    <p>{ucFirst(step.step)}</p>
                                  </Col>
                                )
                              })
                            }
                          </Row>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Container>
          </section>
          {/* 1st Hero Variation */}
        </div>
      </main>
      <CardsFooter/>
    </>
  )
}

export default ShowRecipe;
