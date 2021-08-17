const express = require('express');
var cors = require('cors');
const routerConfig = require('./routes/index.routes');
require('dotenv').config();
var layout = require('express-layout');

const PORT = process.env.PORT || 3000;

var methodOverride = require('method-override');

const hbs=require('express-handlebars');
const appa=express();

const configApi = (app) => {

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  app.set('view engine', 'ejs');
  
  app.set('views', './src/views');
 
  app.use(methodOverride('_method'));
  app.use(methodOverride('_methodD'));
  
  //app.engine('html', cons.swig);
 // app.set('views', path.join(__dirname, './src/views'));
 // app.set('view engine', 'html');
   
 //  app.set('views', './src/views');
 //  app.set('view engine', 'ejs');
   

  return;
};

const configRouter = (app) => {
  app.use('/api/v1/', routerConfig.loggedInRoutes());
  app.use('/', routerConfig.authroutes());

//  app.get('/', (req, res) => res.render('../views/hola'));

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
