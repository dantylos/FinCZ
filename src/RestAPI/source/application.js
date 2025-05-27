require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const rateLimit = require('express-rate-limit');
const NodeCache = require('node-cache');
const path = require('path');
const mainRouter = require('./RestAPI/index.js');
const fs = require('fs');


const app = express();
const PORT = process.env.PORT || 3000;

// Set up in-memory cache (caching for 10 minutes)
const cache = new NodeCache({ stdTTL: 600 });

// Middleware for rate limiting (10 request per minute per IP for geo-check)
const geoLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 10,
    message: 'Too many requests, please try again later.',
    standardHeaders: true,
    legacyHeaders: false,
});

// Basic middleware
const githubPagesFrontendUrl = 'https://dantylos.github.io/FinanceCZ/';

const allowedOrigins = [
    'http://localhost:3000',
    githubPagesFrontendUrl
];

// Настройка CORS
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Additional function to get client IP
function getClientIP(req) {
    return req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
        req.headers['x-real-ip'] ||
        req.connection?.remoteAddress ||
        req.socket?.remoteAddress ||
        req.ip ||
        'unknown';
}

// Basic logging middleware
app.use((req, res, next) => {
    const ip = getClientIP(req);
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url} - IP: ${ip}`);
    next();
});

// VPN/Proxy detection using
async function getIpInfo(ip) {
    const cachedInfo = cache.get(ip);
    if (cachedInfo) {
        console.log(`Cache hit for IP: ${ip}`);
        return cachedInfo;
    }

    try {
        // Use ip-api for basic geolocation and VPN/proxy detection
        const response = await axios.get(`http://ip-api.com/json/${ip}?fields=status,message,country,countryCode,proxy`, {
            timeout: 5000 // 5 second timeout
        });

        const data = response.data;

        if (data.status === 'fail') {
            console.error(`IP API failed for ${ip}: ${data.message}`);
            return null;
        }

        const ipInfo = {
            country: data.country,
            countryCode: data.countryCode,
            isProxy: data.proxy || false,
            timestamp: new Date().toISOString()
        };

        // Cache the result
        cache.set(ip, ipInfo);
        console.log(`IP info cached for ${ip}:`, ipInfo);

        return ipInfo;
    } catch (error) {
        console.error(`Error checking IP ${ip}:`, error.message);
        return null;
    }
}

// Global middleware to check if the user is from Czech Republic
async function enforceGeographicRestriction(req, res, next) {
    const ip = getClientIP(req);

    // Not apply geo-restriction for infinite loading page to avoid redirect loops
    if (req.path === '/infinite-loading.html') {
        return next();
    }


    // Handle private/local IPs (localhost) - allow for development
    if (ip === 'unknown' ||
        ip.startsWith('127.') ||
        ip.startsWith('192.168.') ||
        ip.startsWith('10.') ||
        ip.startsWith('172.') ||
        ip === '::1' ||
        ip === 'localhost' ||
        ip.includes('127.0.0.1')) {
        console.log(`Local/private IP detected: ${ip}, allowing access`);
        return next();
    }

    try {
        const ipInfo = await getIpInfo(ip);

        if (!ipInfo) {
            console.log(`Could not determine location for IP: ${ip}, denying access`);
            return res.redirect('/infinite-loading.html');
        }

        // Check for VPN/Proxy
        if (ipInfo.isProxy) {
            console.log(`VPN/Proxy detected for IP: ${ip}`);
            return res.redirect('/infinite-loading.html');
        }

        // Check if from Czech Republic (country code CZ)
        if (ipInfo.countryCode !== 'CZ' && ipInfo.country !== 'Czech Republic') {
            console.log(`Non-Czech IP detected: ${ip} from ${ipInfo.country}`);
            return res.redirect('/infinite-loading.html');
        }

        console.log(`Czech IP confirmed: ${ip} from ${ipInfo.country}`);
        next(); // Proceed to the requested page
    } catch (error) {
        console.error(`Error in geo-restriction middleware for IP ${ip}:`, error);
        // In case of error, deny access for security
        return res.redirect('/infinite-loading.html');
    }
}

// Apply rate limiting
app.use(geoLimiter);

// Apply geographic restriction to ALL routes
app.use(enforceGeographicRestriction);

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Main router for API endpoints
app.use('/api', mainRouter);

// Root route for quick access check
app.get('/', (req, res) => {
    const ip = getClientIP(req);
    res.send(`
        <h1>Welcome to FinCZ - Czech Republic Only</h1>
        <p>Your IP address (${ip}) has been verified as being from Czech Republic.</p>
        <p>Access granted at: ${new Date().toLocaleString('cs-CZ')}</p>
        <hr>
        <p><a href="/api">API Endpoints</a></p>
        <p><a href="/health">Server Health</a></p>
    `);
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({
        status: 'OK',
        message: 'Server is running - Czech Republic access only',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        location_restriction: 'Czech Republic only'
    });
});

// Decoy infinite loading page HTML TODO Maybe take out into a separate file?
app.get('/infinite-loading.html', (req, res) => {
    const ip = getClientIP(req);
    const filePath = path.join(__dirname, 'infinite-loading.html');

    try {
        const loadingHtml = fs.readFileSync(filePath, 'utf8');
        console.log(`Serving infinite loading page to blocked IP: ${ip}`);
        res.send(loadingHtml);
    } catch (err) {
        console.error(`Failed to read infinite-loading.html for IP ${ip}:`, err.message);
        res.status(500).send('Error loading page');
    }
    console.log(`Serving infinite loading page to blocked IP: ${ip}`);
});

app.get('/blocked', (req, res) => {
    res.redirect('/infinite-loading.html');
});

// 404 error handler
app.use((req, res) => {
    res.status(404).json({
        error: 'Route not found',
        message: 'This resource is only accessible from Czech Republic',
        restriction: 'Czech Republic only'
    });
});

// Basic error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'Internal Server Error',
        message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong',
        restriction: 'Czech Republic only'
    });
});

// Server start
app.listen(PORT, () => {
    const HOST = process.env.HOSTNAME || 'localhost';
    console.log(`Server is running on port ${PORT}`);
    console.log(`Health check: http://${HOST}:${PORT}/health`);
    console.log(`Infinite loading page: http://${HOST}:${PORT}/infinite-loading.html`);
});

// // Server shutdown
// process.on('SIGINT', () => {
//     console.log('\n Server shutdown...');
//     cache.flushAll();
//     process.exit(0);
// });
//
// process.on('SIGTERM', () => {
//     console.log('\n Server shutdown...');
//     cache.flushAll();
//     process.exit(0);
// });

module.exports = app;