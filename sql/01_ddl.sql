USE ferremarket;

-- =========================================
-- TABLA ROLES
-- =========================================

CREATE TABLE roles (
    rol_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE,
    descripcion VARCHAR(150)
);

-- =========================================
-- TABLA USUARIOS
-- =========================================

CREATE TABLE usuarios (
    usuario_id INT AUTO_INCREMENT PRIMARY KEY,
    rol_id INT NOT NULL,

    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(120) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,

    telefono VARCHAR(20),
    direccion VARCHAR(200),

    activo BOOLEAN DEFAULT TRUE,

    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (rol_id)
        REFERENCES roles(rol_id)
);

-- =========================================
-- TABLA CATEGORIAS
-- =========================================

CREATE TABLE categorias (
    categoria_id INT AUTO_INCREMENT PRIMARY KEY,

    nombre VARCHAR(100) NOT NULL UNIQUE,
    descripcion VARCHAR(255)
);

-- =========================================
-- TABLA PRODUCTOS
-- =========================================

CREATE TABLE productos (
    producto_id INT AUTO_INCREMENT PRIMARY KEY,

    categoria_id INT NOT NULL,

    nombre VARCHAR(150) NOT NULL,
    descripcion TEXT,

    precio DECIMAL(10,2) NOT NULL,

    stock INT NOT NULL DEFAULT 0,

    marca VARCHAR(100),

    activo BOOLEAN DEFAULT TRUE,

    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (categoria_id)
        REFERENCES categorias(categoria_id)
);
-- =========================================
-- TABLA CARRITOS
-- =========================================

CREATE TABLE carritos (
    carrito_id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    estado ENUM('activo', 'comprado', 'cancelado') DEFAULT 'activo',
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (usuario_id)
        REFERENCES usuarios(usuario_id)
);

-- =========================================
-- TABLA CARRITO_DETALLE
-- =========================================

CREATE TABLE carrito_detalle (
    carrito_detalle_id INT AUTO_INCREMENT PRIMARY KEY,
    carrito_id INT NOT NULL,
    producto_id INT NOT NULL,
    cantidad INT NOT NULL,
    precio_unitario DECIMAL(10,2) NOT NULL,

    FOREIGN KEY (carrito_id)
        REFERENCES carritos(carrito_id),

    FOREIGN KEY (producto_id)
        REFERENCES productos(producto_id)
);
-- =========================================
-- TABLA ORDENES
-- =========================================

CREATE TABLE ordenes (
    orden_id INT AUTO_INCREMENT PRIMARY KEY,

    usuario_id INT NOT NULL,

    fecha_orden TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    total DECIMAL(10,2) NOT NULL,

    estado ENUM(
        'pendiente',
        'pagada',
        'enviada',
        'entregada',
        'cancelada'
    ) DEFAULT 'pendiente',

    FOREIGN KEY (usuario_id)
        REFERENCES usuarios(usuario_id)
);

-- =========================================
-- TABLA ORDEN_DETALLE
-- =========================================

CREATE TABLE orden_detalle (
    detalle_id INT AUTO_INCREMENT PRIMARY KEY,

    orden_id INT NOT NULL,

    producto_id INT NOT NULL,

    cantidad INT NOT NULL,

    precio_unitario DECIMAL(10,2) NOT NULL,

    subtotal DECIMAL(10,2) NOT NULL,

    FOREIGN KEY (orden_id)
        REFERENCES ordenes(orden_id),

    FOREIGN KEY (producto_id)
        REFERENCES productos(producto_id)
);
-- =========================================
-- TABLA PAGOS
-- =========================================

CREATE TABLE pagos (
    pago_id INT AUTO_INCREMENT PRIMARY KEY,

    orden_id INT NOT NULL,

    metodo_pago VARCHAR(50) NOT NULL,

    monto DECIMAL(10,2) NOT NULL,

    fecha_pago TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (orden_id)
        REFERENCES ordenes(orden_id)
);

-- =========================================
-- TABLA ENVIOS
-- =========================================

CREATE TABLE envios (
    envio_id INT AUTO_INCREMENT PRIMARY KEY,

    orden_id INT NOT NULL,

    direccion_envio VARCHAR(255) NOT NULL,

    fecha_envio TIMESTAMP NULL,

    fecha_entrega TIMESTAMP NULL,

    FOREIGN KEY (orden_id)
        REFERENCES ordenes(orden_id)
);

-- =========================================
-- TABLA ENVIO_ESTADOS
-- =========================================

CREATE TABLE envio_estados (
    estado_id INT AUTO_INCREMENT PRIMARY KEY,

    envio_id INT NOT NULL,

    estado ENUM(
        'procesando',
        'pagado',
        'enviado',
        'entregado'
    ) NOT NULL,

    fecha_estado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (envio_id)
        REFERENCES envios(envio_id)
);

-- =========================================
-- TABLA HISTORIAL_PRECIOS
-- =========================================

CREATE TABLE historial_precios (
    historial_id INT AUTO_INCREMENT PRIMARY KEY,

    producto_id INT NOT NULL,

    precio_anterior DECIMAL(10,2),

    precio_nuevo DECIMAL(10,2),

    fecha_cambio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (producto_id)
        REFERENCES productos(producto_id)
);
-- =========================================
-- TABLA VARIANTES_PRODUCTO
-- =========================================

CREATE TABLE variantes_producto (
    variante_id INT AUTO_INCREMENT PRIMARY KEY,

    producto_id INT NOT NULL,

    nombre_variante VARCHAR(100) NOT NULL,
    sku VARCHAR(50) NOT NULL UNIQUE,

    especificacion VARCHAR(150),

    precio DECIMAL(10,2) NOT NULL,
    stock INT NOT NULL DEFAULT 0,

    activo BOOLEAN DEFAULT TRUE,

    FOREIGN KEY (producto_id)
        REFERENCES productos(producto_id)
);
ALTER TABLE carrito_detalle
ADD variante_id INT NULL;

ALTER TABLE carrito_detalle
ADD CONSTRAINT fk_carrito_detalle_variante
FOREIGN KEY (variante_id)
REFERENCES variantes_producto(variante_id);

ALTER TABLE orden_detalle
ADD variante_id INT NULL;

ALTER TABLE orden_detalle
ADD CONSTRAINT fk_orden_detalle_variante
FOREIGN KEY (variante_id)
REFERENCES variantes_producto(variante_id);