// Netlify Function: Update Order Status in Supabase
const { getSupabaseClient } = require('./utils/supabase');
const { getCorsHeaders, handleOptions } = require('./utils/cors');

exports.handler = async (event, context) => {
    // Handle CORS preflight
    if (event.httpMethod === 'OPTIONS') {
        return handleOptions(event);
    }

    // Only allow POST/PUT requests
    if (event.httpMethod !== 'POST' && event.httpMethod !== 'PUT') {
        return {
            statusCode: 405,
            headers: getCorsHeaders(event.headers.origin),
            body: JSON.stringify({ success: false, error: 'Method not allowed' })
        };
    }

    try {
        // Parse request body
        const { orderNumber, status, adminNotes, paymentStatus } = JSON.parse(event.body);

        // Validate required fields
        if (!orderNumber) {
            return {
                statusCode: 400,
                headers: getCorsHeaders(event.headers.origin),
                body: JSON.stringify({
                    success: false,
                    error: 'Missing required field: orderNumber'
                })
            };
        }

        // Initialize Supabase client
        const supabase = getSupabaseClient();

        // Build update object
        const updates = {};
        if (status) updates.status = status;
        if (adminNotes !== undefined) updates.admin_notes = adminNotes;
        if (paymentStatus) updates.payment_status = paymentStatus;

        // Add delivered timestamp if status is delivered
        if (status === 'delivered') {
            updates.delivered_at = new Date().toISOString();
        }

        // Update order
        const { data: order, error } = await supabase
            .from('orders')
            .update(updates)
            .eq('order_number', orderNumber)
            .select()
            .single();

        if (error) {
            console.error('Update order error:', error);
            return {
                statusCode: 500,
                headers: getCorsHeaders(event.headers.origin),
                body: JSON.stringify({
                    success: false,
                    error: 'Failed to update order: ' + error.message
                })
            };
        }

        if (!order) {
            return {
                statusCode: 404,
                headers: getCorsHeaders(event.headers.origin),
                body: JSON.stringify({
                    success: false,
                    error: 'Order not found'
                })
            };
        }

        // Return success response
        return {
            statusCode: 200,
            headers: getCorsHeaders(event.headers.origin),
            body: JSON.stringify({
                success: true,
                order: order
            })
        };

    } catch (error) {
        console.error('Update order error:', error);
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
