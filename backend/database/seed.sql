-- Superadmin Account
INSERT INTO superadmins (first_name, last_name, email, password_hash)
VALUES (
    'Collyn Joyce', 
    'Fernandez', 
    'superadmin@innova-hms.com', 
    'scrypt:32768:8:1$Es7EePJYJ5XEOrlC$7162b63a21db9582f287e26fae9e2f12b0fae245c6eda1efa8dacd626f20b042351f6c0e496bb43c15d3e3aaf86be6f44b5615c68dfd484a15528e52e045ec0b'
)
ON CONFLICT (email) DO NOTHING;

-- 10 Owners
INSERT INTO owners (first_name, last_name, email, contact_number, password_hash) VALUES
('Alexander', 'Vanguard', 'alexander@vanguard.com', '+1-555-0101', 'scrypt:32768:8:1$Ity4dZbboRJ14RM1$69256d1c01350c99d5763cbbdfabc8449df90ea30107f448bd1bf1057ab5b6dccde95219d9db4fb138ad3b740da0a572c57df007da4e8733775a2bf82c1a15f3'),
('Sophia', 'Sterling', 'sophia@sterlinghotels.com', '+1-555-0102', 'scrypt:32768:8:1$Ity4dZbboRJ14RM1$69256d1c01350c99d5763cbbdfabc8449df90ea30107f448bd1bf1057ab5b6dccde95219d9db4fb138ad3b740da0a572c57df007da4e8733775a2bf82c1a15f3'),
('Marcus', 'Aurelius', 'marcus@palace.io', '+1-555-0103', 'scrypt:32768:8:1$Ity4dZbboRJ14RM1$69256d1c01350c99d5763cbbdfabc8449df90ea30107f448bd1bf1057ab5b6dccde95219d9db4fb138ad3b740da0a572c57df007da4e8733775a2bf82c1a15f3'),
('Isabella', 'Monaco', 'isabella@riviera.com', '+1-555-0104', 'scrypt:32768:8:1$Ity4dZbboRJ14RM1$69256d1c01350c99d5763cbbdfabc8449df90ea30107f448bd1bf1057ab5b6dccde95219d9db4fb138ad3b740da0a572c57df007da4e8733775a2bf82c1a15f3'),
('Julian', 'Blackwood', 'julian@noir.com', '+1-555-0105', 'scrypt:32768:8:1$Ity4dZbboRJ14RM1$69256d1c01350c99d5763cbbdfabc8449df90ea30107f448bd1bf1057ab5b6dccde95219d9db4fb138ad3b740da0a572c57df007da4e8733775a2bf82c1a15f3'),
('Elena', 'Rossi', 'elena@terrazza.it', '+1-555-0106', 'scrypt:32768:8:1$Ity4dZbboRJ14RM1$69256d1c01350c99d5763cbbdfabc8449df90ea30107f448bd1bf1057ab5b6dccde95219d9db4fb138ad3b740da0a572c57df007da4e8733775a2bf82c1a15f3'),
('Nathaniel', 'Drake', 'nathan@unchartedstays.com', '+1-555-0107', 'scrypt:32768:8:1$Ity4dZbboRJ14RM1$69256d1c01350c99d5763cbbdfabc8449df90ea30107f448bd1bf1057ab5b6dccde95219d9db4fb138ad3b740da0a572c57df007da4e8733775a2bf82c1a15f3'),
('Clara', 'Oswald', 'clara@timeless.uk', '+1-555-0108', 'scrypt:32768:8:1$Ity4dZbboRJ14RM1$69256d1c01350c99d5763cbbdfabc8449df90ea30107f448bd1bf1057ab5b6dccde95219d9db4fb138ad3b740da0a572c57df007da4e8733775a2bf82c1a15f3'),
('Viktor', 'Krum', 'viktor@durmstrang.bg', '+1-555-0109', 'scrypt:32768:8:1$Ity4dZbboRJ14RM1$69256d1c01350c99d5763cbbdfabc8449df90ea30107f448bd1bf1057ab5b6dccde95219d9db4fb138ad3b740da0a572c57df007da4e8733775a2bf82c1a15f3'),
('Seraphina', 'Picquery', 'sera@macusa.gov', '+1-555-0110', 'scrypt:32768:8:1$Ity4dZbboRJ14RM1$69256d1c01350c99d5763cbbdfabc8449df90ea30107f448bd1bf1057ab5b6dccde95219d9db4fb138ad3b740da0a572c57df007da4e8733775a2bf82c1a15f3');

-- 10 Hotels (Linked to Owners 1-10)
INSERT INTO hotels (owner_id, hotel_name, hotel_address) VALUES
(1, 'The Vanguard Zenith', '777 Skyline Blvd, New York, NY'),
(2, 'Sterling Silver Suites', '1200 Prestigious Ln, London, UK'),
(3, 'The Golden Palace', '1 Rome Way, Vatican City'),
(4, 'Riviera Azure Resort', '42 Promenade des Anglais, Nice, France'),
(5, 'Noir Boutique Hotel', '13 Shadow Alley, Gotham'),
(6, 'La Terrazza Rossi', '88 Amalfi Coast Rd, Positano, Italy'),
(7, 'Uncharted Sands Lodge', '505 Explorer Ridge, Cairo, Egypt'),
(8, 'Timeless Manor', '1963 Police Box Ln, Cardiff, Wales'),
(9, 'Durmstrang Citadel', 'Hidden Peak Road, Northern Mountains'),
(10, 'The Macusa Grand', 'Woolworth Building, New York, NY');

