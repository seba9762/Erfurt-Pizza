// CORS headers utility for Netlify Functions
const ALLOWED_ORIGINS = [
    'http://localhost:8080',
    'http://localhost:3000',
    'https://erfurtpizza.com',
    'https://www.erfurtpizza.com',
    process.env.URL, // Netlify deploy preview URL
    process.env.DEPLOY_PRIME_URL // Netlify production URL
].filter(Boolean);

function getCorsHeaders(origin) {
    // Check if origin is allowed
    const isAllowed = !origin || ALLOWED_ORIGINS.includes(origin) || origin.includes('netlify.app');

    return {
        'Access-Control-Allow-Origin': isAllowed ? (origin || '*') : ALLOWED_ORIGINS[0],
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Credentials': 'true'
    };
}

function handleOptions(event) {
    return {
        statusCode: 200,
        headers: getCorsHeaders(event.headers.origin),
        body: ''
    };
}

module.exports = { getCorsHeaders, handleOptions };
