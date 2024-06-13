const shortid=require('shortid');
const URL=require('../models/url');

const generateShortUrl= async(req,res)=>{
    const body=req.body;
    if(!body.url) return res.status(400).json({error:"url missing"})
    const shortID= shortid();
    await URL.create({
        shortId:shortID,
        redirectUrl:body.url,
        visitHistory:[]
    });

    return res.json({id:shortID,shortURL:`http://localhost:3001/${shortID}`});
}

// const getUrlAnalytics=async(req,res)=>{
//     const shortId=req.params.shortId;
//     const result=await URL.findOne({shortId});
//     return res.json({
//         totalClicks:result.visitHistory.length,
//         analytics: result.visitHistory,
//     })
// }

const getUrlAnalytics=async(req,res)=>{
    const url=req.body.url;
    const shortId=url.slice(-9);
    const result=await URL.findOne({shortId});
    return res.json({
        totalClicks:result.visitHistory.length,
        analytics: result.visitHistory,
    })
}

const getShortUrl=async(req,res)=>{
    const url = req.body.url;
    if(!url) return res.status(400).json({error:"url missing"});
    const result=await URL.findOne({redirectUrl:url});
    if(!result) return res.json({message:"NO URL FOUND. Please Create ShortURL"});
    return res.json({shortURL:`http://localhost:3001/${result.shortId}`})
}

module.exports ={generateShortUrl,getUrlAnalytics,getShortUrl};