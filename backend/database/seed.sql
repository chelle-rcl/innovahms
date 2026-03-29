-- Superadmin Account
INSERT INTO superadmins (first_name, last_name, email, password_hash)
VALUES (
    'Collyn Joyce', 
    'Fernandez', 
    'superadmin@innova-hms.com', 
    'scrypt:32768:8:1$Es7EePJYJ5XEOrlC$7162b63a21db9582f287e26fae9e2f12b0fae245c6eda1efa8dacd626f20b042351f6c0e496bb43c15d3e3aaf86be6f44b5615c68dfd484a15528e52e045ec0b'
)
ON CONFLICT (email) DO NOTHING;

-- ============================================================
-- Innova-HMS Seed Data
-- All passwords are hashed from: "password123"
-- bcrypt hash: scrypt:32768:8:1$V9RxMarseDBXSJqr$39bafc008763a55d89afdb483b2ea381a086fd08b99da6a35f495425ec97ed04b710cf3c63514d37d781e2da97e19db10d98a731a84cffbf99dfda66a4f08764
-- ============================================================

-- TRUNCATE all tables (order matters due to foreign keys)
TRUNCATE TABLE payments, bookings, rooms, hotels, owners, customers RESTART IDENTITY CASCADE;

-- ============================================================
-- CUSTOMERS (3)
-- ============================================================
INSERT INTO customers (first_name, last_name, email, contact_number, password_hash, auth_provider) VALUES
('Maria', 'Santos',    'maria.santos@email.com',    '+639171234567', 'scrypt:32768:8:1$V9RxMarseDBXSJqr$39bafc008763a55d89afdb483b2ea381a086fd08b99da6a35f495425ec97ed04b710cf3c63514d37d781e2da97e19db10d98a731a84cffbf99dfda66a4f08764', 'local'),
('Juan',  'Dela Cruz', 'juan.delacruz@email.com',   '+639281234567', 'scrypt:32768:8:1$V9RxMarseDBXSJqr$39bafc008763a55d89afdb483b2ea381a086fd08b99da6a35f495425ec97ed04b710cf3c63514d37d781e2da97e19db10d98a731a84cffbf99dfda66a4f08764', 'local'),
('Anna',  'Reyes',     'anna.reyes@email.com',      '+639391234567', 'scrypt:32768:8:1$V9RxMarseDBXSJqr$39bafc008763a55d89afdb483b2ea381a086fd08b99da6a35f495425ec97ed04b710cf3c63514d37d781e2da97e19db10d98a731a84cffbf99dfda66a4f08764', 'local');

-- ============================================================
-- OWNERS (10)
-- ============================================================
INSERT INTO owners (first_name, last_name, email, contact_number, password_hash) VALUES
('Ricardo',   'Manalo',     'ricardo.manalo@innovahms.com',     '+639171000001', 'scrypt:32768:8:1$V9RxMarseDBXSJqr$39bafc008763a55d89afdb483b2ea381a086fd08b99da6a35f495425ec97ed04b710cf3c63514d37d781e2da97e19db10d98a731a84cffbf99dfda66a4f08764'),
('Luzviminda','Bautista',   'luzviminda.bautista@innovahms.com','+639171000002', 'scrypt:32768:8:1$V9RxMarseDBXSJqr$39bafc008763a55d89afdb483b2ea381a086fd08b99da6a35f495425ec97ed04b710cf3c63514d37d781e2da97e19db10d98a731a84cffbf99dfda66a4f08764'),
('Eduardo',   'Villanueva', 'eduardo.villanueva@innovahms.com', '+639171000003', 'scrypt:32768:8:1$V9RxMarseDBXSJqr$39bafc008763a55d89afdb483b2ea381a086fd08b99da6a35f495425ec97ed04b710cf3c63514d37d781e2da97e19db10d98a731a84cffbf99dfda66a4f08764'),
('Cynthia',   'Aquino',     'cynthia.aquino@innovahms.com',     '+639171000004', 'scrypt:32768:8:1$V9RxMarseDBXSJqr$39bafc008763a55d89afdb483b2ea381a086fd08b99da6a35f495425ec97ed04b710cf3c63514d37d781e2da97e19db10d98a731a84cffbf99dfda66a4f08764'),
('Rodrigo',   'Mercado',    'rodrigo.mercado@innovahms.com',    '+639171000005', 'scrypt:32768:8:1$V9RxMarseDBXSJqr$39bafc008763a55d89afdb483b2ea381a086fd08b99da6a35f495425ec97ed04b710cf3c63514d37d781e2da97e19db10d98a731a84cffbf99dfda66a4f08764'),
('Teresita',  'Ocampo',     'teresita.ocampo@innovahms.com',    '+639171000006', 'scrypt:32768:8:1$V9RxMarseDBXSJqr$39bafc008763a55d89afdb483b2ea381a086fd08b99da6a35f495425ec97ed04b710cf3c63514d37d781e2da97e19db10d98a731a84cffbf99dfda66a4f08764'),
('Bernardo',  'Pascual',    'bernardo.pascual@innovahms.com',   '+639171000007', 'scrypt:32768:8:1$V9RxMarseDBXSJqr$39bafc008763a55d89afdb483b2ea381a086fd08b99da6a35f495425ec97ed04b710cf3c63514d37d781e2da97e19db10d98a731a84cffbf99dfda66a4f08764'),
('Florencia', 'Navarro',    'florencia.navarro@innovahms.com',  '+639171000008', 'scrypt:32768:8:1$V9RxMarseDBXSJqr$39bafc008763a55d89afdb483b2ea381a086fd08b99da6a35f495425ec97ed04b710cf3c63514d37d781e2da97e19db10d98a731a84cffbf99dfda66a4f08764'),
('Armando',   'Soriano',    'armando.soriano@innovahms.com',    '+639171000009', 'scrypt:32768:8:1$V9RxMarseDBXSJqr$39bafc008763a55d89afdb483b2ea381a086fd08b99da6a35f495425ec97ed04b710cf3c63514d37d781e2da97e19db10d98a731a84cffbf99dfda66a4f08764'),
('Corazon',   'Ramos',      'corazon.ramos@innovahms.com',      '+639171000010', 'scrypt:32768:8:1$V9RxMarseDBXSJqr$39bafc008763a55d89afdb483b2ea381a086fd08b99da6a35f495425ec97ed04b710cf3c63514d37d781e2da97e19db10d98a731a84cffbf99dfda66a4f08764');

