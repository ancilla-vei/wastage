const r=require('express').Router(),c=require('../controllers/analyticsController');r.get('/public',c.publicStats);module.exports=r;
