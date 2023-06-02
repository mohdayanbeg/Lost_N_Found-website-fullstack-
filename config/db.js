const mongoose = require('mongoose');
const colors= require('colors');
const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log(`connected to Mongodb Database ${mongoose.connection.host}`.bgMagenta.white);
    } catch(error) {
        console.log(`MONGO Connection Error ${error}`.bgRed.white);
    }
};

module.exports= connectDB;