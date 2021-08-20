const { Router } = require("express");
const userRoutes = require("./user.routes");
const taskRoutes = require("./task.routes");
const authRoutes = require("./auth.routes");

const express = require('express');
var layout = require('express-layout');

const model = require('../database/models/index');




const rutas = () => {
  
  const router = Router();

  router.use("/auth", authRoutes);

  router.use("/users", userRoutes);
  router.use("/tasks", taskRoutes);

  router.get('/', (req, res) =>{
    var esto=req.cookies["x-access-token"];
    console.log(esto);
    var logueado='';
    if(esto!=''){
      logueado='logueado';
    }
    res.render('hola',{logueado})});
 
  return router;
};

module.exports = { rutas };
