-- =====================================================
-- ERFURT PIZZA - SUPABASE DATABASE SCHEMA
-- =====================================================
-- This schema defines all tables needed for the pizza ordering system
-- Run this in your Supabase SQL Editor to set up the database

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- ORDERS TABLE
-- =====================================================
-- Stores all customer orders
CREATE TABLE IF NOT EXISTS orders (
    -- Primary key
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    -- Order tracking
    order_number VARCHAR(50) UNIQUE NOT NULL,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'preparing', 'ready', 'delivered', 'cancelled')),

    -- Customer information
    customer_name VARCHAR(255) NOT NULL,
    customer_email VARCHAR(255),
    customer_phone VARCHAR(50) NOT NULL,
    customer_address TEXT NOT NULL,
    customer_city VARCHAR(100),
    customer_zip VARCHAR(20),
    delivery_notes TEXT,

    -- Order details
    delivery_type VARCHAR(20) NOT NULL CHECK (delivery_type IN ('delivery', 'pickup')),
    payment_method VARCHAR(20) NOT NULL CHECK (payment_method IN ('cash', 'paypal', 'card')),
    payment_status VARCHAR(20) DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
    payment_id VARCHAR(255), -- PayPal/Stripe transaction ID

    -- Pricing
    subtotal DECIMAL(10, 2) NOT NULL,
    delivery_fee DECIMAL(10, 2) DEFAULT 0.00,
    tax DECIMAL(10, 2) DEFAULT 0.00,
    total DECIMAL(10, 2) NOT NULL,

    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    delivered_at TIMESTAMP WITH TIME ZONE,

    -- Admin notes
    admin_notes TEXT,

    -- Receipt printing
    kitchen_receipt_printed BOOLEAN DEFAULT FALSE,
    customer_receipt_printed BOOLEAN DEFAULT FALSE,

    -- Metadata
    ip_address INET,
    user_agent TEXT
);

-- Index for faster queries
CREATE INDEX idx_orders_order_number ON orders(order_number);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created_at ON orders(created_at DESC);
CREATE INDEX idx_orders_customer_email ON orders(customer_email);
CREATE INDEX idx_orders_customer_phone ON orders(customer_phone);

