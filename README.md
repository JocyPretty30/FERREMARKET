# Ferremarket

Proyecto final de Base de Datos y Desarrollo Web.

Sistema de comercio electrónico para una ferretería que permite gestionar usuarios, productos, variantes, carritos de compra, órdenes, pagos y envíos.

---

## Tecnologías utilizadas

* MySQL
* Node.js
* Express.js
* HTML
* CSS
* JavaScript

---

## Estructura del proyecto

```text
api/
client/
docs/
sql/
README.md
```

---

## Base de datos

La base de datos `ferremarket` contiene las siguientes tablas:

* roles
* usuarios
* categorias
* productos
* variantes_producto
* carritos
* carrito_detalle
* ordenes
* orden_detalle
* pagos
* envios
* envio_estados
* historial_precios

---

## Funcionalidades implementadas

### Gestión de usuarios

* Registro de usuarios
* Roles de usuario
* Datos de contacto

### Gestión de productos

* Categorías
* Variantes de productos
* Control de stock
* Historial de precios

### Compras

* Carrito de compras
* Procesamiento de órdenes
* Registro de pagos
* Gestión de envíos

---

## Programación SQL

### Triggers

* trg_historial_precios
* trg_control_stock

### Stored Procedures

* ProcesarPago
* generar_ventas_masivas

### Vistas

* vw_productos_disponibles
* vw_total_ventas

### Índices

* idx_producto_nombre
* idx_producto_categoria
* idx_variante_sku
* idx_orden_usuario
* idx_orden_fecha
* idx_carrito_usuario

---

## Consultas avanzadas

* EXPLAIN
* Clientes VIP
* Ranking de productos utilizando RANK()
* Consultas de ventas y rendimiento
* Consultas de agregación con SUM() y COUNT()

---

## Evidencias

Las evidencias del proyecto se encuentran en:

```text
docs/
├── DER.png
└── reporte_rendimiento.pdf
```

---

## Pruebas de carga y rendimiento

Para evaluar el rendimiento de la base de datos se generaron más de **10,000 registros** en las tablas principales de movimientos y ventas mediante procedimientos almacenados.

Se realizaron pruebas utilizando:

* Consultas complejas con múltiples JOIN.
* Funciones de agregación (SUM y COUNT).
* Funciones de ventana (RANK).
* Procedimientos almacenados.
* Triggers.
* Análisis del plan de ejecución mediante EXPLAIN.

### Optimización implementada

Se crearon índices para optimizar las búsquedas frecuentes:

* idx_producto_nombre
* idx_producto_categoria
* idx_variante_sku
* idx_orden_usuario
* idx_orden_fecha
* idx_carrito_usuario

Los resultados y evidencias se encuentran documentados en:

* docs/DER.png
* docs/reporte_rendimiento.pdf

---

## API REST

Se desarrolló una API utilizando Node.js y Express para consultar información de la base de datos.

### Endpoints implementados

* GET /api/productos
* GET /api/categorias
* GET /api/ordenes

La API se conecta directamente a MySQL mediante el módulo mysql2.

---

## Frontend

Se desarrolló una interfaz web básica que consume la API REST y muestra los productos disponibles de la ferretería.

Archivos principales:

* client/index.html
* client/styles.css
* client/app.js

Características:

* Visualización de productos.
* Consulta dinámica de datos desde la API.
* Diseño responsivo básico mediante CSS.

---

## Archivos SQL

### 01_ddl.sql

Contiene:

* Creación de tablas.
* Llaves primarias.
* Llaves foráneas.
* Restricciones de integridad referencial.

### 02_programacion.sql

Contiene:

* Triggers.
* Stored Procedures.
* Vistas.

### 03_datos.sql

Contiene:

* Datos iniciales.
* Datos de prueba.
* Generación masiva de registros.

### 04_consultas_explain.sql

Contiene:

* Consultas complejas.
* EXPLAIN.
* Consultas analíticas.
* Ranking de productos.
* Consulta de clientes VIP.

---

## Conclusión

El proyecto integra diseño de bases de datos relacionales, programación SQL avanzada, optimización mediante índices, análisis de rendimiento y una aplicación web conectada a MySQL mediante una API REST.

Se implementaron mecanismos de integridad referencial, automatización mediante triggers, procedimientos almacenados para el procesamiento de pagos y consultas avanzadas para el análisis de información.

---

## Autores

* Brenda Jocelyne Méndez Rico
* Angel Luis Resendiz Resendiz
