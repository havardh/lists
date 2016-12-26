import redis from "redis";
import {promisifyAll} from "bluebird";

promisifyAll(redis.RedisClient.prototype);

const rediskey = "lists";

export async function add(action) {
  const client = redis.createClient();
  return await client.rpushAsync([rediskey].concat(JSON.stringify(action)));
}

export async function all() {
  const client = redis.createClient();

  const actions = await client.lrangeAsync(rediskey, 0, -1);

  return actions.map(JSON.parse.bind(JSON));
}