-- =====================================================
-- ORDER ITEMS TABLE
-- =====================================================
-- Stores individual items within each order
CREATE TABLE IF NOT EXISTS order_items (
    -- Primary key
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    -- Foreign key to orders
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,

    -- Item details
    item_name VARCHAR(255) NOT NULL,
    item_category VARCHAR(50),
    item_size VARCHAR(20),
    quantity INTEGER NOT NULL DEFAULT 1,
    unit_price DECIMAL(10, 2) NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL,

    -- Extras/toppings (stored as JSONB for flexibility)
    extras JSONB DEFAULT '[]',

    -- Special instructions
    special_instructions TEXT,

    -- Reference to menu item (if menu is in database)
    menu_item_id INTEGER,

    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for faster queries
CREATE INDEX idx_order_items_order_id ON order_items(order_id);
CREATE INDEX idx_order_items_menu_item_id ON order_items(menu_item_id);

-- =====================================================
-- MENU ITEMS TABLE (Optional - for managing menu in database)
-- =====================================================
-- Stores menu items for easier management
CREATE TABLE IF NOT EXISTS menu_items (
    -- Primary key
    id SERIAL PRIMARY KEY,

    -- Item details
    name VARCHAR(255) NOT NULL,
    category VARCHAR(50) NOT NULL CHECK (category IN ('pizza', 'pasta', 'salad', 'dessert', 'drinks')),
    description TEXT,
    image_url TEXT,

    -- Availability
    is_available BOOLEAN DEFAULT TRUE,
    is_vegetarian BOOLEAN DEFAULT FALSE,
    is_vegan BOOLEAN DEFAULT FALSE,
    is_spicy BOOLEAN DEFAULT FALSE,

    -- Badge/Special marker
    badge VARCHAR(50),

    -- Pricing (JSONB for multiple sizes)
    sizes JSONB NOT NULL DEFAULT '[]',
    -- Example: [{"size": "26cm", "price": 6.50}, {"size": "30cm", "price": 9.00}]

    -- Available extras/toppings
    available_extras JSONB DEFAULT '[]',
    -- Example: [{"name": "Extra Käse", "price": 1.50}, {"name": "Oliven", "price": 1.00}]

    -- Display order
    sort_order INTEGER DEFAULT 0,

    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for faster queries
CREATE INDEX idx_menu_items_category ON menu_items(category);
CREATE INDEX idx_menu_items_is_available ON menu_items(is_available);
CREATE INDEX idx_menu_items_sort_order ON menu_items(sort_order);

-- =====================================================
-- SETTINGS TABLE (Optional - for restaurant configuration)
-- =====================================================
-- Stores restaurant settings and configuration
CREATE TABLE IF NOT EXISTS settings (
    -- Primary key
    key VARCHAR(100) PRIMARY KEY,

    -- Setting value (JSONB for flexibility)
    value JSONB NOT NULL,

    -- Description
    description TEXT,

    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default settings
INSERT INTO settings (key, value, description) VALUES
    ('restaurant_name', '"Erfurt Pizza"', 'Restaurant name'),
    ('opening_hours', '{"monday": "11:00-22:00", "tuesday": "11:00-22:00", "wednesday": "11:00-22:00", "thursday": "11:00-22:00", "friday": "11:00-23:00", "saturday": "12:00-23:00", "sunday": "12:00-22:00"}', 'Opening hours for each day'),
    ('delivery_fee', '2.50', 'Delivery fee in EUR'),
    ('minimum_order', '10.00', 'Minimum order amount for delivery in EUR'),
    ('tax_rate', '0.19', 'Tax rate (19% in Germany)'),
    ('is_accepting_orders', 'true', 'Whether restaurant is currently accepting orders'),
    ('payment_methods', '["cash", "paypal", "card"]', 'Available payment methods'),
    ('contact_email', '"info@erfurtpizza.com"', 'Contact email'),
    ('contact_phone', '"+49 361 1234567"', 'Contact phone number'),
    ('address', '{"street": "Hauptstraße 1", "city": "Erfurt", "zip": "99084", "country": "Germany"}', 'Restaurant address')
ON CONFLICT (key) DO NOTHING;

-- =====================================================
-- ADMIN USERS TABLE (Optional - for admin authentication)
-- =====================================================
-- Stores admin users for the dashboard
-- Note: Use Supabase Auth for production, this is a simple fallback
CREATE TABLE IF NOT EXISTS admin_users (
    -- Primary key
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    -- User details
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL, -- IMPORTANT: Hash passwords with bcrypt

    -- Permissions
    role VARCHAR(20) DEFAULT 'admin' CHECK (role IN ('admin', 'kitchen', 'delivery')),
    is_active BOOLEAN DEFAULT TRUE,

    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_login TIMESTAMP WITH TIME ZONE
);

-- Index for faster queries
CREATE INDEX idx_admin_users_username ON admin_users(username);
CREATE INDEX idx_admin_users_email ON admin_users(email);

-- =====================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================
-- Enable RLS on all tables for security
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can insert orders (for customer orders)
CREATE POLICY "Anyone can create orders"
    ON orders FOR INSERT
    WITH CHECK (true);

-- Policy: Anyone can read their own order by order_number (for order tracking)
CREATE POLICY "Anyone can view orders by order_number"
    ON orders FOR SELECT
    USING (true);

-- Policy: Authenticated users can update orders (for admin dashboard)
CREATE POLICY "Authenticated users can update orders"
    ON orders FOR UPDATE
    USING (auth.role() = 'authenticated');

-- Policy: Anyone can insert order items (when creating orders)
CREATE POLICY "Anyone can create order items"
    ON order_items FOR INSERT
    WITH CHECK (true);

-- Policy: Anyone can read order items
CREATE POLICY "Anyone can view order items"
    ON order_items FOR SELECT
    USING (true);

-- Policy: Anyone can read menu items
CREATE POLICY "Anyone can view menu items"
    ON menu_items FOR SELECT
    USING (is_available = true);

-- Policy: Authenticated users can manage menu items
CREATE POLICY "Authenticated users can manage menu items"
    ON menu_items FOR ALL
    USING (auth.role() = 'authenticated');

-- Policy: Anyone can read settings
CREATE POLICY "Anyone can view settings"
    ON settings FOR SELECT
    USING (true);

-- Policy: Authenticated users can update settings
CREATE POLICY "Authenticated users can update settings"
    ON settings FOR UPDATE
    USING (auth.role() = 'authenticated');

-- Policy: Only authenticated users can read admin users
CREATE POLICY "Authenticated users can view admin users"
    ON admin_users FOR SELECT
    USING (auth.role() = 'authenticated');

-- =====================================================
-- FUNCTIONS AND TRIGGERS
-- =====================================================

-- Function: Update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger: Update updated_at on orders
CREATE TRIGGER update_orders_updated_at
    BEFORE UPDATE ON orders
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Trigger: Update updated_at on menu_items
CREATE TRIGGER update_menu_items_updated_at
    BEFORE UPDATE ON menu_items
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Trigger: Update updated_at on settings
CREATE TRIGGER update_settings_updated_at
    BEFORE UPDATE ON settings
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- VIEWS FOR COMMON QUERIES
-- =====================================================

-- View: Orders with items (for easier querying)
CREATE OR REPLACE VIEW orders_with_items AS
SELECT
    o.*,
    json_agg(
        json_build_object(
            'id', oi.id,
            'item_name', oi.item_name,
            'item_category', oi.item_category,
            'item_size', oi.item_size,
            'quantity', oi.quantity,
            'unit_price', oi.unit_price,
            'total_price', oi.total_price,
            'extras', oi.extras,
            'special_instructions', oi.special_instructions
        ) ORDER BY oi.created_at
    ) AS items
FROM orders o
LEFT JOIN order_items oi ON o.id = oi.order_id
GROUP BY o.id;

-- View: Today's orders (for admin dashboard)
CREATE OR REPLACE VIEW todays_orders AS
SELECT *
FROM orders
WHERE DATE(created_at) = CURRENT_DATE
ORDER BY created_at DESC;

-- View: Order statistics (for admin dashboard)
CREATE OR REPLACE VIEW order_statistics AS
SELECT
    DATE(created_at) AS order_date,
    COUNT(*) AS total_orders,
    SUM(total) AS total_revenue,
    AVG(total) AS average_order_value,
    COUNT(CASE WHEN payment_status = 'paid' THEN 1 END) AS paid_orders,
    COUNT(CASE WHEN status = 'delivered' THEN 1 END) AS delivered_orders
FROM orders
GROUP BY DATE(created_at)
ORDER BY order_date DESC;

-- =====================================================
-- SAMPLE DATA (Optional - for testing)
-- =====================================================

-- You can uncomment and run this to add sample data for testing
/*
-- Sample order
INSERT INTO orders (
    order_number, customer_name, customer_email, customer_phone,
    customer_address, customer_city, customer_zip,
    delivery_type, payment_method, payment_status,
    subtotal, delivery_fee, total
) VALUES (
    'EP' || TO_CHAR(NOW(), 'YYYYMMDD') || '001',
    'Max Mustermann',
    'max@example.com',
    '+49 361 1234567',
    'Musterstraße 1',
    'Erfurt',
    '99084',
    'delivery',
    'cash',
    'pending',
    25.50,
    2.50,
    28.00
) RETURNING id;

-- Note: Replace {order_id} with the UUID returned from above
INSERT INTO order_items (
    order_id, item_name, item_category, item_size,
    quantity, unit_price, total_price, extras
) VALUES (
    '{order_id}',
    'Pizza Margherita',
    'pizza',
    '30cm',
    2,
    9.00,
    18.00,
    '[]'
),
(
    '{order_id}',
    'Pizza Salami',
    'pizza',
    '26cm',
    1,
    7.50,
    7.50,
    '[{"name": "Extra Käse", "price": 1.50}]'
);
*/

-- =====================================================
-- COMPLETION MESSAGE
-- =====================================================
-- Schema created successfully!
-- Next steps:
-- 1. Copy your Supabase project URL and API keys
-- 2. Set up environment variables in Netlify
-- 3. Create Netlify Functions to interact with this database
-- 4. Update frontend to use the new API
