// Authentication middleware for Netlify Functions
const jwt = require('jsonwebtoken');

/**
 * Verify JWT token from Authorization header
 * @param {Object} headers - Request headers
 * @returns {Object} - { valid: boolean, error?: string }
 */
function verifyAdminToken(headers) {
    try {
        const authHeader = headers.authorization || headers.Authorization;

        if (!authHeader) {
            return { valid: false, error: 'No authorization header provided' };
        }

        // Extract token from "Bearer <token>"
        const token = authHeader.startsWith('Bearer ')
            ? authHeader.substring(7)
            : authHeader;

        if (!token) {
            return { valid: false, error: 'No token provided' };
        }

        const JWT_SECRET = process.env.JWT_SECRET;

        if (!JWT_SECRET) {
            console.error('JWT_SECRET environment variable not set');
            return { valid: false, error: 'Server configuration error' };
        }

        // Verify token
        const decoded = jwt.verify(token, JWT_SECRET);

        // Check if token has admin claim
        if (!decoded.admin) {
            return { valid: false, error: 'Invalid token claims' };
        }

        return { valid: true, decoded };

    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return { valid: false, error: 'Token has expired' };
        } else if (error.name === 'JsonWebTokenError') {
            return { valid: false, error: 'Invalid token' };
        }

        console.error('Token verification error:', error);
        return { valid: false, error: 'Token verification failed' };
    }
}

/**
 * Middleware to require authentication
 * Returns error response if authentication fails, or null if valid
 */
function requireAuth(event, corsHeaders) {
    const authResult = verifyAdminToken(event.headers);

    if (!authResult.valid) {
        return {
            statusCode: 401,
            headers: corsHeaders,
            body: JSON.stringify({
                success: false,
                error: authResult.error || 'Unauthorized'
            })
        };
    }

    return null; // Authentication successful
}

module.exports = {
    verifyAdminToken,
    requireAuth
};
