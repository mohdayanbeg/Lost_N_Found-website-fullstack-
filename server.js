const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const colors = require('colors')
const dotenv=require('dotenv')
const connectDB = require('./config/db')


//env config
dotenv.config();

//router import
const userRoutes=require('./routes/userRoutes')
const postRoutes=require("./routes/lfRoutes")
//mongodb connection
connectDB();

//rest object
const app = express()

//middelwares
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

//routes
app.use('/api/v1/user', userRoutes); 
app.use('/api/v1/post', postRoutes);

//POrt
const PORT=process.env.PORT||8080

//listen
app.listen(8080,()=>{
    console.log(`server running on ${process.env.DEV_MODE} mode port no. ${PORT}`.bgCyan.white);
});