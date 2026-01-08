-- -- ============================================
-- -- SQUADENTITY
-- -- ============================================
INSERT INTO squad_entity (name, description, area, team_size, supervisor_user_id)
VALUES
    ('Iluminación Urbana', 'Responsables del mantenimiento del alumbrado público', 'ALUMBRADO', 6, 3),

    ('Obras Públicas', 'Cuadrilla para bacheo, veredas y mantenimiento', 'OBRAS', 8, 4),

    ('Recolección Diaria', 'Equipo encargado de recolección de residuos', 'RECOLECCION', 10, 5),

    ('Cuadrilla de Emergencias', 'Atención rápida ante incidentes prioritarios', 'OTRA', 4, 3),

    ('Arbolado Urbano', 'Poda, remoción, mantenimiento del arbolado', 'OTRA', 5, 4),

    ('Infraestructura Vial', 'Mantenimiento de calles, señalización y cartelería', 'OBRAS', 7, 4),

    ('Limpieza Especial', 'Limpieza después de eventos o acumulación puntual', 'RECOLECCION', 6, 5),

    ('Señalización Urbana', 'Mantenimiento de carteles y señalización vial', 'OBRAS', 5, 3),

    ('Espacios Verdes', 'Mantenimiento de plazas y parques', 'OTRA', 6, 5);

-- ============================================
-- REPORTS
-- ============================================

INSERT INTO reports (
    title, description, image_url, address,
    latitude, longitude, status,
    squad_id, created_at, user_id, resolved_at
) VALUES
      ('Poste caído', 'Poste con riesgo eléctrico', NULL, 'Av. Colón 120',
       -31.42, -64.18, 'RESOLVED',
       4, NOW() - INTERVAL '2 days', 2, NOW() - INTERVAL '2 days' + INTERVAL '1 hour'),

      ('Cable expuesto', 'Peligro eléctrico', NULL, 'San Juan 540',
       -31.41, -64.19, 'RESOLVED',
       4, NOW() - INTERVAL '5 days', 2, NOW() - INTERVAL '5 days' + INTERVAL '2 hours'),

      ('Lámpara rota', 'No enciende', NULL, 'Av. San Martín 450',
       -31.421, -64.187, 'RESOLVED',
       1, NOW() - INTERVAL '10 days', 2, NOW() - INTERVAL '8 days'),

      ('Farola intermitente', 'Parpadea de noche', NULL, 'Maipú 300',
       -31.418, -64.182, 'IN_PROCESS',
       1, NOW() - INTERVAL '3 days', 2, NULL),

      ('Bache profundo', 'Pozo grande', NULL, 'Belgrano 820',
       -31.43, -64.20, 'RESOLVED',
       2, NOW() - INTERVAL '15 days', 2, NOW() - INTERVAL '5 days'),

      ('Vereda rota', 'Riesgo peatones', NULL, 'Rivadavia 900',
       -31.419, -64.19, 'IN_PROCESS',
       2, NOW() - INTERVAL '7 days', 2, NULL),

      ('Basural', 'Residuos acumulados', NULL, 'Sarmiento 300',
       -31.415, -64.202, 'PENDING',
       3, NOW() - INTERVAL '1 day', 2, NULL),

      ('Contenedor roto', 'No se puede usar', NULL, 'Córdoba 230',
       -31.423, -64.215, 'RESOLVED',
       3, NOW() - INTERVAL '6 days', 2, NOW() - INTERVAL '4 days'),

      ('Residuos en plaza', 'Suciedad general', NULL, 'Plaza Central',
       -31.42, -64.21, 'PENDING',
       3, NOW() - INTERVAL '2 days', 2, NULL);


-- -- ============================================
-- -- REPORT STATUS HISTORY
-- -- ============================================

-- ============================================
-- REPORT STATUS HISTORY (CORRECTO)
-- ============================================

INSERT INTO report_status_history_entity (
    report_id,
    old_status,
    new_status,
    changed_at
) VALUES
      (1, 'PENDING', 'IN_PROCESS', NOW() - INTERVAL '2 days' + INTERVAL '30 minutes'),
      (1, 'IN_PROCESS', 'RESOLVED', NOW() - INTERVAL '2 days' + INTERVAL '1 hour'),

      (2, 'PENDING', 'IN_PROCESS', NOW() - INTERVAL '5 days'),
      (2, 'IN_PROCESS', 'RESOLVED', NOW() - INTERVAL '5 days' + INTERVAL '3 hours'),

      (3, 'PENDING', 'IN_PROCESS', NOW() - INTERVAL '9 days'),

      (5, 'PENDING', 'IN_PROCESS', NOW() - INTERVAL '14 days'),
      (5, 'IN_PROCESS', 'RESOLVED', NOW() - INTERVAL '5 days');

-- -- ============================================
-- -- NEWS (TABLA: new_entity)
-- -- ============================================
INSERT INTO new_entity (date, title, description, category)
VALUES (NOW(), 'Nueva luminaria en Barrio Centro', 'Se instalaron nuevas luminarias LED para mejorar la seguridad nocturna.', 'ALUMBRADO');

INSERT INTO new_entity (date, title, description, category)
VALUES (NOW(), 'Plan de bacheo semanal', 'La cuadrilla de Obras inicia trabajos de reparación en calles principales.', 'OBRAS');

INSERT INTO new_entity (date, title, description, category)
VALUES (NOW(), 'Operativo de limpieza', 'Se retiraron más de 2 toneladas de residuos acumulados.', 'RECOLECCION');

INSERT INTO new_entity (date, title, description, category)
VALUES (NOW(), 'Emergencia por tormenta', 'Se activó protocolo por fuertes vientos que afectaron árboles y tendido eléctrico.', 'OTRA');

INSERT INTO new_entity (date, title, description, category)
VALUES (NOW(), 'Nueva señalización vial', 'Infraestructura Vial instaló nueva cartelería en avenidas principales.', 'OBRAS');

INSERT INTO new_entity (date, title, description, category)
VALUES (NOW(), 'Mantenimiento preventivo', 'Se realizó mantenimiento en semáforos clave del centro.', 'ALUMBRADO');

INSERT INTO new_entity (date, title, description, category)
VALUES (NOW(), 'Programa de recolección diferenciada', 'Inicia prueba piloto para separación de residuos en origen.', 'RECOLECCION');
INSERT INTO new_entity (date, title, description, category) VALUES
                                                                (NOW() - INTERVAL '1 day', 'Nueva luminaria LED', 'Instalación en barrio centro', 'ALUMBRADO'),
                                                                (NOW() - INTERVAL '3 days', 'Plan de bacheo', 'Reparaciones en avenidas', 'OBRAS'),
                                                                (NOW() - INTERVAL '5 days', 'Operativo de limpieza', 'Retiro de residuos', 'RECOLECCION'),
                                                                (NOW() - INTERVAL '7 days', 'Tormenta fuerte', 'Activación de emergencias', 'OTRA');