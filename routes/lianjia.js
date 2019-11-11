var express = require('express');
var router = express.Router();
const Spider = require('../spider/lianjia.js');

/* GET users listing. */
router.get('/', async function(req, res, next) {
  let data = await Spider.startTask()
  res.send(data)
});

module.exports = router;
