const express = require("express");
const connectDB = require("./DataBase/connect");
const routes = require('./Routes/routes')
const cors = require('cors')
require('dotenv').config();
const app = express();
const PORT = process.env.BACKEND_PORT;
app.use(cors());
app.use(express.static('./build'))
app.use(express.json());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'https://dev7468.d3qdt7nf475o6d.amplifyapp.com');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
    });
app.use('/api/v1',routes);






const start = async ()=>{
    try{
        await connectDB(process.env.MONGO_URI);
        app.listen(PORT,()=>{
            console.log(`Listening at port ${PORT}`);
        }) 
    }
    catch(err){
         console.log(err);
    }
}

start();