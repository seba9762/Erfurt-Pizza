// Netlify Function: Create Stripe Checkout Session
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { getCorsHeaders, handleOptions } = require('./utils/cors');

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

        // Parse request body
        const { orderData } = JSON.parse(event.body);

        if (!orderData || !orderData.cart || !orderData.total) {
            return {
                statusCode: 400,
                headers: getCorsHeaders(event.headers.origin),
                body: JSON.stringify({
                    success: false,
                    error: 'Missing required fields: orderData with cart and total'
                })
            };
        }

        // Build line items from cart
        const lineItems = orderData.cart.map(item => {
            const itemName = item.size ? `${item.name} (${item.size})` : item.name;
            const basePrice = item.price;
            const extrasPrice = (item.extras || []).reduce((sum, extra) => sum + extra.price, 0);
            const itemUnitPrice = basePrice + extrasPrice;
            const priceInCents = Math.round(itemUnitPrice * 100);

            return {
                price_data: {
                    currency: 'eur',
                    product_data: {
                        name: itemName,
                        description: item.extras && item.extras.length > 0
                            ? `Mit: ${item.extras.map(e => e.name).join(', ')}`
                            : undefined
                    },
                    unit_amount: priceInCents,
                },
                quantity: item.quantity || 1,
            };
        });

        // Add delivery fee if applicable
        if (orderData.deliveryType === 'delivery') {
            lineItems.push({
                price_data: {
                    currency: 'eur',
                    product_data: {
                        name: 'Liefergebühr',
                        description: 'Zustellung zu Ihrer Adresse'
                    },
                    unit_amount: 250, // 2.50 EUR in cents
                },
                quantity: 1,
            });
        }

        // Create Stripe checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: `${process.env.URL || event.headers.origin}/payment-success.html?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.URL || event.headers.origin}/payment-cancel.html`,
            customer_email: orderData.email || undefined,
            locale: 'de',
        });

        // Return success response
        return {
            statusCode: 200,
            headers: getCorsHeaders(event.headers.origin),
            body: JSON.stringify({
                success: true,
                sessionId: session.id,
                url: session.url
            })
        };

    } catch (error) {
        console.error('Stripe session creation error:', error);
        return {
            statusCode: 500,
            headers: getCorsHeaders(event.headers.origin),
            body: JSON.stringify({
                success: false,
                error: error.message || 'Failed to create Stripe checkout session'
            })
        };
    }
};
