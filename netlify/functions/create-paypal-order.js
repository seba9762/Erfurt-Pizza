// Netlify Function: Create PayPal Order
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
        const { orderData } = JSON.parse(event.body);

        if (!orderData || !orderData.total) {
            return {
                statusCode: 400,
                headers: getCorsHeaders(event.headers.origin),
                body: JSON.stringify({
                    success: false,
                    error: 'Missing required fields: orderData with total'
                })
            };
        }

        // Extract amount (remove € and convert to number)
        const amount = parseFloat(orderData.total.toString().replace(/[^0-9.,]/g, '').replace(',', '.'));

        // Create PayPal order request
        const request = new paypal.orders.OrdersCreateRequest();
        request.prefer('return=representation');
        request.requestBody({
            intent: 'CAPTURE',
            purchase_units: [{
                amount: {
                    currency_code: 'EUR',
                    value: amount.toFixed(2)
                },
                description: `Erfurt Pizza Bestellung - ${orderData.name || 'Kunde'}`
            }],
            application_context: {
                brand_name: 'Erfurt Pizza',
                landing_page: 'BILLING',
                user_action: 'PAY_NOW',
                return_url: `${process.env.URL || event.headers.origin}/payment-success.html`,
                cancel_url: `${process.env.URL || event.headers.origin}/payment-cancel.html`
            }
        });

        // Execute PayPal request
        const client = getPayPalClient();
        const response = await client.execute(request);

        // Find approval URL
        const approvalUrl = response.result.links.find(link => link.rel === 'approve')?.href;

        if (!approvalUrl) {
            throw new Error('PayPal approval URL not found in response');
        }

        // Return success response
        return {
            statusCode: 200,
            headers: getCorsHeaders(event.headers.origin),
            body: JSON.stringify({
                success: true,
                orderId: response.result.id,
                approvalUrl: approvalUrl
            })
        };

    } catch (error) {
        console.error('PayPal order creation error:', error);
        return {
            statusCode: 500,
            headers: getCorsHeaders(event.headers.origin),
            body: JSON.stringify({
                success: false,
                error: error.message || 'Failed to create PayPal order'
            })
        };
    }
};
