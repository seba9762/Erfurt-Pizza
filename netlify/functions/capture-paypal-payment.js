// Netlify Function: Capture PayPal Payment
const paypal = require('@paypal/checkout-server-sdk');
const { getCorsHeaders, handleOptions } = require('./utils/cors');

// PayPal environment setup
function getPayPalClient() {
    const clientId = process.env.PAYPAL_CLIENT_ID;
    const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
        throw new Error('Missing PayPal credentials. Please set PAYPAL_CLIENT_ID and PAYPAL_CLIENT_SECRET environment variables.');
    }

    const environment = process.env.PAYPAL_MODE === 'live'
        ? new paypal.core.LiveEnvironment(clientId, clientSecret)
        : new paypal.core.SandboxEnvironment(clientId, clientSecret);

    return new paypal.core.PayPalHttpClient(environment);
}

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
        const { orderId } = JSON.parse(event.body);

        if (!orderId) {
            return {
                statusCode: 400,
                headers: getCorsHeaders(event.headers.origin),
                body: JSON.stringify({
                    success: false,
                    error: 'Missing required field: orderId'
                })
            };
        }

        // Create capture request
        const request = new paypal.orders.OrdersCaptureRequest(orderId);
        request.requestBody({});

        // Execute capture request
        const client = getPayPalClient();
        const response = await client.execute(request);

        // Check if payment was successful
        if (response.result.status === 'COMPLETED') {
            return {
                statusCode: 200,
                headers: getCorsHeaders(event.headers.origin),
                body: JSON.stringify({
                    success: true,
                    verified: true,
                    paymentId: response.result.id,
                    status: response.result.status
                })
            };
        } else {
            return {
                statusCode: 200,
                headers: getCorsHeaders(event.headers.origin),
                body: JSON.stringify({
                    success: false,
                    verified: false,
                    status: response.result.status
                })
            };
        }

    } catch (error) {
        console.error('PayPal capture error:', error);
        return {
            statusCode: 500,
            headers: getCorsHeaders(event.headers.origin),
            body: JSON.stringify({
                success: false,
                error: error.message || 'Failed to capture PayPal payment'
            })
        };
    }
};
