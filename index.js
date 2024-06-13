const express = require('express');
const app = express();
const urlRoute=require('./routes/url')
const dbconnect = require('./dbconnection.js');
const URL= require('./models/url')
const cors=require('cors');
require('dotenv').config()
const baseurl= process.env.BASE_URL;

app.use(cors());

dbconnect().then(()=>console.log("Connected to DB!")).catch((err)=>console.log(err,"Error in Connnection!"));

app.use(express.json());
app.use('/url', urlRoute);

app.get('/',(res,req)=>
    res.json({
        message:"Welcome to URL Shortner API"
    }))

app.get('/:shortId',async(req, res)=>{
    const shortId=req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId
    },{
        $push:{
                visitHistory:{
                    timeStamp:Date.now()
                }
            }
    });
    res.redirect(entry.redirectUrl);
})



app.listen(3001,()=>{
    console.log(baseurl);
})