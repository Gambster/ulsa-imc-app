const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const router = require('./routes/router')
const path = require('path');

const app = express()

app.set('view engine', 'ejs')
app.use(expressLayouts)

app.set('layout', './layouts/main.ejs')

app.use(express.static(path.join(__dirname,'/')))

app.use(router.routes)

// var server = app.listen(3000, ()=> {
//     console.log("Server up running in http://localhost:3000")
// })
const server = app.listen(80, '0.0.0.0');