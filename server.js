const express = require('express');
const app = express();
const API_VERSION = 'v1';
const cors = require('cors');
const redis = require('redis');
const PORT = 3003;

/* ROUTER */
const ArticlesRouter = require('./routers/ArticlesRouter');

// create and connect redis client to local instance.
const client = redis.createClient(6379)
const REDIS_KEY = 'NBC';

// Parse incoming requests data
app.use(express.json());

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => res.send('Hello World'));
app.use('/api/'+ API_VERSION +'/articles', ArticlesRouter);
app.use('/caches', function(req, res){
    client.del('NBC');

    // echo redis errors to the console
	client.on('error', (err) => {
		console.log("Error " + err)
	});

    res.json({
        result: true
    })
});

app.listen(PORT, () => console.log('Example app listening on port ' + PORT));