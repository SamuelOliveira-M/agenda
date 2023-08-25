const express = require('express');
const router = express.Router();
const homeControllrs = require('./src/controllrs/homeControllrs')
const loginControllrs =  require('./src/controllrs/loginControllrs')


// rotas de home
router.get('/',homeControllrs.index);

// Rotas de login
router.get('/login/index',loginControllrs.loginControllrs);
router.post('/login/register',loginControllrs.register);

module.exports = router