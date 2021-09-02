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
import {useParams} from 'react-router-dom';
import {toDataURL,dataURLtoFile} from '../../function/imgSrcToFile';

// reactstrap components
import {
  Button,
  Card,
  CardBody,
  Form,
  FormGroup,
  FormFeedback,
  Input,
  Label,
  InputGroup,
  Container,
  Row,
  Col
} from "reactstrap";

// core components
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import SimpleFooter from "components/Footers/SimpleFooter";

const EditRecipe = ()=>{
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
  const [file, setFile] = useState([])
  const [err, setErr] = useState({
    name:false,
    ingredients:false,
    cookingSteps:false,
    file: {status:false, message:''}
  })

//   get data recipe
  useEffect(()=>{
    const source = axios.CancelToken.source();
      axios.get(`${BASE_URL}/my-recipe/${id}`, {
        cancelToken: source.token,
        headers:{
          'token' : cookie.getCookie('token')
        }
      })
      .then(async res=>{
        const {name, ingredients, cooking_steps, recipe_photos} = res.data.recipe;
        setName(name); setIngredients(ingredients); setCookingSteps(cooking_steps);
        const arrPhoto = [];
        for(const photo of recipe_photos){
            // convert url photo to javascript object
            await toDataURL(photo.secure_url)
            .then(dataUrl => {
                let array = photo.secure_url.split('.');
                let extension = array[array.length-1];
                let fileData = dataURLtoFile(dataUrl, `file image.${extension}`);
                arrPhoto.push({file:fileData, src: URL.createObjectURL(fileData)})
            })
        }
        setFile([...arrPhoto]);
        source.cancel()
      })
      .catch(err=>{
          if(err.response.status===401){
              window.location.href='/my-recipes'
          }else{
              alert('something error')
          }
          if(axios.isCancel(err)) return;
      }) 

    return ()=>source.cancel();
  },[BASE_URL, cookie, id]);

  const showIngredients = ()=>{
    return (ingredients.map((ingredient,idx)=>{return(
      <Col xs={6} key={idx}>
        <InputGroup className="input-group-alternative mb-3">
          <Input  placeholder={`Ingredient ${idx+1}...`} type="text" 
                  value={ingredient.ingredient} 
                  id={idx}
                  onChange={e=>changeIngredients(e.target)} 
                  invalid={idx===0 ? err.ingredients : false}
          />
          {
            (idx===0 || idx===1)
            ? <></> :
            <button type="button" onClick={()=>deleteIngredient(idx)} className="btn btn-sm btn-danger no-uppercase">-</button>
          }
          <FormFeedback>{err.ingredients && "Required (minimum 2 ingredients)"}</FormFeedback>
        </InputGroup>
      </Col>
      )
    })
    )
  }

  const addIngredient = ()=>{
    setIngredients([...ingredients,{ingredient:''}])
  }

  const deleteIngredient = (idx)=>{
    const data = [...ingredients]
    data.splice(idx,1)
    setIngredients([...data]);
  }

  const changeIngredients = (target)=>{
    const {id, value} = target;
    ingredients[id] = Object.assign({},{ingredient:value})

    //update must using splat operator
    setIngredients([...ingredients]);
  }

  const showCookingSteps = ()=>{
    return (cookingSteps.map((step,idx)=>{return(
      <Col xs={12} key={idx}>
        <InputGroup className="input-group-alternative mb-3">
          <Input  placeholder={`Cooking step ${idx+1}...`} type="textarea" rows={3}
                  value={step.step} 
                  id={idx}
                  onChange={e=>changeCookingStep(e.target)} 
                  invalid={idx===0 ? err.cookingSteps : false}
          />
          {
            idx===0
            ? <></> :
            <button type="button" onClick={()=>deleteCookingstep(idx)} className="btn btn-sm btn-danger no-uppercase">-</button>
          }
          <FormFeedback>{err.cookingSteps && "Required (minimum 1 cooking step)"}</FormFeedback>
        </InputGroup>
      </Col>
      )
    })
    )
  }

  const addCookingStep = ()=>{
    setCookingSteps([...cookingSteps,{step:''}])
  }

  const deleteCookingstep = (idx)=>{
    const data = [...cookingSteps]
    data.splice(idx,1)
    setCookingSteps([...data]);
  }

  const changeCookingStep = (target)=>{
    const {id, value} = target;
    cookingSteps[id] = Object.assign({},{step:value})

    //update must using splat operator
    setCookingSteps([...cookingSteps]);
  }

  const changeFile = (e)=>{
    const inputFile = e.target.files[0];
    if(!inputFile) {return};

    let errFile = {status:false, message: ""};
    if(file.length>=3){
      errFile = {status:true, message: "maximum 3 image"};
    }
    else if(file.size>2048000){
      errFile = {status:true, message: "maximum 2 MB"};
    }
    else if (!inputFile.name.match(/\.(jpg|jpeg|png|gif)$/)) {
      errFile = {status:true, message: "must image"};
    }

    if(errFile.status){
      setErr({
        name:err.name,
        ingredients:err.ingredients,
        cookingSteps:err.cookingSteps,
        file: errFile
      });
    }
    else{
      setFile([...file, {file: inputFile, src: URL.createObjectURL(inputFile) }])
      setErr({
        name:err.name,
        ingredients:err.ingredients,
        cookingSteps:err.cookingSteps,
        file: {status:false, message: ""}
      });
    }

  }

  const deleteFile=(idx)=>{
    const data = [...file]
    data.splice(idx,1)
    setFile([...data]);
  }

  const handleSubmit = async()=>{
    const valid = validate();
    if(valid){
        console.log(file);
      const formData = new FormData();
      formData.append('name', name);
      formData.append('ingredients', JSON.stringify(ingredients));
      formData.append('cooking_steps', JSON.stringify(cookingSteps));
      for(const image of file){
        formData.append('recipe_photos', image.file);
      }

      await axios.put(`${BASE_URL}/recipes/${id}`, formData, {
        headers:{
          'token' : cookie.getCookie('token'),
          'content-type': 'multipart/form-data'
        }
      }).then(res=>{
        alert('Update recipe success');
        window.location.href = '/my-recipes'
      }).catch(error=>{

      })
    }
  }

  const validate = ()=>{
    const errName = name.length === 0 ? true : false;
    let errIngredients = false;
    let errCookingSteps = false;
    let errFile = {status:false, message:''}

    // validate ingredients (min 2)
    const dataIngredients = [...ingredients];
    const filteredIngredients = dataIngredients.filter(ingredient=>{
      return ingredient.ingredient;
    })
    if(filteredIngredients.length<2){
      errIngredients = true;
      while(filteredIngredients.length<2){
        filteredIngredients.push({ingredient:''})
      }
    }
    setIngredients([...filteredIngredients])

    // validate cooking steps (min 1)
    const dataCookingSteps = [...cookingSteps];
    const filteredCookingSteps = dataCookingSteps.filter(step=>{
      return step.step;
    })
    if(filteredCookingSteps.length<1){
      errCookingSteps = true;
      while(filteredCookingSteps.length<1){
        filteredCookingSteps.push({step:''})
      }
    }
    setCookingSteps([...filteredCookingSteps]);

    // validate file 
    if(file.length===0) {errFile = {status:true, message:'file image is required'}}

    setErr({
      name : errName,
      ingredients: errIngredients,
      cookingSteps: errCookingSteps,
      file: errFile
    })
    if(errName || errIngredients || errCookingSteps || errFile.status){
      return false;
    }
    else{
      return true;
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
                <Col lg="8" md="8" xs="10">
                  <Card className="bg-secondary shadow border-0">
                    <CardBody className="px-lg-5 pt-lg-4 pb-lg-3">
                      <div className="text-center mb-4">
                        <p className="text-bold">Edit Recipe</p>
                      </div>
                      <Form role="form">
                        <FormGroup>
                          <Label><span>Recipe's name</span></Label>
                          <InputGroup className="input-group-alternative mb-3">
                            <Input  placeholder="Recipe's name..." type="text" 
                                    value={name} onChange={e=>setName(e.target.value)} 
                                    invalid={err.name}
                            />
                            <FormFeedback>{err.name && "Required"}</FormFeedback>
                          </InputGroup>
                        </FormGroup>
                        <FormGroup>
                          <Label><span>Ingredients</span></Label>
                          <Label className="px-4">
                            <button type="button" onClick={()=>addIngredient()} className="btn btn-sm btn-primary no-uppercase">Add Ingredient</button>
                          </Label>
                          <Row>
                            {showIngredients()}
                          </Row>
                        </FormGroup>
                        <FormGroup>
                          <Label><span>Cooking Steps</span></Label>
                          <Label className="px-4">
                            <button type="button" onClick={()=>addCookingStep()} className="btn btn-sm btn-primary no-uppercase">Add Cooking Steps</button>
                          </Label>
                          <Row>
                            {showCookingSteps()}
                          </Row>
                        </FormGroup>
                        <FormGroup>
                          <Label><span>File (click to add image and maximum 3 image)</span></Label>
                          <InputGroup>
                            <Input type="file" name="file" onChange={(e)=>changeFile(e)} invalid={err.file.status}/>
                            <FormFeedback>{err.file.status && err.file.message}</FormFeedback>
                          </InputGroup>
                          <Row className="pt-3">
                            {file.map((file,idx)=>{
                              return(
                                <Col sm={4} key={idx}>
                                  <div style={{width:'100%',position:'relative', paddingTop:'100%', overflow: 'hidden'}}>
                                    <button className="btn btn-sm btn-danger" 
                                            type="button"
                                            style={{position:'absolute',top:0, right:0, zIndex:10, margin:0}}
                                            onClick={()=>deleteFile(idx)}> X
                                    </button>
                                    <img src={file.src} width="100%" alt="recipe" style={{position:'absolute',top:0, left:0}}></img>
                                  </div>
                                </Col>
                              )
                            })}
                          </Row>
                        </FormGroup>
                        <div className="text-center">
                          <Button
                            className="mt-4"
                            color="primary"
                            type="button"
                            onClick={()=>{handleSubmit()}}
                          >
                            Save
                          </Button>
                        </div>
                      </Form>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Container>
          </section>
          {/* 1st Hero Variation */}
        </div>
      </main>
      <SimpleFooter/>
    </>
  )
}

export default EditRecipe;
