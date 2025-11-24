// Netlify Function: Delete Order from Supabase
const { getSupabaseClient } = require('./utils/supabase');
const { getCorsHeaders, handleOptions } = require('./utils/cors');
const { requireAuth } = require('./utils/auth');

exports.handler = async (event, context) => {
    // Handle CORS preflight
    if (event.httpMethod === 'OPTIONS') {
        return handleOptions(event);
    }

    // Only allow DELETE requests
    if (event.httpMethod !== 'DELETE' && event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            headers: getCorsHeaders(event.headers.origin),
            body: JSON.stringify({ success: false, error: 'Method not allowed' })
        };
    }

    // Get CORS headers
    const corsHeaders = getCorsHeaders(event.headers.origin);

    // Require authentication
    const authError = requireAuth(event, corsHeaders);
    if (authError) {
        return authError;
    }

    try {
        // Parse request body or query params
        let orderNumber;

        if (event.httpMethod === 'DELETE') {
            // For DELETE, order number may be in query params
            orderNumber = event.queryStringParameters?.orderNumber;
        } else {
            // For POST, order number in body
            const body = JSON.parse(event.body || '{}');
            orderNumber = body.orderNumber;
        }

        // Validate required fields
        if (!orderNumber) {
            return {
                statusCode: 400,
                headers: corsHeaders,
                body: JSON.stringify({
                    success: false,
                    error: 'Missing required field: orderNumber'
                })
            };
        }

        // Initialize Supabase client
        const supabase = getSupabaseClient();

        // Delete order (this will cascade delete order_items due to foreign key)
        const { error } = await supabase
            .from('orders')
            .delete()
            .eq('order_number', orderNumber);

        if (error) {
            console.error('Delete order error:', error);
            return {
                statusCode: 500,
                headers: corsHeaders,
                body: JSON.stringify({
                    success: false,
                    error: 'Failed to delete order: ' + error.message
                })
            };
        }

        // Return success response
        return {
            statusCode: 200,
            headers: corsHeaders,
            body: JSON.stringify({
                success: true,
                message: 'Order deleted successfully'
            })
        };

    } catch (error) {
        console.error('Delete order error:', error);
        return {
            statusCode: 500,
            headers: corsHeaders,
            body: JSON.stringify({
                success: false,
                error: error.message || 'Internal server error'
            })
        };
    }
};
