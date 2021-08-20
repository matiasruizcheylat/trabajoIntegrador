const model = require('../database/models/index');

var mensajeExitoso='';

function tareasDelUsuario(id){
  const users = model.User.findByPk(id);
  return users;
}


function formatDate(date) {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [year, month, day].join('-');
}




//Leer tareas
const getTasks = async (req, res) => {
  var idUser=req.params.id;
  console.log(idUser);
  datosUser=await tareasDelUsuario(idUser);
  if(datosUser==null){ res.redirect("/");}
  var username=datosUser.username;
  
  const tasks = await model.Task.findAll({where:{userId:idUser}});
  res.render('../views/tablaTasks',{tasks, mensajeExitoso:mensajeExitoso, idUser, username} );
  mensajeExitoso='';
 return res.status(200).json({ users });
};


const getDetailTasks = async (req, res) => {

  const { id } = req.params;
  console.log(id);
 const task = await model.Task.findByPk(id);
  res.render('../views/detalleTask',{task} );
 //return res.status(200).json({ tasks });
};







//CREAR TAREAS
const formTaskA = async (req, res) => {
  const  idUser  = req.params.id;

  //const users = await model.User.findAll();
  console.log(idUser);
  var error=[];
  var datos=[];
  datosUser=await tareasDelUsuario(idUser);
  if(datosUser==null){ res.redirect("/");}

  res.render('../views/altaTasks', {error:error, datos:datos, idUser} );
 // return res.status(200).json({ users });
};





//esta opcion usa el setter que nos provee sequelize
const addTask = async (req, res) => {
   
  const data = req.body;

  console.log(data);
   
  var errores=[];
  var unError=false;
 
  if(data.name==''){
    errores.push('El título de la tarea está vacio');
    unError=true; }
    if(data.startDate==''){
      errores.push('Necesita fecha inicio');
      unError=true; }
  if(data.endDate==''){
    errores.push('Necesita fecha de fin');
    unError=true; }

    const iddUser= data.idUser;
  if(unError==true){
    return res.render('../views/altaTasks' ,{error:errores, datos:data, idUser:iddUser} );
  }   

      const { name, description, startDate, endDate, completed } = req.body; 
      const inserted = await model.Task.create({ name, description, startDate, endDate, completed, userId: iddUser });
      mensajeExitoso='Tarea cargada con éxito';
      return res.redirect('/tasks/'+iddUser);
  

};

//esta opcion es mas rapida, agarramos el id del usuario que decodificamos en el token
// y lo enviamos directamente al crear la task
const addTaskOpcionA = async (req, res) => {
  const { userId } = req;
  const { name, description, startDate, endDate } = req.body;
  const inserted = await model.Task.create({
    name,
    description,
    startDate,
    endDate,
    UserId: userId, //insertamos el id del usuario directamente al crear la task
  });
  return res.status(201).json({ inserted });
};

const deleteTask = async (req, res) => {
 var {id} = req.params;
 console.log({id});
 laTask=await model.Task.findByPk(id);
 console.log(laTask.userId);
 destruida= await model.Task.destroy({ where: { id: id } });
 // const tasks = await model.Task.findAll();
  //return res.status(200).json({ tasks });
  return res.redirect('/tasks/'+laTask.userId);
};




//UPDATE TASKS::::::::::

const formTaskM = async (req, res) => {
  //const users = await model.User.findAll();
  //console.log(users);

  var error=[];
   const { id } = req.params;
   console.log(id);
   var datos = await model.Task.findByPk(id);
   console.log(datos.completed);
   var startDate=formatDate(datos.startDate);
   var endDate=formatDate(datos.endDate);
   
  res.render('../views/modificarTasks', {error:error, datos:datos, startDate, endDate} );
 // return res.status(200).json({ users });
};



const updateTask = async (req, res) => {

  
  const data = req.body;
  console.log(data.completed);
  if(data.completed == null){ 
    data.completed='0';
  }
  const { Op } = require("sequelize");
  console.log(data);
   
  var errores=[];
  var unError=false;
  console.log(data.name);
  if(data.name==''){
    errores.push('El título de la tarea está vacio');
    unError=true; }
    if(data.startDate==''){
      errores.push('Necesita fecha inicio');
      unError=true; }
  if(data.endDate==''){
    errores.push('Necesita fecha de fin');
    unError=true; }

  if(unError==true){
    startDate=data.startDate;
    endDate=data.endDate;
 
    return res.render('../views/modificarTasks' ,{error:errores, datos:data, startDate, endDate} );
  }   
     
      var iddUser=data.userId;
      var inserted = await model.Task.update(data, { where: { id: data.id } });
      mensajeExitoso='Tarea cargada con éxito';
      return res.redirect('/tasks/'+iddUser);
      
  
};


module.exports = {
  getTasks,
  getDetailTasks,

  addTask,
  
  deleteTask,
  updateTask,
  formTaskA,
  formTaskM,
};
