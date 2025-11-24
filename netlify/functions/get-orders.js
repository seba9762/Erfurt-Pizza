// Netlify Function: Get Orders from Supabase
const { getSupabaseClient } = require('./utils/supabase');
const { getCorsHeaders, handleOptions } = require('./utils/cors');
const { requireAuth } = require('./utils/auth');

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

    // Get CORS headers
    const corsHeaders = getCorsHeaders(event.headers.origin);

    // Require authentication
    const authError = requireAuth(event, corsHeaders);
    if (authError) {
        return authError;
    }

    try {
        // Parse query parameters
        const params = event.queryStringParameters || {};
        const orderNumber = params.order_number;
        const limit = parseInt(params.limit) || 100;
        const status = params.status;
        const date = params.date; // YYYY-MM-DD format

        // Initialize Supabase client
        const supabase = getSupabaseClient();

        let query = supabase
            .from('orders')
            .select(`
                *,
                order_items (
                    id,
                    item_name,
                    item_category,
                    item_size,
                    quantity,
                    unit_price,
                    total_price,
                    extras,
                    special_instructions
                )
            `)
            .order('created_at', { ascending: false })
            .limit(limit);

        // Filter by order number if provided
        if (orderNumber) {
            query = query.eq('order_number', orderNumber);
        }

        // Filter by status if provided
        if (status) {
            query = query.eq('status', status);
        }

        // Filter by date if provided
        if (date) {
            const startDate = new Date(date);
            startDate.setHours(0, 0, 0, 0);
            const endDate = new Date(date);
            endDate.setHours(23, 59, 59, 999);

            query = query
                .gte('created_at', startDate.toISOString())
                .lte('created_at', endDate.toISOString());
        }

        // Execute query
        const { data: orders, error } = await query;

        if (error) {
            console.error('Get orders error:', error);
            return {
                statusCode: 500,
                headers: corsHeaders,
                body: JSON.stringify({
                    success: false,
                    error: 'Failed to fetch orders: ' + error.message
                })
            };
        }

        // Return success response
        return {
            statusCode: 200,
            headers: corsHeaders,
            body: JSON.stringify({
                success: true,
                orders: orders || [],
                count: orders?.length || 0
            })
        };

    } catch (error) {
        console.error('Get orders error:', error);
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