-- ============================================================
-- HOTELS (1 per owner, 10 total — spread across PH)
-- ============================================================
INSERT INTO hotels (owner_id, hotel_name, hotel_address) VALUES
(1,  'Pearl of the Orient Hotel',       'Roxas Boulevard, Malate, Manila, Metro Manila'),
(2,  'Sampaguita Garden Suites',        'Session Road, Baguio City, Benguet'),
(3,  'Isla Paraiso Resort & Hotel',     'Station 2, Balabag, Boracay Island, Aklan'),
(4,  'Mayon Prestige Hotel',            'Peñaranda Street, Legazpi City, Albay'),
(5,  'Palawan Sunrise Hotel',           'Rizal Avenue, Puerto Princesa City, Palawan'),
(6,  'Cebu Heritage Suites',            'Osmena Boulevard, Cebu City, Cebu'),
(7,  'Davao Pearl Garden Hotel',        'JP Laurel Avenue, Davao City, Davao del Sur'),
(8,  'Tagaytay Highlands Inn',          'Aguinaldo Highway, Tagaytay City, Cavite'),
(9,  'Vigan Colonial Mansion Hotel',    'Crisologo Street, Vigan City, Ilocos Sur'),
(10, 'Siargao Surf & Stay Hotel',       'General Luna, Siargao Island, Surigao del Norte');

-- ============================================================
-- ROOMS
-- Hotel 1 — Pearl of the Orient Hotel (5 rooms)
-- ============================================================
INSERT INTO rooms (hotel_id, room_number, room_name, room_type, description, amenities, max_adults, max_children, price_per_night, status) VALUES
(1, '101', 'Manila Bay Single',   'Single',  'Cozy single room with stunning Manila Bay view.',               ARRAY['Free Wi-Fi','Air Conditioning','Flat-screen TV','Mini Refrigerator','Room Service'], 1, 0,  2500.00, 'Available'),
(1, '102', 'Manila Bay Double',   'Double',  'Spacious double room overlooking the famous Manila sunset.',    ARRAY['Free Wi-Fi','Air Conditioning','Flat-screen TV','Mini Bar','Balcony','Room Service'], 2, 1,  4500.00, 'Available'),
(1, '201', 'Rizal Deluxe Room',   'Deluxe',  'Elegant deluxe room with city and bay panoramic views.',        ARRAY['Free Wi-Fi','Air Conditioning','Smart TV','Mini Bar','Bathtub','City View','Room Service'], 2, 2,  7500.00, 'Available'),
(1, '301', 'Roxas Boulevard Suite','Suite',  'Luxury suite featuring a separate living area and bay view.',   ARRAY['Free Wi-Fi','Air Conditioning','Smart TV','Full Bar','Jacuzzi','Living Room','Butler Service'], 3, 2, 15000.00, 'Available'),
(1, '102B','Intramuros Double',    'Double',  'Charming room with views toward historic Intramuros.',          ARRAY['Free Wi-Fi','Air Conditioning','Flat-screen TV','Mini Refrigerator','Room Service'], 2, 1,  4200.00, 'Cleaning');

