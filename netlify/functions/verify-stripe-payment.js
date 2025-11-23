// Netlify Function: Verify Stripe Payment
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { getCorsHeaders, handleOptions } = require('./utils/cors');

exports.handler = async (event, context) => {
    // Handle CORS preflight
    if (event.httpMethod === 'OPTIONS') {
        return handleOptions(event);
    }

    // Only allow GET requests
    if (event.httpMethod !== 'GET') {
        return {
            statusCode: 405,
            headers: getCorsHeaders(event.headers.origin),
            body: JSON.stringify({ success: false, error: 'Method not allowed' })
        };
    }

    try {
        // Check if Stripe is configured
        if (!process.env.STRIPE_SECRET_KEY) {
            return {
                statusCode: 500,
                headers: getCorsHeaders(event.headers.origin),
                body: JSON.stringify({
                    success: false,
                    error: 'Stripe is not configured. Please set STRIPE_SECRET_KEY environment variable.'
                })
            };
        }

        // Get session ID from query parameters
        const { session_id } = event.queryStringParameters || {};

        if (!session_id) {
            return {
                statusCode: 400,
                headers: getCorsHeaders(event.headers.origin),
                body: JSON.stringify({
                    success: false,
                    error: 'Missing required parameter: session_id'
                })
            };
        }

        // Retrieve session from Stripe
        const session = await stripe.checkout.sessions.retrieve(session_id);

        // Check payment status
        if (session.payment_status === 'paid') {
            return {
                statusCode: 200,
                headers: getCorsHeaders(event.headers.origin),
                body: JSON.stringify({
                    success: true,
                    verified: true,
                    paymentId: session.payment_intent,
                    status: session.payment_status
                })
            };
        } else {
            return {
                statusCode: 200,
                headers: getCorsHeaders(event.headers.origin),
                body: JSON.stringify({
                    success: false,
                    verified: false,
                    status: session.payment_status
                })
            };
        }

    } catch (error) {
        console.error('Stripe verification error:', error);
        return {
            statusCode: 500,
            headers: getCorsHeaders(event.headers.origin),
            body: JSON.stringify({
                success: false,
                error: error.message || 'Failed to verify Stripe payment'
            })
        };
    }
};
