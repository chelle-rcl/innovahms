-- Innova-HMS Table Schema
-- Ensure you are connected to 'innovahmsdb' before running!

-- 1. Customers Table
CREATE TABLE IF NOT EXISTS customers (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    contact_number VARCHAR(20) NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE customers ALTER COLUMN password_hash DROP NOT NULL;
ALTER TABLE customers ALTER COLUMN contact_number DROP NOT NULL;
ALTER TABLE customers ADD COLUMN auth_provider VARCHAR(20) DEFAULT 'local';

-- 2. Owners Table 
CREATE TABLE IF NOT EXISTS owners (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    contact_number VARCHAR(20) NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Hotels Table linked to the Owner
CREATE TABLE IF NOT EXISTS hotels (
    id SERIAL PRIMARY KEY,
    owner_id INTEGER REFERENCES owners(id) ON DELETE CASCADE,
    hotel_name VARCHAR(150) NOT NULL,
    hotel_address TEXT NOT NULL, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Rooms Table
CREATE TABLE IF NOT EXISTS rooms (
    id SERIAL PRIMARY KEY,
    hotel_id INTEGER REFERENCES hotels(id) ON DELETE CASCADE,
    room_number VARCHAR(20) NOT NULL,
    room_name VARCHAR(100), 
    room_type VARCHAR(50) CHECK (room_type IN ('Single', 'Double', 'Suite', 'Deluxe')),
    description TEXT,
    amenities TEXT[], 
    images TEXT[],   
    max_adults INTEGER DEFAULT 2,
    max_children INTEGER DEFAULT 0,
    price_per_night DECIMAL(10, 2) NOT NULL,
    status VARCHAR(20) DEFAULT 'Available' CHECK (status IN ('Available', 'Occupied', 'Maintenance', 'Cleaning')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. Superadmin Table
CREATE TABLE IF NOT EXISTS superadmins (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);