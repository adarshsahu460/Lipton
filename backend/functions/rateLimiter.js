import rateLimit from 'express-rate-limit';

export const rateLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 30,
    message: 'Too many requests from this IP, please try again later.'
});