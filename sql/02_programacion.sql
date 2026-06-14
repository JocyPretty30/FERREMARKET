USE ferremarket;

-- =========================================
-- TRIGGER HISTORIAL DE PRECIOS
-- =========================================

DELIMITER $$

CREATE TRIGGER trg_historial_precios
AFTER UPDATE ON productos
FOR EACH ROW
BEGIN

    IF OLD.precio <> NEW.precio THEN

        INSERT INTO historial_precios
        (
            producto_id,
            precio_anterior,
            precio_nuevo
        )
        VALUES
        (
            NEW.producto_id,
            OLD.precio,
            NEW.precio
        );

    END IF;

END$$

DELIMITER ;

-- =========================================
-- VISTA PRODUCTOS DISPONIBLES
-- =========================================

CREATE VIEW vw_productos_disponibles AS
SELECT
    producto_id,
    nombre,
    precio,
    stock,
    marca
FROM productos
WHERE activo = TRUE;

-- =========================================
-- VISTA TOTAL VENTAS
-- =========================================

CREATE VIEW vw_total_ventas AS
SELECT
    o.orden_id,
    u.nombre AS cliente,
    o.total,
    o.estado,
    o.fecha_orden
FROM ordenes o
INNER JOIN usuarios u
ON o.usuario_id = u.usuario_id;
DELIMITER $$

CREATE TRIGGER trg_control_stock
BEFORE INSERT ON orden_detalle
FOR EACH ROW
BEGIN

    DECLARE stock_actual INT;

    SELECT stock
    INTO stock_actual
    FROM productos
    WHERE producto_id = NEW.producto_id;

    IF stock_actual < NEW.cantidad THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Stock insuficiente';
    END IF;

END$$

DELIMITER ;
-- =========================================
-- PROCEDIMIENTO PROCESARPAGO
-- =========================================

DELIMITER $$

CREATE PROCEDURE ProcesarPago(
    IN p_carrito_id INT,
    IN p_metodo_pago VARCHAR(50)
)
BEGIN
    DECLARE v_usuario_id INT;
    DECLARE v_total DECIMAL(10,2);
    DECLARE v_orden_id INT;

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
    END;

    START TRANSACTION;

    SELECT usuario_id
    INTO v_usuario_id
    FROM carritos
    WHERE carrito_id = p_carrito_id
    AND estado = 'activo';

    SELECT SUM(cantidad * precio_unitario)
    INTO v_total
    FROM carrito_detalle
    WHERE carrito_id = p_carrito_id;

    INSERT INTO ordenes(usuario_id, total, estado)
    VALUES(v_usuario_id, v_total, 'pagada');

    SET v_orden_id = LAST_INSERT_ID();

    INSERT INTO orden_detalle
    (orden_id, producto_id, variante_id, cantidad, precio_unitario, subtotal)
    SELECT
        v_orden_id,
        producto_id,
        variante_id,
        cantidad,
        precio_unitario,
        cantidad * precio_unitario
    FROM carrito_detalle
    WHERE carrito_id = p_carrito_id;

    INSERT INTO pagos(orden_id, metodo_pago, monto)
    VALUES(v_orden_id, p_metodo_pago, v_total);

    INSERT INTO envios(orden_id, direccion_envio)
    SELECT v_orden_id, direccion
    FROM usuarios
    WHERE usuario_id = v_usuario_id;

    UPDATE carritos
    SET estado = 'comprado'
    WHERE carrito_id = p_carrito_id;

    DELETE FROM carrito_detalle
    WHERE carrito_id = p_carrito_id;

    COMMIT;
END$$

DELIMITER ;