// Netlify Function: Admin Login with JWT Authentication
const { getCorsHeaders, handleOptions } = require('./utils/cors');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

exports.handler = async (event, context) => {
    // Handle CORS preflight
    if (event.httpMethod === 'OPTIONS') {
        return handleOptions(event);
    }

    // Only allow POST requests
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            headers: getCorsHeaders(event.headers.origin),
            body: JSON.stringify({ success: false, error: 'Method not allowed' })
        };
    }

    try {
        // Parse request body
        const { password } = JSON.parse(event.body || '{}');

        if (!password) {
            return {
                statusCode: 400,
                headers: getCorsHeaders(event.headers.origin),
                body: JSON.stringify({
                    success: false,
                    error: 'Password is required'
                })
            };
        }

        // Get admin password hash from environment variable
        const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH;
        const JWT_SECRET = process.env.JWT_SECRET;

        if (!ADMIN_PASSWORD_HASH || !JWT_SECRET) {
            console.error('Missing ADMIN_PASSWORD_HASH or JWT_SECRET environment variables');
            return {
                statusCode: 500,
                headers: getCorsHeaders(event.headers.origin),
                body: JSON.stringify({
                    success: false,
                    error: 'Server configuration error'
                })
            };
        }

        // Hash the provided password using SHA-256
        const hashedPassword = crypto
            .createHash('sha256')
            .update(password)
            .digest('hex');

        // Compare hashes
        if (hashedPassword !== ADMIN_PASSWORD_HASH) {
            // Add a small delay to prevent brute force attacks
            await new Promise(resolve => setTimeout(resolve, 1000));

            return {
                statusCode: 401,
                headers: getCorsHeaders(event.headers.origin),
                body: JSON.stringify({
                    success: false,
                    error: 'Invalid password'
                })
            };
        }

        // Generate JWT token valid for 8 hours
        const token = jwt.sign(
            {
                admin: true,
                iat: Math.floor(Date.now() / 1000)
            },
            JWT_SECRET,
            { expiresIn: '8h' }
        );

        // Return success response with token
        return {
            statusCode: 200,
            headers: getCorsHeaders(event.headers.origin),
            body: JSON.stringify({
                success: true,
                token: token,
                expiresIn: 28800 // 8 hours in seconds
            })
        };

    } catch (error) {
        console.error('Admin login error:', error);
        return {
            statusCode: 500,
            headers: getCorsHeaders(event.headers.origin),
            body: JSON.stringify({
                success: false,
                error: error.message || 'Internal server error'
            })
        };
    }
};
