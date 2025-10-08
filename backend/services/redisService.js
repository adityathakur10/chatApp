//redis
const {createAdapter}=require("@socket.io/redis-adapter")
const {createClient}=require("redis")
const {RateLimiterRedis}=require('rate-limiter-flexible')

const getRedisUrl=()=>{
    return (
        process.env.REDIS_URL ||
            `redis://default:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST || "redis"}:${process.env.REDIS_PORT || 6379}`
    );
};
const buildRateLimiterOptions=()=>({
    points: Number(process.env.RATE_LIMIT_POINTS || 100),
    duration: Number(process.env.RATE_LIMIT_DURATION || 60),
    blockDuration: Number(process.env.RATE_LIMIT_BLOCK_SECONDS || 0),
})



const createRateLimiterMiddleware=(rateLimiter)=>{
    return async(req,res,next)=>{
        try {
            const key=`${req.ip}:${req.method}:${req.path}`;
            await rateLimiter.consume(key);
            return next();

        } catch (error) {
            const resetSeconds = Math.round(error.msBeforeNext / 1000) || 1;
            res.set("Retry-After",resetSeconds);
            
            return res.status(429).json({
                success:false,
                message:"Too many requests. Please slow down."
            })
        }
    }
}



const setupRedis=async(io,app)=>{
    const redisUrl=getRedisUrl();

    const pubClient=createClient({url:redisUrl});
    const subClient=pubClient.duplicate();
    const rateLimiterClient=pubClient.duplicate();

    pubClient.on("error", (err) => console.error("Redis pub error:", err));
    subClient.on("error", (err) => console.error("Redis sub error:", err));
    rateLimiterClient.on("error", (err) => console.error("Redis rate limiter error:", err));

    await Promise.all([pubClient.connect(),subClient.connect(),rateLimiterClient.connect()])

    io.adapter(createAdapter(pubClient,subClient));
    console.log("Socket.IO Redis adapter attached");

    const globalRateLimiter = new RateLimiterRedis({
        storeClient: rateLimiterClient,
        keyPrefix: "rl:global",
        ...buildRateLimiterOptions(),
    });

    app.use(createRateLimiterMiddleware(globalRateLimiter));
    console.log("Global rate limiter ready");
}

module.exports={setupRedis}