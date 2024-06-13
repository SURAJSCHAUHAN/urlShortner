const express = require('express');
const app = express();
const urlRoute=require('./routes/url')
const dbconnect = require('./dbconnection.js');
const URL= require('./models/url')
const cors=require('cors');

app.use(cors());

dbconnect().then(()=>console.log("Connected to DB!")).catch((err)=>console.log(err,"Error in Connnection!"));

app.use(express.json());
app.use('/url', urlRoute);

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
    console.log(`http://localhost:3001/`);
})