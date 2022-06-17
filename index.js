const express = require('express');
const colors = require('colors');
const morgan = require('morgan');
const logger = require('./config/winston');
const db = require('./db.js');
const router = require('./router.js');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000; //Configuramos puerto heroku

//CORS actions
// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//Middleware
app.use(morgan('combined', { stream: logger.stream }));
app.use(express.json());

//Rutas
app.get('/', (req, res) => {res.send('Bienvenidos a Express');});
app.use(router);

//Connecting to the database
db.then(()=>{
    //Starting server
        app.listen(PORT, ()=> console.log(`Server on port ${PORT}`.bgGreen.black));
    })
    .catch((err)=> console.log(err.message));   