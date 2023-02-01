


const express = require('express');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');
require("dotenv").config()

require('./config/store.config');
app.use(cors({credentials:true, origin:"http://localhost:3000"}), express.json(), express.urlencoded({extended:true}))

app.use(cookieParser());

require('./routes/store.routes')(app);
require('./routes/user.routes')(app);


const PORT = 8000;


app.listen(PORT , function () {
    console.log(`The server has started on Port: ${PORT}`)
})