const express = require('express');
const redis = require('redis');
const app = express();

const PORT = process.env.PORT || 5000;
const REDIS_URL = process.env.REDIS_URL || 'localhost';

const client = redis.createClient({url: REDIS_URL});
(async () => {
    await client.connect();
})();

app.post('/counter/:bookId/incr', async (req, res) => {
    const { bookId } = req.params;
    try{
        const cnt = await client.incr(bookId);
        res.statusCode = 200;
        res.json({message: 'OK', bookId});
    } catch (e) {
        res.statusCode = 500;
        res.json({ errcode: 500, errmsg: 'Redis error', ...e});
    }
});

app.get('/counter/:bookId', async (req, res) => {
    const { bookId } = req.params;
    const value = await client.get(bookId);
    res.json({bookId, count: value});
});

app.listen(PORT);