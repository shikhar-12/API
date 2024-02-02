const express = require('express');
const router = express.Router();
const UC = require('../Controller/UserController');
const PC = require('../Controller/profileController');
const checkuserauth = require("../Middleware/auth");

router.get('/getalluser',checkuserauth,UC.getalluser);
router.get('/getsingleuser',checkuserauth,UC.getsingleuser);
router.post('/userinsert',UC.userinsert);
router.post('/verifylogin',UC.verifylogin);
router.get('/logout',UC.logout);

router.post('/updatepass',checkuserauth,PC.updatepass);
router.post('/updateprofile',checkuserauth,PC.updateprofile);

module.exports = router;