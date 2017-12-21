const express = require('express');
const bodyparser = require('body-parser');

const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
    extended: true
}));

const api_v1 = require('./controlers/api');
api_v1.initilaize(app);

app.listen(3000, ()=>{
  console.log("Server is run")
});
