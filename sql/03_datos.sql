USE ferremarket;

-- ROLES
INSERT INTO roles(nombre, descripcion)
VALUES
('Administrador','Control total del sistema'),
('Cliente','Comprador de la tienda');

-- USUARIOS
INSERT INTO usuarios
(rol_id,nombre,email,password_hash,telefono,direccion)
VALUES
(1,'Brenda','brenda@gmail.com','123456','5551234567','Querétaro'),
(2,'Juan Perez','juan@gmail.com','123456','5559876543','CDMX');

-- CATEGORIAS
INSERT INTO categorias(nombre,descripcion)
VALUES
('Herramientas','Herramientas manuales'),
('Tornilleria','Tornillos y sujetadores'),
('Electricidad','Material electrico');

-- PRODUCTOS
INSERT INTO productos
(categoria_id,nombre,descripcion,precio,stock,marca)
VALUES
(1,'Martillo','Martillo de acero',250.00,30,'Truper'),
(1,'Desarmador','Desarmador plano',80.00,50,'Truper'),
(2,'Tornillo 1 pulgada','Tornillo galvanizado',2.50,1000,'Fiero'),
(3,'Cable THW','Cable electrico THW',15.00,500,'IUSA');
INSERT INTO variantes_producto
(producto_id, nombre_variante, sku, especificacion, precio, stock)
VALUES
(1, 'Martillo 16 oz', 'MART-16OZ', 'Mango de fibra', 250.00, 30),
(1, 'Martillo 20 oz', 'MART-20OZ', 'Uso pesado', 320.00, 20),
(2, 'Desarmador plano', 'DES-PLA', 'Punta plana', 80.00, 50),
(2, 'Desarmador cruz', 'DES-CRUZ', 'Punta Phillips', 85.00, 45),
(3, 'Tornillo 1 pulgada', 'TOR-1P', 'Galvanizado', 2.50, 1000),
(3, 'Tornillo 2 pulgadas', 'TOR-2P', 'Galvanizado', 3.50, 800),
(4, 'Cable THW calibre 12', 'CAB-THW-12', 'Calibre 12', 15.00, 500),
(4, 'Cable THW calibre 10', 'CAB-THW-10', 'Calibre 10', 22.00, 350);
-- CARRITO DE PRUEBA PARA PROCESARPAGO

INSERT INTO carritos(usuario_id, estado)
VALUES (2, 'activo');

INSERT INTO carrito_detalle
(carrito_id, producto_id, variante_id, cantidad, precio_unitario)
VALUES
(LAST_INSERT_ID(), 1, 1, 2, 250.00),
(LAST_INSERT_ID(), 2, 3, 1, 80.00);ProcesarPagoProcesarPago