-- Hotel 2 — Sampaguita Garden Suites (4 rooms)
INSERT INTO rooms (hotel_id, room_number, room_name, room_type, description, amenities, max_adults, max_children, price_per_night, status) VALUES
(2, '101', 'Pine Breeze Single',   'Single',  'Snug single room surrounded by Baguio pine trees.',             ARRAY['Free Wi-Fi','Heater','Cable TV','Hot Shower','Daily Breakfast'], 1, 0,  2200.00, 'Available'),
(2, '201', 'Burnham Double Room',  'Double',  'Comfortable double room with garden and mountain views.',        ARRAY['Free Wi-Fi','Heater','Cable TV','Hot Shower','Fireplace','Daily Breakfast'], 2, 1,  4000.00, 'Available'),
(2, '301', 'Mountain Deluxe',      'Deluxe',  'Upgraded deluxe room with premium mountain-view balcony.',      ARRAY['Free Wi-Fi','Heater','Smart TV','Hot Tub','Balcony','Mini Bar','Daily Breakfast'], 2, 2,  6500.00, 'Available'),
(2, '401', 'Mines View Suite',     'Suite',   'Spacious suite perfect for a relaxing Baguio retreat.',         ARRAY['Free Wi-Fi','Heater','Smart TV','Jacuzzi','Fireplace','Living Area','Butler Service'], 4, 2, 12000.00, 'Available');

-- Hotel 3 — Isla Paraiso Resort & Hotel (5 rooms)
INSERT INTO rooms (hotel_id, room_number, room_name, room_type, description, amenities, max_adults, max_children, price_per_night, status) VALUES
(3, 'B01', 'Beach Single Cottage',  'Single',  'Charming beachfront cottage steps from the white sand.',        ARRAY['Free Wi-Fi','Air Conditioning','Mini Refrigerator','Beach Access','Outdoor Shower'], 1, 0,  3500.00, 'Available'),
(3, 'B02', 'Garden Double Room',    'Double',  'Tropical double room with lush garden and pool access.',        ARRAY['Free Wi-Fi','Air Conditioning','Flat-screen TV','Pool Access','Mini Bar'], 2, 1,  5500.00, 'Available'),
(3, 'B03', 'Sunset Deluxe Room',    'Deluxe',  'Deluxe seaview room perfect for watching Boracay sunsets.',     ARRAY['Free Wi-Fi','Air Conditioning','Smart TV','Sea View','Balcony','Mini Bar','Room Service'], 2, 2,  8800.00, 'Available'),
(3, 'B04', 'White Beach Suite',     'Suite',   'Premium oceanfront suite with private plunge pool.',            ARRAY['Free Wi-Fi','Air Conditioning','Smart TV','Private Plunge Pool','Direct Beach Access','Butler Service'], 3, 2, 22000.00, 'Available'),
(3, 'B05', 'Lagoon Double Room',    'Double',  'Relaxing double room overlooking the resort lagoon.',           ARRAY['Free Wi-Fi','Air Conditioning','Flat-screen TV','Lagoon View','Pool Access'], 2, 0,  5200.00, 'Occupied');

-- Hotel 4 — Mayon Prestige Hotel (3 rooms)
INSERT INTO rooms (hotel_id, room_number, room_name, room_type, description, amenities, max_adults, max_children, price_per_night, status) VALUES
(4, '101', 'Mayon View Single',     'Single',  'Single room with the iconic Mayon Volcano as your backdrop.',  ARRAY['Free Wi-Fi','Air Conditioning','Cable TV','Hot Shower','Room Service'], 1, 0,  2000.00, 'Available'),
(4, '201', 'Albay Double Room',     'Double',  'Comfortable double room with Mt. Mayon views at dawn.',        ARRAY['Free Wi-Fi','Air Conditioning','Cable TV','Mini Refrigerator','Hot Shower'], 2, 1,  3800.00, 'Available'),
(4, '301', 'Volcano Deluxe Suite',  'Suite',   'Luxurious suite with a panoramic Mayon Volcano window view.',  ARRAY['Free Wi-Fi','Air Conditioning','Smart TV','Bathtub','Mini Bar','Balcony','Room Service'], 3, 2, 10000.00, 'Available');

