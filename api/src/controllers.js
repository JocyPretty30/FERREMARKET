const pool = require('./database');

exports.obtenerProductos = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        p.producto_id,
        p.categoria_id,
        c.nombre AS categoria,
        p.nombre,
        p.descripcion,
        p.precio,
        p.stock,
        p.marca,
        p.activo
      FROM productos p
      INNER JOIN categorias c ON p.categoria_id = c.categoria_id
      WHERE p.activo = TRUE
    `);

    res.json(rows);
    res.json({
  mensaje: 'Compra procesada correctamente',
  orden_id: orden.orden_id,
  total: orden.total,
  metodo_pago: metodoPago || 'Tarjeta',
  envio: estadoEnvio === 'Querétaro'
    ? 'Envío local dentro de Querétaro'
    : 'Envío fuera de Querétaro'
});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.obtenerCategorias = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM categorias');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.obtenerOrdenes = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM vw_total_ventas LIMIT 20');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.obtenerResumen = async (req, res) => {
  try {
    const [[productos]] = await pool.query('SELECT COUNT(*) AS total FROM productos');
    const [[ordenes]] = await pool.query('SELECT COUNT(*) AS total FROM ordenes');
    const [[pagos]] = await pool.query('SELECT COUNT(*) AS total FROM pagos');
    const [[ventas]] = await pool.query('SELECT IFNULL(SUM(total), 0) AS total FROM ordenes');

    res.json({
      productos: productos.total,
      ordenes: ordenes.total,
      pagos: pagos.total,
      ventas: Number(ventas.total)
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.obtenerRankingProductos = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT
        p.nombre,
        SUM(od.cantidad) AS total_vendido,
        RANK() OVER(ORDER BY SUM(od.cantidad) DESC) AS ranking
      FROM productos p
      INNER JOIN orden_detalle od ON p.producto_id = od.producto_id
      GROUP BY p.producto_id, p.nombre
      ORDER BY ranking
      LIMIT 5
    `);

    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.obtenerClientesVIP = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT
        CONCAT('Cliente VIP #', ROW_NUMBER() OVER(ORDER BY SUM(o.total) DESC)) AS cliente,
        COUNT(o.orden_id) AS compras,
        SUM(o.total) AS total_gastado
      FROM usuarios u
      INNER JOIN ordenes o ON u.usuario_id = o.usuario_id
      GROUP BY u.usuario_id
      HAVING SUM(o.total) > (
        SELECT AVG(total) FROM ordenes
      )
      ORDER BY total_gastado DESC
      LIMIT 5
    `);

    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.comprar = async (req, res) => {
  const connection = await pool.getConnection();

  try {
  const { cliente, telefono, estadoEnvio, direccion, metodoPago, productos } = req.body;

    if (!cliente || !telefono || !estadoEnvio || !direccion || !productos || productos.length === 0) {
      return res.status(400).json({ error: 'Faltan datos para procesar la compra' });
    }

    await connection.beginTransaction();

    const [usuarioResult] = await connection.query(
      `INSERT INTO usuarios (rol_id, nombre, email, password_hash, telefono, direccion)
       VALUES (2, ?, ?, 'cliente_web', ?, ?)`,
      [
        cliente,
        `${Date.now()}@ferremarket.com`,
        telefono,
        `${direccion} - ${estadoEnvio}`
      ]
    );

    const usuarioId = usuarioResult.insertId;

    const [carritoResult] = await connection.query(
      `INSERT INTO carritos (usuario_id, estado)
       VALUES (?, 'activo')`,
      [usuarioId]
    );

    [carritoId, metodoPago || 'Tarjeta']

    for (const item of productos) {
      const [[productoBD]] = await connection.query(
        `SELECT precio FROM productos WHERE producto_id = ?`,
        [item.producto_id]
      );

      await connection.query(
        `INSERT INTO carrito_detalle
        (carrito_id, producto_id, cantidad, precio_unitario)
        VALUES (?, ?, ?, ?)`,
        [carritoId, item.producto_id, item.cantidad, productoBD.precio]
      );
    }

    await connection.query(
      `CALL ProcesarPago(?, ?)`,
      [carritoId, estadoEnvio === 'Querétaro' ? 'Pago local' : 'Pago foráneo']
    );

    const [[orden]] = await connection.query(
      `SELECT orden_id, total, estado 
       FROM ordenes 
       WHERE usuario_id = ?
       ORDER BY orden_id DESC
       LIMIT 1`,
      [usuarioId]
    );

    await connection.commit();

    res.json({
      mensaje: 'Compra procesada correctamente',
      orden_id: orden.orden_id,
      total: orden.total,
      envio: estadoEnvio === 'Querétaro'
        ? 'Envío local dentro de Querétaro'
        : 'Envío fuera de Querétaro'
    });

  } catch (error) {
    await connection.rollback();
    res.status(500).json({ error: error.message });
  } finally {
    connection.release();
  }
};