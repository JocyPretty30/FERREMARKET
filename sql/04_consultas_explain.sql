USE ferremarket;

CREATE INDEX idx_producto_nombre
ON productos(nombre);

CREATE INDEX idx_producto_categoria
ON productos(categoria_id);

CREATE INDEX idx_variante_sku
ON variantes_producto(sku);

CREATE INDEX idx_orden_usuario
ON ordenes(usuario_id);

CREATE INDEX idx_orden_fecha
ON ordenes(fecha_orden);

CREATE INDEX idx_carrito_usuario
ON carritos(usuario_id);
USE ferremarket;

-- Productos disponibles
SELECT *
FROM vw_productos_disponibles;

-- Ventas totales
SELECT *
FROM vw_total_ventas;

-- Top productos vendidos
SELECT
    p.nombre,
    SUM(od.cantidad) AS total_vendido
FROM productos p
INNER JOIN orden_detalle od
ON p.producto_id = od.producto_id
GROUP BY p.producto_id
ORDER BY total_vendido DESC;

-- Clientes con más compras
SELECT
    u.nombre,
    COUNT(o.orden_id) AS total_compras,
    SUM(o.total) AS dinero_gastado
FROM usuarios u
INNER JOIN ordenes o
ON u.usuario_id = o.usuario_id
GROUP BY u.usuario_id
ORDER BY dinero_gastado DESC;
EXPLAIN
SELECT *
FROM productos
WHERE nombre = 'Martillo';
EXPLAIN
SELECT *
FROM ordenes
WHERE usuario_id = 2;

SELECT
    u.nombre,
    COUNT(o.orden_id) AS compras,
    SUM(o.total) AS total_gastado
FROM usuarios u
INNER JOIN ordenes o
ON u.usuario_id = o.usuario_id
GROUP BY u.usuario_id
HAVING SUM(o.total) > 100
ORDER BY total_gastado DESC;
SELECT
    p.nombre,
    SUM(od.cantidad) total_vendido,
    RANK() OVER(
        ORDER BY SUM(od.cantidad) DESC
    ) ranking
FROM productos p
INNER JOIN orden_detalle od
ON p.producto_id = od.producto_id
GROUP BY p.producto_id;