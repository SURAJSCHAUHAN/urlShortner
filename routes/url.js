const express= require('express');

const {generateShortUrl,getUrlAnalytics,getShortUrl}= require("../controllers/url")

const router= express.Router();

router.post('/',generateShortUrl);

// router.get('/analytics/:shortId',getUrlAnalytics);
router.get('/analytics',getUrlAnalytics);

router.get('/',getShortUrl);

module.exports=router;