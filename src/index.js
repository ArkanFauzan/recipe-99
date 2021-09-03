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
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "./assets/vendor/nucleo/css/nucleo.css";
import "./assets/vendor/font-awesome/css/font-awesome.min.css";
import "./assets/scss/argon-design-system-react.scss?v1.1.0";
import "./assets/css/custom-css.css";

import Login from "./views/pages/Login.js";
import Register from "./views/pages/Register.js";
import AddRecipe from "./views/pages/AddRecipe";
import EditRecipe from "./views/pages/EditRecipe";
import Recipes from './views/pages/Recipes';
import MyRecipes from './views/pages/MyRecipes';
import ShowRecipe from './views/pages/ShowRecipe';

import {GlobalContext} from './GlobalContext';
import {cookie} from './function/cookie';

const validateNoAuth = (page)=>{
  const token = cookie.getCookie('token');
  const id = cookie.getCookie('id');
  if(token==='' && id===''){
    return page;
  }
  else{
    return window.location.href = '/recipes'
  }
}

const validateMustAuth = (page)=>{
  const token = cookie.getCookie('token');
  const id = cookie.getCookie('id');
  if(token!=='' && id!==''){
    return page;
  }
  else{
    return window.location.href = '/login'
  }
}

const arrRecipes = []; 

ReactDOM.render(
  <GlobalContext.Provider value={{BASE_URL: "https://recipe-99.herokuapp.com",cookie, arrRecipes}}>
    <BrowserRouter>
      <Switch>
        <Route path="/login-page" exact render={props => <Login {...props} />} />
        <Route
          path="/register"
          exact
          render={()=>validateNoAuth(<Register/>) }
        />
        <Route
          path="/login"
          exact
          render={()=> validateNoAuth(<Login/>) }
        />
        <Route
          path="/recipes"
          exact
          render={() => <Recipes/>}
        />
        <Route
          path="/add-recipes"
          exact
          render={props => validateMustAuth(<AddRecipe/>)}
        />
        <Route
          path="/my-recipes"
          exact
          render={props => validateMustAuth(<MyRecipes/>)}
        />
        <Route
          path="/my-recipe/:recipeName/:id/edit"
          exact
          render={props => validateMustAuth(<EditRecipe/>)}
        />
        <Route
          path="/recipe/:recipeName/:id"
          exact
          render={props => <ShowRecipe/>}
        />
        <Redirect to="/recipes" />
      </Switch>
    </BrowserRouter>
  </GlobalContext.Provider>,
  document.getElementById("root")
);
