const express = require('express')
//const checkAuth=require('..')
const mainControllers=require('../controllers/main.controller')


const router=express.Router()
router.get('/:userid',mainControllers.MainFetch);

module.exports = router