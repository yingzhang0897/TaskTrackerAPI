const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const swaggerUi = require('swagger-ui-express');
const mongodb = require('./db/database');
const bodyParser = require('body-parser');
const cors = require('cors');


const port = process.env.PORT || 3000;

app
    .use(bodyParser.json())
    .use('/', require('./routes/index'));


mongodb.initDb((err) => {
    if(err) {
        console.log(err);
    }
    else {
        app.listen(port,() => {console.log(`Databse is listening and Node Running on port ${port}`)});
    }
});