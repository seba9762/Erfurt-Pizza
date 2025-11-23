// Netlify Function: Save Order to Supabase
const { getSupabaseClient } = require('./utils/supabase');
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
        // Parse request body
        const { orderData, paymentId, paymentMethod } = JSON.parse(event.body);

        // Validate required fields
        if (!orderData || !orderData.name || !orderData.phone || !orderData.address) {
            return {
                statusCode: 400,
                headers: getCorsHeaders(event.headers.origin),
                body: JSON.stringify({
                    success: false,
                    error: 'Missing required fields: name, phone, address'
                })
            };
        }

        // Initialize Supabase client
        const supabase = getSupabaseClient();

        // Generate unique order number
        const timestamp = Date.now();
        const randomStr = Math.random().toString(36).substring(2, 9).toUpperCase();
        const orderNumber = `EP${timestamp}${randomStr}`;

        // Parse total amount
        const totalAmount = parseFloat(orderData.total.toString().replace(/[^0-9.,]/g, '').replace(',', '.'));
        const deliveryFee = orderData.deliveryType === 'delivery' ? 2.50 : 0.00;
        const subtotal = totalAmount - deliveryFee;

        // Insert order into database
        const { data: order, error: orderError } = await supabase
            .from('orders')
            .insert([
                {
                    order_number: orderNumber,
                    status: 'pending',
                    customer_name: orderData.name,
                    customer_email: orderData.email || null,
                    customer_phone: orderData.phone,
                    customer_address: orderData.address,
                    customer_city: orderData.city || null,
                    customer_zip: orderData.zip || null,
                    delivery_notes: orderData.notes || null,
                    delivery_type: orderData.deliveryType || 'delivery',
                    payment_method: paymentMethod || orderData.paymentMethod || 'cash',
                    payment_status: paymentMethod === 'cash' ? 'pending' : 'paid',
                    payment_id: paymentId || null,
                    subtotal: subtotal,
                    delivery_fee: deliveryFee,
                    tax: 0.00, // Tax included in prices in Germany
                    total: totalAmount,
                    ip_address: event.headers['x-forwarded-for'] || event.headers['client-ip'] || null,
                    user_agent: event.headers['user-agent'] || null
                }
            ])
            .select()
            .single();

        if (orderError) {
            console.error('Order insert error:', orderError);
            return {
                statusCode: 500,
                headers: getCorsHeaders(event.headers.origin),
                body: JSON.stringify({
                    success: false,
                    error: 'Failed to save order: ' + orderError.message
                })
            };
        }

        // Insert order items
        const orderItems = orderData.cart.map(item => ({
            order_id: order.id,
            item_name: item.name,
            item_category: item.category || null,
            item_size: item.size || null,
            quantity: item.quantity || 1,
            unit_price: item.price,
            total_price: (item.price + (item.extras?.reduce((sum, extra) => sum + extra.price, 0) || 0)) * (item.quantity || 1),
            extras: item.extras || [],
            special_instructions: item.notes || null
        }));

        const { error: itemsError } = await supabase
            .from('order_items')
            .insert(orderItems);

        if (itemsError) {
            console.error('Order items insert error:', itemsError);
            // Don't fail the request if items fail, order is already saved
            console.warn('Order saved but items failed to insert');
        }

        // Return success response
        return {
            statusCode: 200,
            headers: getCorsHeaders(event.headers.origin),
            body: JSON.stringify({
                success: true,
                orderId: orderNumber,
                orderUuid: order.id
            })
        };

    } catch (error) {
        console.error('Save order error:', error);
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
