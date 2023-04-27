
const { Router } = require('express')
const express = require('express')

const {mainView, } = require('../controllers/index')
const {imcView, } = require('../controllers/imc')
       
const router = express.Router()

router.get('/', imcView)
router.get('/imc', imcView)


module.exports = {routes: router}