const ioRedis = require('ioredis');
const { Config } = require('../../config/redis') //redis配置
class Redis {
    constructor() {
        this.redis = new ioRedis(Config);//创建redis连接
    }
    async get(key) {
        const data = await this.redis.get(key);
        return JSON.parse(data);
    }
    async set(key, value) {
        await this.redis.set(
            key,
            JSON.stringify(value)
        );
    }
    async destroy(key) {
        return await this.redis.del(key);
    }
}

module.exports = Redis;

