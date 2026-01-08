-- -- ============================================
-- -- INSERTS PARA resource_entity
-- -- ============================================
--
INSERT INTO resource_entity (name, description, stock, unit, area, active)
VALUES
    ('Lámpara LED 50W', 'Repuesto para alumbrado público', 120, 'unidades', 'ALUMBRADO', true);

INSERT INTO resource_entity (name, description, stock, unit, area, active)
VALUES
    ('Cable Eléctrico 10mm', 'Bobina de cable resistente al clima', 45, 'metros', 'ALUMBRADO', true);

INSERT INTO resource_entity (name, description, stock, unit, area, active)
VALUES
    ('Pala de punta', 'Herramienta manual para trabajos generales', 30, 'unidades', 'HERRAMIENTA', true);

INSERT INTO resource_entity (name, description, stock, unit, area, active)
VALUES
    ('Hormigón en bolsa', 'Bolsa de 25kg para reparaciones', 60, 'kg', 'OBRAS', true);

INSERT INTO resource_entity (name, description, stock, unit, area, active)
VALUES
    ('Guantes de seguridad', 'Guantes resistentes para trabajos pesados', 200, 'pares', 'OTRO', true);

INSERT INTO resource_entity (name, description, stock, unit, area, active)
VALUES
    ('Contenedor de residuos 240L', 'Para recolección urbana', 15, 'unidades', 'RECOLECCION', true);

INSERT INTO resource_entity (name, description, stock, unit, area, active)
VALUES
    ('Escoba industrial', 'Para limpieza y recolección de residuos', 80, 'unidades', 'RECOLECCION', true);

-- -- ============================================
-- -- INSERTS PARA inventory_movements
-- -- ============================================

INSERT INTO inventory_movements (resource_id, type_movement, quantity, date, user_id, report_id, reason)
VALUES (1, 'ENTRADA', 50, NOW(), 1, NULL, 'Reposición de lámparas');

INSERT INTO inventory_movements (resource_id, type_movement, quantity, date, user_id, report_id, reason)
VALUES (2, 'SALIDA', 10, NOW(), 2, 5, 'Reparación de alumbrado en calle San Martín');

INSERT INTO inventory_movements (resource_id, type_movement, quantity, date, user_id, report_id, reason)
VALUES (3, 'ENTRADA', 15, NOW(), 3, NULL, 'Ingreso de nuevas herramientas');

INSERT INTO inventory_movements (resource_id, type_movement, quantity, date, user_id, report_id, reason)
VALUES (4, 'SALIDA', 12, NOW(), 4, 9, 'Reparación de vereda');

INSERT INTO inventory_movements (resource_id, type_movement, quantity, date, user_id, report_id, reason)
VALUES (5, 'ENTRADA', 80, NOW(), 1, NULL, 'Compra de elementos de seguridad');

INSERT INTO inventory_movements (resource_id, type_movement, quantity, date, user_id, report_id, reason)
VALUES (6, 'SALIDA', 3, NOW(), 2, 11, 'Entrega de contenedores a cuadrilla');

INSERT INTO inventory_movements (resource_id, type_movement, quantity, date, user_id, report_id, reason)
VALUES (7, 'SALIDA', 7, NOW(), 3, 14, 'Limpieza en eventos especiales');
