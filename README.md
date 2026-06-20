# FERREMARKET

Sistema web de comercio electrónico para la gestión y venta de productos de ferretería desarrollado como proyecto final de Base de Datos y Desarrollo Web.

---

## Descripción General

FERREMARKET es una plataforma web diseñada para administrar productos, categorías, inventario, carritos de compra, órdenes, pagos y envíos dentro de una tienda de ferretería.

El proyecto integra una base de datos relacional en MySQL, una API REST desarrollada con Node.js y Express, y una interfaz web construida con HTML, CSS y JavaScript.

Su objetivo principal es demostrar la integración de tecnologías de desarrollo web con técnicas avanzadas de bases de datos, incluyendo procedimientos almacenados, triggers, vistas, índices y consultas analíticas.

---

## Tecnologías Utilizadas

### Base de Datos

- MySQL 8

### Backend

- Node.js
- Express.js
- MySQL2

### Frontend

- HTML5
- CSS3
- JavaScript

### Herramientas de Desarrollo

- Visual Studio Code
- MySQL Workbench
- Git
- GitHub

---

## Arquitectura del Sistema

El sistema se encuentra dividido en tres capas principales:

### Capa de Presentación

Interfaz web desarrollada con HTML, CSS y JavaScript.

Funciones:

- Visualización de productos.
- Búsqueda y filtrado.
- Gestión del carrito de compras.
- Captura de datos de envío.
- Selección de métodos de pago.
- Visualización de estadísticas comerciales.

### Capa de Negocio

API REST desarrollada con Node.js y Express.

Funciones:

- Consulta de productos.
- Procesamiento de compras.
- Generación de estadísticas.
- Gestión de clientes VIP.
- Ranking de productos más vendidos.

### Capa de Persistencia

Base de datos MySQL encargada del almacenamiento y administración de la información.

Funciones:

- Integridad referencial.
- Gestión de inventarios.
- Control de órdenes.
- Registro de pagos.
- Seguimiento de envíos.

---

## Estructura del Proyecto

```text
FERREMARKET/

├── api/
│   ├── src/
│   │   ├── controllers.js
│   │   ├── database.js
│   │   └── routes.js
│   ├── index.js
│   ├── package.json
│   └── package-lock.json
│
├── client/
│   ├── index.html
│   ├── styles.css
│   └── app.js
│
├── docs/
│   ├── DER.png
│   └── reporte_rendimiento.pdf
│
├── sql/
│   ├── 01_ddl.sql
│   ├── 02_programacion.sql
│   ├── 03_datos.sql
│   ├── 04_consultas_explain.sql
│   └── README.md
│
└── README.md
```

---

## Modelo de Base de Datos

La base de datos denominada **ferremarket** está compuesta por las siguientes entidades principales:

### Seguridad y Usuarios

- roles
- usuarios

### Catálogo de Productos

- categorias
- productos
- variantes_producto

### Compras

- carritos
- carrito_detalle
- ordenes
- orden_detalle

### Operación Comercial

- pagos
- envios
- envio_estados

### Auditoría y Control

- historial_precios

---

## Funcionalidades Implementadas

### Gestión de Usuarios

- Administración de roles.
- Registro de clientes.
- Almacenamiento de información de contacto.
- Control de estado de usuarios.

### Gestión de Productos

- Catálogo de productos.
- Clasificación por categorías.
- Variantes de productos.
- Control de stock.
- Historial de modificaciones de precio.

### Carrito de Compras

- Agregar productos.
- Eliminar productos.
- Modificar cantidades.
- Actualización automática del total.

### Procesamiento de Órdenes

- Generación de órdenes de compra.
- Cálculo de subtotal.
- Cálculo de IVA.
- Registro automático de ventas.

### Pagos

- Tarjeta.
- Transferencia bancaria.
- Venta industrial.

### Envíos

- Captura de dirección.
- Registro de estado de envío.
- Seguimiento de entregas.

### Estadísticas

