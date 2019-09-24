const redis = require('redis');

exports.cacheArticles = function(req, res, next) {
	// create and connect redis client to local instance.
	const client = redis.createClient(6379)
	const REDIS_KEY = 'NBC';

	// echo redis errors to the console
	client.on('error', (err) => {
		console.log("Error " + err)
	});

	// Try fetching the result from Redis first in case we have it cached
    return client.get(REDIS_KEY, (err, photos) => {
 
        // If that key exists in Redis store
        if (photos) {
 
            return res.json({ source: 'cache', data: JSON.parse(photos) })
 
        } else { // Key does not exist in Redis store
            next();
        }
    });
    // client.del('NBC')
};