-- Hotel 5 — Palawan Sunrise Hotel (4 rooms)
INSERT INTO rooms (hotel_id, room_number, room_name, room_type, description, amenities, max_adults, max_children, price_per_night, status) VALUES
(5, '101', 'Jungle Single Room',    'Single',  'Rustic single room surrounded by Palawan rainforest.',          ARRAY['Free Wi-Fi','Air Conditioning','Cable TV','Hot Shower'], 1, 0,  2800.00, 'Available'),
(5, '102', 'Bay View Double',       'Double',  'Double room with sweeping views of Honda Bay.',                  ARRAY['Free Wi-Fi','Air Conditioning','Flat-screen TV','Mini Bar','Sea View','Balcony'], 2, 1,  5000.00, 'Available'),
(5, '201', 'Underground Deluxe',    'Deluxe',  'Named after the famous Underground River, a serene retreat.',   ARRAY['Free Wi-Fi','Air Conditioning','Smart TV','Bathtub','Balcony','Mini Bar'], 2, 2,  7500.00, 'Available'),
(5, '301', 'Sunrise Suite',         'Suite',   'Flagship suite with horizon sea views and private terrace.',    ARRAY['Free Wi-Fi','Air Conditioning','Smart TV','Jacuzzi','Private Terrace','Butler Service'], 4, 2, 18000.00, 'Available');

-- Hotel 6 — Cebu Heritage Suites (4 rooms)
INSERT INTO rooms (hotel_id, room_number, room_name, room_type, description, amenities, max_adults, max_children, price_per_night, status) VALUES
(6, '101', 'Heritage Single',       'Single',  'Classic single room with Visayan heritage-inspired decor.',     ARRAY['Free Wi-Fi','Air Conditioning','Cable TV','Mini Refrigerator','Room Service'], 1, 0,  2400.00, 'Available'),
(6, '201', 'Mactan Double Room',    'Double',  'Double room close to Lapu-Lapu shrine and Mactan beaches.',     ARRAY['Free Wi-Fi','Air Conditioning','Flat-screen TV','Mini Bar','Hot Shower'], 2, 1,  4600.00, 'Available'),
(6, '301', 'Sinulog Deluxe',        'Deluxe',  'Festive-inspired deluxe room named after Cebu''s famous fiesta.',ARRAY['Free Wi-Fi','Air Conditioning','Smart TV','Bathtub','Mini Bar','Balcony'], 2, 2,  7200.00, 'Available'),
(6, '401', 'Cebu City Suite',       'Suite',   'Grand suite overlooking Cebu city skyline and Osmeña Peak.',    ARRAY['Free Wi-Fi','Air Conditioning','Smart TV','Jacuzzi','Living Room','Butler Service'], 4, 2, 14500.00, 'Maintenance');

-- Hotel 7 — Davao Pearl Garden Hotel (3 rooms)
INSERT INTO rooms (hotel_id, room_number, room_name, room_type, description, amenities, max_adults, max_children, price_per_night, status) VALUES
(7, '101', 'Durian Single Room',    'Single',  'Single room named after Davao''s famous fruit, fresh and bold.', ARRAY['Free Wi-Fi','Air Conditioning','Cable TV','Mini Refrigerator'], 1, 0,  2100.00, 'Available'),
(7, '201', 'Eagle Double Room',     'Double',  'Double room inspired by the Philippine Eagle, Davao''s icon.',  ARRAY['Free Wi-Fi','Air Conditioning','Flat-screen TV','Mini Bar','Room Service'], 2, 1,  4300.00, 'Available'),
(7, '301', 'Mindanao Suite',        'Suite',   'Spacious suite reflecting the rich culture of Mindanao.',       ARRAY['Free Wi-Fi','Air Conditioning','Smart TV','Bathtub','Living Room','Mini Bar','Butler Service'], 4, 2, 12500.00, 'Available');

-- Hotel 8 — Tagaytay Highlands Inn (4 rooms)
INSERT INTO rooms (hotel_id, room_number, room_name, room_type, description, amenities, max_adults, max_children, price_per_night, status) VALUES
(8, '101', 'Taal View Single',      'Single',  'Cozy single room with direct view of Taal Volcano Island.',     ARRAY['Free Wi-Fi','Heater','Cable TV','Hot Shower','Coffee Maker'], 1, 0,  3000.00, 'Available'),
(8, '201', 'Highlands Double',      'Double',  'Double room with cool mountain air and Taal Lake vistas.',      ARRAY['Free Wi-Fi','Heater','Flat-screen TV','Fireplace','Hot Shower','Balcony'], 2, 1,  5500.00, 'Available'),
(8, '301', 'Crater Deluxe Room',    'Deluxe',  'Deluxe room with an unobstructed crater lake view at sunrise.', ARRAY['Free Wi-Fi','Heater','Smart TV','Bathtub','Balcony','Mini Bar'], 2, 2,  8500.00, 'Available'),
(8, '401', 'Tagaytay Penthouse',    'Suite',   'Penthouse suite; the best Taal Lake panorama in Tagaytay.',     ARRAY['Free Wi-Fi','Heater','Smart TV','Jacuzzi','Fireplace','Terrace','Butler Service'], 4, 2, 20000.00, 'Available');

