const Redis = require("ioredis")
const redisUrl = process.env.REDIS_URL
const redis = redisUrl ? new Redis(redisUrl) : new Redis()

module.exports = redis