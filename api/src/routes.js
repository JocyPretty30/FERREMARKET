const express = require('express');
const router = express.Router();
const controllers = require('./controllers');

router.get('/productos', controllers.obtenerProductos);
router.get('/categorias', controllers.obtenerCategorias);
router.get('/ordenes', controllers.obtenerOrdenes);

router.get('/resumen', controllers.obtenerResumen);
router.get('/ranking-productos', controllers.obtenerRankingProductos);
router.get('/clientes-vip', controllers.obtenerClientesVIP);

router.post('/comprar', controllers.comprar);

module.exports = router;