-- Hotel 9 — Vigan Colonial Mansion Hotel (2 rooms)
INSERT INTO rooms (hotel_id, room_number, room_name, room_type, description, amenities, max_adults, max_children, price_per_night, status) VALUES
(9, '101', 'Crisologo Heritage Room','Single',  'Heritage single room inside a restored Spanish colonial mansion.',ARRAY['Free Wi-Fi','Air Conditioning','Antique Furnishings','Hot Shower','Daily Breakfast'], 1, 0,  3200.00, 'Available'),
(9, '201', 'Mestizo Double Room',   'Double',  'Double room adorned with Ilocano art and cobblestone views.',   ARRAY['Free Wi-Fi','Air Conditioning','Flat-screen TV','Antique Furnishings','Hot Shower','Daily Breakfast'], 2, 1,  5800.00, 'Available');

-- Hotel 10 — Siargao Surf & Stay Hotel (5 rooms)
INSERT INTO rooms (hotel_id, room_number, room_name, room_type, description, amenities, max_adults, max_children, price_per_night, status) VALUES
(10, 'S01', 'Cloud 9 Single',        'Single',  'Surfer-style single room 5 mins walk from Cloud 9 break.',      ARRAY['Free Wi-Fi','Fan','Surfboard Storage','Outdoor Shower','Hammock'], 1, 0,  2600.00, 'Available'),
(10, 'S02', 'Lagoon Double Room',    'Double',  'Double room with views over the lush Siargao lagoon.',          ARRAY['Free Wi-Fi','Air Conditioning','Flat-screen TV','Mini Bar','Hammock'], 2, 1,  4800.00, 'Available'),
(10, 'S03', 'Island Deluxe',         'Deluxe',  'Elevated deluxe bungalow with island jungle and ocean views.',  ARRAY['Free Wi-Fi','Air Conditioning','Smart TV','Outdoor Bathtub','Mini Bar','Balcony'], 2, 2,  8000.00, 'Available'),
(10, 'S04', 'Surf King Suite',       'Suite',   'Premium suite for the avid surfer with a private ocean deck.',  ARRAY['Free Wi-Fi','Air Conditioning','Smart TV','Outdoor Shower','Private Deck','Butler Service'], 3, 2, 16000.00, 'Available'),
(10, 'S05', 'Nakupan Double',        'Double',  'Beachfront double room near the famous Naked Island day trip.',  ARRAY['Free Wi-Fi','Air Conditioning','Flat-screen TV','Beach Access','Mini Refrigerator'], 2, 0,  4500.00, 'Cleaning');

-- ============================================================
-- ROOM ID REFERENCE (insertion order = ID)
-- Hotel 1 — Pearl of the Orient Hotel
--   1: Manila Bay Single       (₱2,500/night)
--   2: Manila Bay Double       (₱4,500/night)
--   3: Rizal Deluxe Room       (₱7,500/night)
--   4: Roxas Boulevard Suite   (₱15,000/night)
--   5: Intramuros Double       (₱4,200/night)
-- Hotel 2 — Sampaguita Garden Suites
--   6: Pine Breeze Single      (₱2,200/night)
--   7: Burnham Double Room     (₱4,000/night)
--   8: Mountain Deluxe         (₱6,500/night)
--   9: Mines View Suite        (₱12,000/night)
-- Hotel 3 — Isla Paraiso Resort & Hotel
--  10: Beach Single Cottage    (₱3,500/night)
--  11: Garden Double Room      (₱5,500/night)
--  12: Sunset Deluxe Room      (₱8,800/night)
--  13: White Beach Suite       (₱22,000/night)
--  14: Lagoon Double Room      (₱5,200/night)
-- Hotel 4 — Mayon Prestige Hotel
--  15: Mayon View Single       (₱2,000/night)
--  16: Albay Double Room       (₱3,800/night)
--  17: Volcano Deluxe Suite    (₱10,000/night)
-- Hotel 5 — Palawan Sunrise Hotel
--  18: Jungle Single Room      (₱2,800/night)
--  19: Bay View Double         (₱5,000/night)
--  20: Underground Deluxe      (₱7,500/night)
--  21: Sunrise Suite           (₱18,000/night)
-- Hotel 6 — Cebu Heritage Suites
--  22: Heritage Single         (₱2,400/night)
--  23: Mactan Double Room      (₱4,600/night)
--  24: Sinulog Deluxe          (₱7,200/night)
--  25: Cebu City Suite         (₱14,500/night)
-- Hotel 7 — Davao Pearl Garden Hotel
--  26: Durian Single Room      (₱2,100/night)
--  27: Eagle Double Room       (₱4,300/night)
--  28: Mindanao Suite          (₱12,500/night)
-- Hotel 8 — Tagaytay Highlands Inn
--  29: Taal View Single        (₱3,000/night)
--  30: Highlands Double        (₱5,500/night)
--  31: Crater Deluxe Room      (₱8,500/night)
--  32: Tagaytay Penthouse      (₱20,000/night)
-- Hotel 9 — Vigan Colonial Mansion Hotel
--  33: Crisologo Heritage Room (₱3,200/night)
--  34: Mestizo Double Room     (₱5,800/night)
-- Hotel 10 — Siargao Surf & Stay Hotel
--  35: Cloud 9 Single          (₱2,600/night)
--  36: Lagoon Double Room      (₱4,800/night)
--  37: Island Deluxe           (₱8,000/night)
--  38: Surf King Suite         (₱16,000/night)
--  39: Nakupan Double          (₱4,500/night)
-- ============================================================

