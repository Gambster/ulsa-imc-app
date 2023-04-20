const express = require('express')
const path = require('path')
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require("body-parser")
const expressStatusMonitor = require('express-status-monitor');
const router = require('./routes/router')

const app = express()

app.set('view engine', 'ejs')
app.use(expressLayouts)

app.set('layout', './layouts/main.ejs')

app.use(express.static(path.join(__dirname,'/')))

// app.use(bodyParser.json({limit: '50mb'}));
// app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use(router.routes)

// var server = app.listen(3000, ()=> {
//     console.log("Server up running in http://localhost:3000")
// })
const server = app.listen(80, '0.0.0.0');