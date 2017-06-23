var express = require('express');
var router = express.Router();
var PostController = require('../controllers/PostController');

router.get('/posts',function(req, res, next){
	PostController.find(req.query, function(err, results){
		if(err){
			res.json({
				confirmation: 'fail',
				message: err
			})

			return
		}

		res.json({
			confirmation: 'success',
			results: results
		})
	})
})

router.get('/post/:id', function(req, res, next){
	var id = req.params.id

	PostController.findById(id, function(err, result){
		if (err) {
			res.json({
				confirmation: 'fail',
				message: 'Not Found'
			})
			return
		}

		res.json({
			confirmation: 'success',
			result: result
		})
	})
})

router.post('/post', function(req, res, next){
	PostController.create(req.body, function(err, result){
		if(err){
			res.json({
				confirmation: 'fail',
				message: err
			})
			return
		}

		res.json({
			confirmation: 'success',
			result: result
		})

	})
})

router.put('/post/:id', function(req, res, next){
	var id = req.params.id
	PostController.update(id, req.body, function(err, result){
		if(err){
			res.json({
				confirmation: 'fail',
				message: err
			})
			return
		}

		res.json({
			confirmation: 'success',
			result: result
		})

	})
})

router.delete('/post/:id', function(req, res, next){
	var id = req.params.id
	PostController.delete(id, function(err, result){
		if(err){
			res.json({
				confirmation: 'fail',
				message: err
			})
			return
		}

		res.json({
			confirmation: 'success',
			result: result
		})

	})
})

module.exports = router;