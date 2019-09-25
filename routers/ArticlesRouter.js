const express = require('express');
const router = express.Router();
const ArticlesController = require('../controllers/ArticlesController');
const CacheArticles = require('../middleware/CacheArticles');
router.post(
	'/',
	ArticlesController.createArticle
);

router.get(
	'/',
	CacheArticles.cacheArticles,
	ArticlesController.getArticles
);

router.put(
	'/:id',
	ArticlesController.updateArticle
);

router.delete(
	'/:id',
	ArticlesController.deleteArticle
);
module.exports = router;