-- ============================================================
-- BOOKINGS
-- Customer 1 — Maria Santos   (4 bookings)
-- Customer 2 — Juan Dela Cruz (3 bookings)
-- Customer 3 — Anna Reyes     (4 bookings)
--
-- Statuses used: completed, cancelled, occupied, booked
-- total_amount = price_per_night × number of nights
-- ============================================================
INSERT INTO bookings (customer_id, room_id, check_in_date, check_out_date, total_amount, adults, children, booking_status, payment_type, created_at, updated_at) VALUES

-- Maria Santos (customer_id = 1)
-- Booking 1: Completed stay at Boracay (room 12 - Sunset Deluxe, ₱8,800 × 3 nights = ₱26,400) — paid online
(1, 12, '2025-01-10', '2025-01-13',  26400.00, 2, 1, 'completed',  'online',        '2024-12-20 09:00:00', '2025-01-13 12:00:00'),
-- Booking 2: Completed stay in Baguio (room 7 - Burnham Double, ₱4,000 × 2 nights = ₱8,000) — paid at hotel
(1,  7, '2025-03-15', '2025-03-17',   8000.00, 2, 0, 'completed',  'pay_at_hotel',  '2025-03-01 10:30:00', '2025-03-17 11:00:00'),
-- Booking 3: Cancelled booking in Palawan (room 21 - Sunrise Suite, ₱18,000 × 4 nights = ₱72,000) — online
(1, 21, '2025-06-05', '2025-06-09',  72000.00, 3, 1, 'cancelled',  'online',        '2025-05-10 14:00:00', '2025-05-18 09:00:00'),
-- Booking 4: Upcoming booked stay in Siargao (room 36 - Lagoon Double, ₱4,800 × 5 nights = ₱24,000) — online
(1, 36, '2026-04-20', '2026-04-25',  24000.00, 2, 0, 'booked',     'online',        '2026-03-15 08:00:00', '2026-03-15 08:00:00'),

-- Juan Dela Cruz (customer_id = 2)
-- Booking 5: Completed stay in Manila (room 2 - Manila Bay Double, ₱4,500 × 2 nights = ₱9,000) — paid at hotel
(2,  2, '2025-02-14', '2025-02-16',   9000.00, 2, 0, 'completed',  'pay_at_hotel',  '2025-02-10 11:00:00', '2025-02-16 10:00:00'),
-- Booking 6: Currently occupied in Tagaytay (room 31 - Crater Deluxe, ₱8,500 × 3 nights = ₱25,500) — online
(2, 31, '2026-03-28', '2026-03-31',  25500.00, 2, 1, 'occupied',   'online',        '2026-03-10 16:00:00', '2026-03-28 14:00:00'),
-- Booking 7: Upcoming booked stay in Cebu (room 23 - Mactan Double, ₱4,600 × 4 nights = ₱18,400) — pay at hotel
(2, 23, '2026-05-01', '2026-05-05',  18400.00, 2, 2, 'booked',     'pay_at_hotel',  '2026-03-20 09:30:00', '2026-03-20 09:30:00'),

-- Anna Reyes (customer_id = 3)
-- Booking 8: Completed stay in Vigan (room 34 - Mestizo Double, ₱5,800 × 2 nights = ₱11,600) — online
(3, 34, '2025-04-18', '2025-04-20',  11600.00, 2, 0, 'completed',  'online',        '2025-04-01 07:00:00', '2025-04-20 10:00:00'),
-- Booking 9: Completed stay in Davao (room 27 - Eagle Double, ₱4,300 × 3 nights = ₱12,900) — paid at hotel
(3, 27, '2025-07-22', '2025-07-25',  12900.00, 2, 1, 'completed',  'pay_at_hotel',  '2025-07-05 13:00:00', '2025-07-25 11:00:00'),
-- Booking 10: Cancelled booking in Manila Suite (room 4 - Roxas Blvd Suite, ₱15,000 × 2 nights = ₱30,000) — online
(3,  4, '2025-11-01', '2025-11-03',  30000.00, 3, 2, 'cancelled',  'online',        '2025-10-01 10:00:00', '2025-10-10 15:00:00'),
-- Booking 11: Upcoming booked stay in Albay (room 17 - Volcano Deluxe Suite, ₱10,000 × 3 nights = ₱30,000) — online
(3, 17, '2026-05-15', '2026-05-18',  30000.00, 2, 1, 'booked',     'online',        '2026-03-25 11:00:00', '2026-03-25 11:00:00');