-- 1. Insert Rooms for Hotel 1 (The Vanguard Zenith)
INSERT INTO rooms (hotel_id, room_number, room_name, room_type, description, amenities, max_adults, max_children, price_per_night, status) VALUES
(1, '101', 'Zenith Standard', 'Single', 'A minimalist sanctuary for solo travelers.', ARRAY['WiFi', 'Smart TV', 'Coffee Maker'], 1, 0, 150.00, 'Available'),
(1, '202', 'Skyline Double', 'Double', 'Panoramic views of the city skyline.', ARRAY['WiFi', 'Mini Bar', 'King Bed'], 2, 1, 280.00, 'Available'),
(1, '505', 'The Vanguard Suite', 'Suite', 'Our flagship luxury experience.', ARRAY['WiFi', 'Private Balcony', 'Jacuzzi', 'Butler Service'], 2, 2, 550.00, 'Available');

-- 2. Insert Rooms for Hotel 2 (Sterling Silver Suites)
INSERT INTO rooms (hotel_id, room_number, room_name, room_type, description, amenities, max_adults, max_children, price_per_night, status) VALUES
(2, 'A1', 'Silver Deluxe', 'Deluxe', 'Refined elegance in the heart of London.', ARRAY['High-speed WiFi', 'Tea Set', 'Bathrobe'], 2, 0, 320.00, 'Available'),
(2, 'B2', 'Royal Double', 'Double', 'Classic British comfort.', ARRAY['WiFi', 'Desk', 'Safe'], 2, 2, 400.00, 'Cleaning');

-- 3. Insert Rooms for Hotel 3 (The Golden Palace)
INSERT INTO rooms (hotel_id, room_number, room_name, room_type, description, amenities, max_adults, max_children, price_per_night, status) VALUES
(3, 'PH-1', 'Imperial Suite', 'Suite', 'Live like royalty with gold-leaf accents.', ARRAY['WiFi', 'Marble Bath', 'Personal Chef'], 4, 2, 1200.00, 'Available'),
(3, '102', 'Classic Roman', 'Single', 'Traditional style meets modern tech.', ARRAY['WiFi', 'Air Conditioning'], 1, 0, 200.00, 'Maintenance');

-- 4. Insert Rooms for Hotel 4 (Riviera Azure Resort)
INSERT INTO rooms (hotel_id, room_number, room_name, room_type, description, amenities, max_adults, max_children, price_per_night, status) VALUES
(4, 'R-10', 'Azure Breeze', 'Deluxe', 'Wake up to the sound of the Mediterranean.', ARRAY['Sea View', 'Balcony', 'Nespresso'], 2, 1, 450.00, 'Available');

-- 5. Insert Rooms for Hotel 5 (Noir Boutique Hotel)
INSERT INTO rooms (hotel_id, room_number, room_name, room_type, description, amenities, max_adults, max_children, price_per_night, status) VALUES
(5, '007', 'Shadow Suite', 'Suite', 'Dusk-inspired decor for the modern nomad.', ARRAY['Soundproof', 'Smart Lighting', 'Blackout Curtains'], 2, 0, 350.00, 'Occupied');

-- 6. Insert Rooms for Hotel 6 (La Terrazza Rossi)
INSERT INTO rooms (hotel_id, room_number, room_name, room_type, description, amenities, max_adults, max_children, price_per_night, status) VALUES
(6, 'T1', 'Coastal Double', 'Double', 'Vibrant Amalfi colors and fresh air.', ARRAY['Terrace', 'Wine Fridge', 'WiFi'], 2, 1, 380.00, 'Available');

-- 7. Insert Rooms for Hotel 7 (Uncharted Sands Lodge)
INSERT INTO rooms (hotel_id, room_number, room_name, room_type, description, amenities, max_adults, max_children, price_per_night, status) VALUES
(7, 'S1', 'Explorer Den', 'Single', 'Rustic charm with all the essentials.', ARRAY['Fan', 'Guidebooks', 'WiFi'], 1, 0, 95.00, 'Available');

-- 8. Insert Rooms for Hotel 8 (Timeless Manor)
INSERT INTO rooms (hotel_id, room_number, room_name, room_type, description, amenities, max_adults, max_children, price_per_night, status) VALUES
(8, 'B-19', 'Blue Box Suite', 'Suite', 'Surprisingly spacious on the inside.', ARRAY['Clock Collection', 'WiFi', 'Library'], 2, 2, 300.00, 'Available');

-- 9. Insert Rooms for Hotel 9 (Durmstrang Citadel)
INSERT INTO rooms (hotel_id, room_number, room_name, room_type, description, amenities, max_adults, max_children, price_per_night, status) VALUES
(9, 'C-1', 'Fortress Deluxe', 'Deluxe', 'Heated floors and stone-clad walls.', ARRAY['Fireplace', 'Heated Blanket', 'WiFi'], 2, 0, 250.00, 'Available');

-- 10. Insert Rooms for Hotel 10 (The Macusa Grand)
INSERT INTO rooms (hotel_id, room_number, room_name, room_type, description, amenities, max_adults, max_children, price_per_night, status) VALUES
(10, 'G-50', 'Art Deco Double', 'Double', '1920s glamour meets 2020s convenience.', ARRAY['Gramophone', 'WiFi', 'Cocktail Bar'], 2, 1, 480.00, 'Available');