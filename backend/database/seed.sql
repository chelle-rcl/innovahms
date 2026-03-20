-- Seed Superadmin Account
INSERT INTO superadmins (first_name, last_name, email, password_hash)
VALUES (
    'Collyn Joyce', 
    'Fernandez', 
    'superadmin@innova-hms.com', 
    'scrypt:32768:8:1$Es7EePJYJ5XEOrlC$7162b63a21db9582f287e26fae9e2f12b0fae245c6eda1efa8dacd626f20b042351f6c0e496bb43c15d3e3aaf86be6f44b5615c68dfd484a15528e52e045ec0b'
)
ON CONFLICT (email) DO NOTHING;