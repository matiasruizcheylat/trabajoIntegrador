const express = require('express');
var cors = require('cors');
const routerConfig = require('./routes/index.routes');
require('dotenv').config();
var layout = require('express-layout');



var cookieParser = require('cookie-parser')



const PORT = process.env.PORT || 3000;

var methodOverride = require('method-override');
var methodOverride2 = require('method-override');
const hbs=require('express-handlebars');
const appa=express();

const configApi = (app) => {

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  app.set('view engine', 'ejs');
  
  app.set('views', './src/views');
  app.use(methodOverride('_methodT'));
  app.use(methodOverride2('_method'));

  app.use(cookieParser());

  return;
};

const configRouter = (app) => {
  app.use('/', routerConfig.rutas());
};

const configHeaders = (app) => {
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Allow', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
  });
};

const init = () => {
  const app = express();
  configApi(app);
  configRouter(app);
  configHeaders(app);
  app.listen(PORT);
  console.log('Su aplicacion se esta ejecutando en el puerto: ' + PORT);
};

init();
