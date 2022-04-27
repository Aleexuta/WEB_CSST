const express = require('express')
//const checkAuth=require('..')
const userControllers=require('../controllers/main.controller')


const router=express.Router()
router.get('/',userControllers.MainFetch);

module.exports = router