-- ============================================================
-- PAYMENTS
-- Rules:
--   completed  → payment_status = 'paid',    paid_at is set
--   occupied   → payment_status = 'paid',    paid_at is set (paid on check-in)
--   cancelled  → payment_status = 'refunded' (online) or 'pending' (pay_at_hotel)
--   booked     → payment_status = 'pending'  (pay_at_hotel) or 'paid' (online, paid upfront)
-- ============================================================
INSERT INTO payments (booking_id, amount, payment_method, payment_status, transaction_id, paid_at) VALUES

-- Booking 1 (Maria, Boracay, completed, online) → paid
(1,  26400.00, 'GCash',        'paid',     'TXN-2025-010001', '2024-12-20 09:05:00'),
-- Booking 2 (Maria, Baguio, completed, pay_at_hotel) → paid cash at check-out
(2,   8000.00, 'Cash',         'paid',     NULL,              '2025-03-17 10:55:00'),
-- Booking 3 (Maria, Palawan, cancelled, online) → refunded
(3,  72000.00, 'GCash',        'refunded', 'TXN-2025-050003', '2025-05-10 14:10:00'),
-- Booking 4 (Maria, Siargao, booked, online) → paid upfront
(4,  24000.00, 'Credit Card',  'paid',     'TXN-2026-030004', '2026-03-15 08:05:00'),

-- Booking 5 (Juan, Manila, completed, pay_at_hotel) → paid cash
(5,   9000.00, 'Cash',         'paid',     NULL,              '2025-02-16 09:45:00'),
-- Booking 6 (Juan, Tagaytay, occupied, online) → paid upfront on booking
(6,  25500.00, 'Credit Card',  'paid',     'TXN-2026-030006', '2026-03-10 16:10:00'),
-- Booking 7 (Juan, Cebu, booked, pay_at_hotel) → pending (will pay on arrival)
(7,  18400.00, 'Cash',         'pending',  NULL,              NULL),

-- Booking 8 (Anna, Vigan, completed, online) → paid
(8,  11600.00, 'Maya',         'paid',     'TXN-2025-040008', '2025-04-01 07:08:00'),
-- Booking 9 (Anna, Davao, completed, pay_at_hotel) → paid cash
(9,  12900.00, 'Cash',         'paid',     NULL,              '2025-07-25 10:50:00'),
-- Booking 10 (Anna, Manila Suite, cancelled, online) → refunded
(10, 30000.00, 'GCash',        'refunded', 'TXN-2025-100010', '2025-10-01 10:05:00'),
-- Booking 11 (Anna, Albay, booked, online) → paid upfront
(11, 30000.00, 'Credit Card',  'paid',     'TXN-2026-030011', '2026-03-25 11:05:00');



-- ============================================================
-- Room Images Update
-- Distributes 15 available images across 39 rooms
-- Run this after seed for owners, hotels, rooms, customers, bookings, and payments
-- ============================================================

UPDATE rooms SET images = ARRAY['/static/uploads/rooms/683d76997d275fa571a04a07_pexels-pixabay-164595.jpg'] WHERE id = 1;
UPDATE rooms SET images = ARRAY['/static/uploads/rooms/room-twin-bed-2520x1400.jpg'] WHERE id = 2;
UPDATE rooms SET images = ARRAY['/static/uploads/rooms/30_02_2024_11_02_16Deluxe-Rooms1.jpg'] WHERE id = 3;
UPDATE rooms SET images = ARRAY['/static/uploads/rooms/66d8769232fd9214f8806e80_BMH_studio_executive_suite@55e.jpg'] WHERE id = 4;
UPDATE rooms SET images = ARRAY['/static/uploads/rooms/Landy_1515_King-guestroom_011-copy.jpg'] WHERE id = 5;

UPDATE rooms SET images = ARRAY['/static/uploads/rooms/Superior-Hotel-Room.png'] WHERE id = 6;
UPDATE rooms SET images = ARRAY['/static/uploads/rooms/room-twin-bed-2520x1400.jpg'] WHERE id = 7;
UPDATE rooms SET images = ARRAY['/static/uploads/rooms/Deluxe-Room-The-Samilton-scaled.jpg'] WHERE id = 8;
UPDATE rooms SET images = ARRAY['/static/uploads/rooms/Sofitel-Dubai-Wafi-Luxury-Room-Bedroom-Skyline-View-Image1_WEB.jpg'] WHERE id = 9;

