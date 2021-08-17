const { Router } = require("express");
const userRoutes = require("./user.routes");
const taskRoutes = require("./task.routes");
const authRoutes = require("./auth.routes");

const express = require('express');
var layout = require('express-layout');

const model = require('../database/models/index');

const {
  getUsers,
} = require("../controller/user.controller");

const loggedInRoutes = () => {
  // aca se registran todas las rutas de la parte interior
  const router = Router();
  este2=router.use("/users", userRoutes);
  router.use("/tasks", taskRoutes);

  return router;
};

const authroutes = () => {
  // aca se registran todas las rutas de la parte exterior
  const router = Router();
  //const usuarios=router.get("/yy", getUsers);

  //var esto=getUsers;
 // var esto=  router.use("/users", getUsers);

// const users =  model.User.findAll();
// var esto= router.status(200).json({ users });


  var usuaritos= {"users":[{"id":1,"firstName":"CARLITOxxx","lastName":"CcC","email":"CARL@gmail.com","password":"teras"},{"id":2,"firstName":"Franquito","lastName":"ff","email":"fran_curso@gmail.com","password":"hola_pass"}]};

  //console.log("s");
  //console.log(usuarios);

  /*
  model.findAll({}).exec(function(err, usuaritos){
    if( err ){ console.log('Error: ', err); return; }
    console.log("The INDEX");
  

  router.get('/', (req, res) => res.render('hola', {usuaritos}));
  }; */

  var usuarios=router.get('/ELADO', getUsers);
  //var marios = await model.User.findAll();

  router.get('/', (req, res) => res.render('hola', {usuarios:usuarios}));
 // router.get("/", (req,res)=>res.render("../views/hola", locals));
  //router.get("/", (req,res)=>res.send("WELCOME TO THE API!"));
 // router.use("/auth", authRoutes);
  return router;
};

module.exports = { loggedInRoutes, authroutes };
