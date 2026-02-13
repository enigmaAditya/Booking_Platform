-- Users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    firebase_uid VARCHAR(128) UNIQUE NOT NULL,
    email VARCHAR(255) NOT NULL,
    name VARCHAR(255),
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Services table
CREATE TABLE services (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    description TEXT,
    base_price DECIMAL(10, 2) NOT NULL,
    estimated_duration INTEGER NOT NULL,
    icon VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Bookings table
CREATE TABLE bookings (
    id SERIAL PRIMARY KEY,
    booking_id VARCHAR(50) UNIQUE NOT NULL,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    service_id INTEGER REFERENCES services(id) ON DELETE CASCADE,
    service_address TEXT NOT NULL,
    booking_date TIMESTAMP NOT NULL,
    estimated_arrival TIMESTAMP NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample services
INSERT INTO services (name, category, description, base_price, estimated_duration, icon) VALUES
('Deep Cleaning', 'Cleaning', 'Complete house deep cleaning service', 499.00, 120, '🧹'),
('Kitchen Cleaning', 'Cleaning', 'Professional kitchen cleaning', 299.00, 90, '🍳'),
('Bathroom Cleaning', 'Cleaning', 'Bathroom deep cleaning', 199.00, 60, '🚿'),
('Plumbing Repair', 'Repair', 'Professional plumbing service', 399.00, 90, '🔧'),
('Electrical Work', 'Repair', 'Licensed electrician service', 499.00, 120, '⚡'),
('AC Repair', 'Repair', 'AC repair and maintenance', 599.00, 120, '❄️'),
('Home Cooking', 'Cooking', 'Professional cooking service', 349.00, 180, '👨‍🍳'),
('Carpenter', 'Repair', 'Furniture repair', 449.00, 120, '🪚');
