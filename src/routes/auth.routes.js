const router = require('express').Router();
const { login, register, auth, logout, registro } = require('../controller/auth.controller');



router.get('/autenticarse',auth);
router.get("/logout", logout);
router.get("/registro", registro);

router.post('/login', login);
router.post('/register', register);


module.exports = router;

//module.exports = router;