- Ranking de productos más vendidos.
- Clientes VIP.
- Resumen comercial.

---

## Programación SQL

### Triggers

#### trg_historial_precios

Registra automáticamente cada modificación realizada sobre el precio de un producto.

#### trg_control_stock

Permite controlar y actualizar existencias después de operaciones de compra.

### Procedimientos Almacenados

#### ProcesarPago

Procesa el pago asociado a una orden y registra la transacción correspondiente.

#### generar_ventas_masivas

Genera grandes volúmenes de información para pruebas de rendimiento y análisis de consultas.

### Vistas

#### vw_productos_disponibles

Muestra únicamente productos activos y disponibles para venta.

#### vw_total_ventas

Resume información de ventas para consultas analíticas y reportes.

---

## Optimización de Base de Datos

Se implementaron índices para mejorar el rendimiento de las consultas.

### Índices Implementados

- idx_producto_nombre
- idx_producto_categoria
- idx_variante_sku
- idx_orden_usuario
- idx_orden_fecha
- idx_carrito_usuario

---

## Consultas Avanzadas

Se desarrollaron consultas analíticas utilizando funciones avanzadas de MySQL.

- SUM()
- COUNT()
- AVG()
- RANK()

Consultas implementadas:

- Ranking de productos más vendidos.
- Clientes VIP.
- Ventas acumuladas.
- Reportes de desempeño comercial.
- Estadísticas generales del sistema.

---

## Análisis de Rendimiento

Se realizaron pruebas utilizando más de 10,000 registros generados mediante procedimientos almacenados.

Herramientas utilizadas:

- EXPLAIN
- Índices personalizados
- Consultas JOIN complejas
- Funciones de ventana

---

## API REST

La API fue desarrollada utilizando Node.js y Express.

### Endpoints Implementados

#### Productos

GET /api/productos

#### Resumen

GET /api/resumen

#### Ranking de Productos

GET /api/ranking-productos

#### Clientes VIP

GET /api/clientes-vip

#### Compras

POST /api/comprar

---

## Frontend

La interfaz web consume la API REST y permite la interacción directa con la base de datos.

### Características

- Catálogo dinámico de productos.
- Búsqueda en tiempo real.
- Filtrado por categorías.
- Carrito de compras interactivo.
- Actualización automática de cantidades.
- Cálculo de subtotal, IVA y total.
- Formulario de envío.
- Métodos de pago.
- Ranking de productos más vendidos.
- Clientes VIP.
- Diseño responsivo.

### Archivos Principales

- client/index.html
- client/styles.css
- client/app.js

---

## Evidencias

Las evidencias del proyecto se encuentran en:

```text
docs/
├── DER.png
└── reporte_rendimiento.pdf
```

---

## Archivos SQL

### 01_ddl.sql

- Creación de tablas.
- Llaves primarias.
- Llaves foráneas.
- Integridad referencial.

### 02_programacion.sql

- Triggers.
- Procedimientos almacenados.
- Vistas.

### 03_datos.sql

- Datos iniciales.
- Datos de prueba.
- Generación masiva de registros.

### 04_consultas_explain.sql

- Consultas avanzadas.
- EXPLAIN.
- Ranking de productos.
- Clientes VIP.
- Consultas de rendimiento.

---

## Conclusiones

FERREMARKET permitió integrar conocimientos de bases de datos, programación SQL avanzada y desarrollo web en una sola solución funcional.

Se implementaron mecanismos de integridad referencial, automatización mediante triggers, procedimientos almacenados para el procesamiento de operaciones comerciales y optimización de consultas mediante índices.

Además, se desarrolló una API REST conectada a MySQL y una interfaz web capaz de interactuar dinámicamente con la información almacenada.

---

## Autores

**Brenda Jocelyne Méndez Rico**

**Ángel Luis Reséndiz Reséndiz**

Grupo Tecnológico Universitario de Querétaro

Licenciatura en Ingeniería en Sistemas Computacionales

Proyecto Final — Base de Datos y Desarrollo Web
