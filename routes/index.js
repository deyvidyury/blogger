var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET createPost page. */
router.get('/createpost', function(req, res, next) {
  res.render('createpost', null);
});

module.exports = router;
