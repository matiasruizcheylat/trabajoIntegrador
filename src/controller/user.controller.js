const model = require('../database/models/index');

var mensajeExitoso='';



//READ:::::
const getUsers = async (req, res) => {
  const users = await model.User.findAll();
   const { firstName } = req.params;
  res.render('../views/tablaUsers',{users, mensajeExitoso:mensajeExitoso} );
 // return res.status(200).json({ users });
 mensajeExitoso='';
};


const getOneUserByName = async (req, res) => {
  const { firstName } = req.params;
  const users = await model.User.findAll({where: {firstName: firstName}});
  //res.render('../views/tablaUsers',{users} );
  return res.status(200).json({ users });
};


const getDetailUser = async (req, res) => {
   const { id } = req.params;
  const users = await model.User.findByPk(id);
  return res.render('../views/detalleUser',{users} );
 // return res.status(200).json({ users });
};



//--------------------------------
//--------------------------------

//CREATE::
const addUser = async (req, res) => {
  const data = req.body;

  var nuevoNombre=data.firstName;
  console.log(nuevoNombre);
  var cantidad=await model.User.findAll({where: {firstName: nuevoNombre}});
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
  if(data.lastName==''){
    errores.push('El apellido no debe estar vacío');
    unError=true; }

   if(data.password==''){
      errores.push('El password no debe estar vacío');
      unError=true; }

  if(unError==true){
    return res.render('../views/altaUsers' ,{error:errores, datos:data} );
  }
      const inserted = await model.User.create(data);
      mensajeExitoso='Usuario Cargado Exitosamente';
      return res.redirect('/api/v1/users');
      
  };

const formUsersA = async (req, res) => {
  //const users = await model.User.findAll();
  //console.log(users);
  var error=[];
  var datos=[];
  res.render('../views/altaUsers', {error:error, datos:datos} );
 // return res.status(200).json({ users });
};

//--------------------------------
//--------------------------------



//UPDATE:
const updateUser = async (req, res) => {
  const data = req.body;
  const {id}=data.id;
  const { Op } = require("sequelize");

  const userOriginal = await model.User.findByPk(id);
  console.log(data.firstNameV);
  var firstNameV=data.firstNameV;
  var cantidad=await model.User.findAll({where: { firstName:data.firstName, [Op.not]:[{firstName:data.firstNameV}] }});
  var errores=[];
  var unError=false;

    if(cantidad.length > 0){
    //res.send(401, { err: res.locals.err });
    errores.push('El nombre de usuario ya existe Modifique por otro');
    unError=true;
   
  }
   if(data.firstName==''){
    errores.push('El nombre de usuario no debe estar vacío');
    unError=true; }
  if(data.lastName==''){
    errores.push('El apellido no debe estar vacío');
    unError=true; }

   if(data.password==''){
      errores.push('El password no debe estar vacío');
      unError=true; }


  if(unError==true){
    return res.render('../views/modificarUsers' ,{error:errores, datos:data, firstNameV} );
  }else{
       //const datosMod=data;
       //datosMod.splice(data.firstNameV);

       const inserted =await model.User.update(data, { where: { id: data.id } });
       console.log(inserted);
        mensajeExitoso='Usuario Modificado Exitosamente';
        return res.redirect('/api/v1/users');
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
  var firstNameV=datos.firstName;

  res.render('../views/modificarUsers', {error:error, datos:datos, firstNameV} );
 // return res.status(200).json({ users });
};


//--------------------------------
//--------------------------------


//REMOVE
const deleteUser = async (req, res) => {
  const { id } = req.params;
  await model.User.destroy({ where: { id: id } });
  return res.redirect('/api/v1/Users');

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
