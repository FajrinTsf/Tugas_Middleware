const express = require ('express');
const router = express.router();
const studentcontroller = require('../controllers/user_controller');

router.get('/students' , studentcontroller.getallstudents);
router.get('/students/;id', studentcontroller.getstudentbyid);

module.exports =router;