UPDATE rooms SET images = ARRAY['/static/uploads/rooms/hotel room with beachfront view.jpg'] WHERE id = 10;
UPDATE rooms SET images = ARRAY['/static/uploads/rooms/683d76997d275fa571a04a07_pexels-pixabay-164595.jpg'] WHERE id = 11;
UPDATE rooms SET images = ARRAY['/static/uploads/rooms/Signature-Seaview-King-Morning-390x260.jpg'] WHERE id = 12;
UPDATE rooms SET images = ARRAY['/static/uploads/rooms/66d8769232fd9214f8806e80_BMH_studio_executive_suite@55e.jpg'] WHERE id = 13;
UPDATE rooms SET images = ARRAY['/static/uploads/rooms/expedia_group-76645-181675777-222007.jpg'] WHERE id = 14;

UPDATE rooms SET images = ARRAY['/static/uploads/rooms/image2_62.jpg'] WHERE id = 15;
UPDATE rooms SET images = ARRAY['/static/uploads/rooms/Landy_1515_King-guestroom_011-copy.jpg'] WHERE id = 16;
UPDATE rooms SET images = ARRAY['/static/uploads/rooms/30_02_2024_11_02_16Deluxe-Rooms1.jpg'] WHERE id = 17;

UPDATE rooms SET images = ARRAY['/static/uploads/rooms/2310fe48a0f0bc1f.png'] WHERE id = 18;
UPDATE rooms SET images = ARRAY['/static/uploads/rooms/hotel room with beachfront view.jpg'] WHERE id = 19;
UPDATE rooms SET images = ARRAY['/static/uploads/rooms/laxctr-deluxe-queen.jpg'] WHERE id = 20;
UPDATE rooms SET images = ARRAY['/static/uploads/rooms/Sofitel-Dubai-Wafi-Luxury-Room-Bedroom-Skyline-View-Image1_WEB.jpg'] WHERE id = 21;

UPDATE rooms SET images = ARRAY['/static/uploads/rooms/Superior-Hotel-Room.png'] WHERE id = 22;
UPDATE rooms SET images = ARRAY['/static/uploads/rooms/360_F_1726614751_5kRCR1CMGPUn2aqpdkfLtAxMuwtNjtzR.jpg'] WHERE id = 23;
UPDATE rooms SET images = ARRAY['/static/uploads/rooms/Deluxe-Room-The-Samilton-scaled.jpg'] WHERE id = 24;
UPDATE rooms SET images = ARRAY['/static/uploads/rooms/66d8769232fd9214f8806e80_BMH_studio_executive_suite@55e.jpg'] WHERE id = 25;

UPDATE rooms SET images = ARRAY['/static/uploads/rooms/image2_62.jpg'] WHERE id = 26;
UPDATE rooms SET images = ARRAY['/static/uploads/rooms/expedia_group-76645-181675777-222007.jpg'] WHERE id = 27;
UPDATE rooms SET images = ARRAY['/static/uploads/rooms/Sofitel-Dubai-Wafi-Luxury-Room-Bedroom-Skyline-View-Image1_WEB.jpg'] WHERE id = 28;

UPDATE rooms SET images = ARRAY['/static/uploads/rooms/683d76997d275fa571a04a07_pexels-pixabay-164595.jpg'] WHERE id = 29;
UPDATE rooms SET images = ARRAY['/static/uploads/rooms/room-twin-bed-2520x1400.jpg'] WHERE id = 30;
UPDATE rooms SET images = ARRAY['/static/uploads/rooms/laxctr-deluxe-queen.jpg'] WHERE id = 31;
UPDATE rooms SET images = ARRAY['/static/uploads/rooms/Landy_1515_King-guestroom_011-copy.jpg'] WHERE id = 32;

UPDATE rooms SET images = ARRAY['/static/uploads/rooms/2310fe48a0f0bc1f.png'] WHERE id = 33;
UPDATE rooms SET images = ARRAY['/static/uploads/rooms/360_F_1726614751_5kRCR1CMGPUn2aqpdkfLtAxMuwtNjtzR.jpg'] WHERE id = 34;

UPDATE rooms SET images = ARRAY['/static/uploads/rooms/hotel room with beachfront view.jpg'] WHERE id = 35;
UPDATE rooms SET images = ARRAY['/static/uploads/rooms/Signature-Seaview-King-Morning-390x260.jpg'] WHERE id = 36;
UPDATE rooms SET images = ARRAY['/static/uploads/rooms/laxctr-deluxe-queen.jpg'] WHERE id = 37;
UPDATE rooms SET images = ARRAY['/static/uploads/rooms/66d8769232fd9214f8806e80_BMH_studio_executive_suite@55e.jpg'] WHERE id = 38;
UPDATE rooms SET images = ARRAY['/static/uploads/rooms/Superior-Hotel-Room.png'] WHERE id = 39;