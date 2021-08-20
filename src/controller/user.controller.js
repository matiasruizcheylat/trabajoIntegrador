const model = require('../database/models/index');

var mensajeExitoso='';
const bcrypt = require('bcryptjs');

const { authJwt } = require("../middleware");




//READ:::::
const getUsers = async (req, res) => {
  miId= req.cookies["miId"] || '';
  const users = await model.User.findAll();
   const { username } = req.params;
  res.render('../views/tablaUsers',{users, mensajeExitoso:mensajeExitoso, miId} );

 mensajeExitoso='';
 return res.status(200).json({ users });
};


const getOneUserByName = async (req, res) => {
  const { username } = req.params;
  const users = await model.User.findAll({where: {username: username}});
  //res.render('../views/tablaUsers',{users} );
  return res.status(200).json({ users });
};


const getDetailUser = async (req, res) => {
   const { id } = req.params;
  const users = await model.User.findByPk(id);
   res.render('../views/detalleUser',{users} );
  return res.status(200).json({ users });
};



//--------------------------------
//--------------------------------

//CREATE::
const addUser = async (req, res) => {
  const data = req.body;

  var nuevoNombre=data.username;
  console.log(nuevoNombre);
  var cantidad=await model.User.findAll({where: {username: nuevoNombre}});
  var errores=[];
  var unError=false;
  if(cantidad.length > 0){
    //res.send(401, { err: res.locals.err });
    errores.push('El nombre de usuario ya existe inserte otro');
    unError=true;
   
  }
  if(nuevoNombre==''){
    errores.push('El nombre de usuario no debe estar vacío');
    unError=true; }
    if(data.firstName==''){
      errores.push('El nombre no debe estar vacío');
      unError=true; }
  if(data.lastName==''){
    errores.push('El apellido no debe estar vacío');
    unError=true; }

   if(data.password==''){
      errores.push('El password no debe estar vacío');
      unError=true; }


  if(unError==true){
    return res.render('../views/altaUsers' ,{error:errores, datos:data} );
  }   
      data.password=bcrypt.hashSync(data.password, 8);
      const inserted = await model.User.create(data);
      mensajeExitoso='Usuario Cargado Exitosamente';
      return res.redirect('/users');
      
  };

const formUsersA = async (req, res) => {
  //const users = await model.User.findAll();
  //console.log(users);
  var error=[];
  var datos=[];
  res.render('../views/altaUsers', {error:error, datos:datos} );
  return res.status(200).json({ users });
};

//--------------------------------
//--------------------------------



//UPDATE:
const updateUser = async (req, res) => {
  const data = req.body;
  const {id}=data.id;
  const { Op } = require("sequelize");

  const userOriginal = await model.User.findByPk(id);
  var errores=[];
  var unError=false;

    if(data.firstName==''){
      errores.push('El nombre no debe estar vacío');
      unError=true; }

  if(data.lastName==''){
    errores.push('El apellido no debe estar vacío');
    unError=true; }


  if(unError==true){
    return res.render('../views/modificarUsers' ,{error:errores, datos:data} );
  }else{
       //const datosMod=data;
       //datosMod.splice(data.usernameV);
       const inserted =await model.User.update(data, { where: { id: data.id } });
       console.log(inserted);
        mensajeExitoso='Usuario Modificado Exitosamente';
        return res.redirect('/users');
  }

  console.log(cantidad);


  //const updated = await model.User.update(data, { where: { id: id } });
  //console.log(updated);
  //const user = await model.User.findByPk(id);
  
  return res.status(200).json({ data });
};



const formUsersM = async (req, res) => {
  //const users = await model.User.findAll();
  //console.log(users);
  var error=[];
  const {id}=req.params;
  var datos=await model.User.findByPk(id);

  res.render('../views/modificarUsers', {error:error, datos:datos} );
 // return res.status(200).json({ users });
};


//--------------------------------
//--------------------------------


//REMOVE
const deleteUser = async (req, res) => {
  const { id } = req.params;
  if(id== req.cookies["miId"]){
    console.log("NO SE PUEDE AUTODESTRUIR");
  }else{
  await model.User.destroy({ where: { id: id } });}
  return res.redirect('/users');

};








module.exports = {
  getUsers,
  addUser,
  getDetailUser,
  deleteUser,
  updateUser,
  formUsersA,
  formUsersM,
  getOneUserByName,
};
