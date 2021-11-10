var express = require('express');
var router = express.Router();
var getCourse = require('../models/getCourse');

/* GET home page. */
router.get('/course', function(req, res, next) {
  let {input}=req.query;
  
  let {data,err,status} = getCourse(input);
  console.log(status);
  return res.status(status).json(data);
});

module.exports = router;