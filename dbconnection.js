const mongoose=require('mongoose');
require('dotenv').config()

const dbconnect=()=>{
        return mongoose.connect(process.env.MONGODB_URL);
}

module.exports = dbconnect;
