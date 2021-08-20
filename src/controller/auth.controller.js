const model = require('../database/models/index');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');




//3 Getters para registrarse y autenticarse y desautenticarse
function autenticado(req){
  return req.cookies["x-access-token"]!=''; 
}


const auth= async(req,res)=>{
 if(autenticado(req)){ res.redirect("/");}
 errores=[];
 data=[];
  return res.render('../views/auth',{error:errores, datos:data});
}


const registro= async(req,res)=>{
  if(autenticado(req)){ res.redirect("/");}
  errores=[];
  data=[];
   return res.render('../views/registrarme',{error:errores, datos:data});
 }



const logout= async(req,res)=>{
  
  res.cookie('x-access-token',''); 
   return res.redirect("/");
 }





 //LOS POST DE LOGIN Y REGISTER
const login = async (req, res) => {
  
  if (!req.body.username || !req.body.password) {
    return res.status(401).send({ message: 'Datos incompletos' });
  }
  const username = req.body.username;
  const password = req.body.password;

  await model.User.findOne({
    where: { username: username },
  }).then((user) => {
    if (!user) {
      return res.status(401).send({ message: 'Datos incorrectos' });
    }
    const passwordIsValid = bcrypt.compareSync(password, user.password);

    if (!passwordIsValid) {
      return res.status(401).send({ message: 'Datos incorrectos' });
    }
    const token = jwt.sign({ id: user.id }, 'mySecretKey', {
      expiresIn: 86000,
    });
    console.log(user.id);
    res.cookie('x-access-token',token); 
    res.cookie('miId',user.id);
    //res.setHeader('x-access-token',  token); 
    res.redirect('/users');
    /*
    return res.status(200).send({
      id: user.id,
      username: user.username,
      token: token,
    });  */
  });
};



const register = async (req, res) => {
  const { username, password, email, firstName, lastName } = req.body;
  console.log(username, password, email, firstName, lastName);

  if (!username || !password) {
    return res.status(401).send({ message: 'Datos incompletos' });
  }
  const checkExist = await model.User.count({ where: { username: username } });
  if (checkExist > 0) {
    return res.status(401).send({ message: 'Username ya existe' });
  }
  const hashedPassword = bcrypt.hashSync(password, 8);

  const inserted = await model.User.create({
    username,
    password: hashedPassword,
    email,
    firstName,
    lastName,
  });
  const token = jwt.sign({ id: inserted.id }, 'mySecretKey', {
    expiresIn: 86000,
  });

  res.cookie('x-access-token',token); 
  res.cookie("miId",inserted.id);
  res.redirect('/users');

  return res.status(201).json({ token: token });
};

module.exports = { login, register, auth, logout, registro };
