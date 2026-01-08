INSERT INTO user_entity (name, last_name, email, password_hash, role, registration_date, phone, address)
VALUES (
           'Admin',
           'Principal',
           'admin@test.com',
           '$2a$12$.pPERWaouFqxxJNvn96JZ.s81maM51l8hHVt.gsGeXUTUacjJIqM.',
           'ADMIN',
           CURRENT_DATE,
           '3510000000',
           'Calle Falsa 123'
       )
ON CONFLICT (email) DO NOTHING;;

INSERT INTO user_entity (name, last_name, email, password_hash, role, registration_date, phone, address)
VALUES (
           'Demo',
           'User',
           'user@test.com',
           '$2a$12$.pPERWaouFqxxJNvn96JZ.s81maM51l8hHVt.gsGeXUTUacjJIqM.',
           'CIUDADANO',
           CURRENT_DATE,
           '3510000000',
           'Calle Falsa 123'
       )
ON CONFLICT (email) DO NOTHING;

-- CUADRILLAS (RESPONSABLES)

INSERT INTO user_entity (name, last_name, email, password_hash, role, registration_date, phone, address)
VALUES (
           'Demo',
           'Supervisor',
           'squad@test.com',
           '$2a$12$.pPERWaouFqxxJNvn96JZ.s81maM51l8hHVt.gsGeXUTUacjJIqM.',
           'CUADRILLA',
           CURRENT_DATE,
           '3511111111',
           'Base Municipal'
       )
ON CONFLICT (email) DO NOTHING;

INSERT INTO user_entity (name, last_name, email, password_hash, role, registration_date, phone, address)
VALUES (
           'Demo',
           'Supervisor',
           'squad2@test.com',
           '$2a$12$.pPERWaouFqxxJNvn96JZ.s81maM51l8hHVt.gsGeXUTUacjJIqM.',
           'CUADRILLA',
           CURRENT_DATE,
           '3512222222',
           'Base Municipal'
       )
ON CONFLICT (email) DO NOTHING;

INSERT INTO user_entity (name, last_name, email, password_hash, role, registration_date, phone, address)
VALUES (
           'Supervisor',
           'Supervisor',
           'squad3@test.com',
           '$2a$12$.pPERWaouFqxxJNvn96JZ.s81maM51l8hHVt.gsGeXUTUacjJIqM.',
           'CUADRILLA',
           CURRENT_DATE,
           '3513333333',
           'Base Municipal'
       )
ON CONFLICT (email) DO NOTHING;

