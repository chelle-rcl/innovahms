-- Seed default administrator account
INSERT INTO admins (name, email, password_hash)
VALUES (
    'Administrator',
    'admin@gmail.com',
    'scrypt:32768:8:1$hmxufxEbhOM5GKtU$cb63b9f712724b3302e15fda510a9b752e27d536ab544d54ae249e528d770da7d0b6db4eb2d7c96663449268e635b8098742c7917364b2f5ed042af1aed6d08d'
)
ON CONFLICT (email) DO NOTHING;
