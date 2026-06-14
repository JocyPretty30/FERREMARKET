const API = 'http://localhost:3000/api';

const listaProductos = document.getElementById('listaProductos');
const buscador = document.getElementById('buscador');
const botonesCategoria = document.querySelectorAll('.categoria-btn');
const itemsCarrito = document.getElementById('itemsCarrito');
const totalCarrito = document.getElementById('totalCarrito');
const vaciarCarritoBtn = document.getElementById('vaciarCarrito');
const comprarBtn = document.getElementById('comprarBtn');

const clienteNombre = document.getElementById('clienteNombre');
const clienteTelefono = document.getElementById('clienteTelefono');
const direccionEnvio = document.getElementById('direccionEnvio');
const estadoEnvio = document.getElementById('estadoEnvio');

const rankingProductos = document.getElementById('rankingProductos');
const clientesVIP = document.getElementById('clientesVIP');

let productos = [];
let carrito = [];

const imagenesProductos = {
  Martillo: 'https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?auto=format&fit=crop&w=600&q=80',
  Desarmador: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=600&q=80',
  'Tornillo 1 pulgada': 'https://images.unsplash.com/photo-1586864387789-628af9feed72?auto=format&fit=crop&w=600&q=80',
  'Cable THW': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=600&q=80'
};

const imagenDefault = 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=600&q=80';

async function cargarResumen() {
  try {
    const res = await fetch(`${API}/resumen`);
    const data = await res.json();

    const totalProductos = document.getElementById('totalProductos');
    const totalOrdenes = document.getElementById('totalOrdenes');
    const totalPagos = document.getElementById('totalPagos');
    const ventasTotales = document.getElementById('ventasTotales');

    if (totalProductos) totalProductos.textContent = data.productos;
    if (totalOrdenes) totalOrdenes.textContent = data.ordenes;
    if (totalPagos) totalPagos.textContent = data.pagos;
    if (ventasTotales) ventasTotales.textContent = `$${Number(data.ventas).toFixed(2)}`;
  } catch (error) {
    console.error('Error al cargar resumen:', error);
  }
}

async function cargarProductos() {
  try {
    const res = await fetch(`${API}/productos`);
    productos = await res.json();
    mostrarProductos(productos);
  } catch (error) {
    listaProductos.innerHTML = '<p>No se pudieron cargar los productos.</p>';
    console.error(error);
  }
}

function mostrarProductos(lista) {
  listaProductos.innerHTML = '';

  if (lista.length === 0) {
    listaProductos.innerHTML = '<p>No se encontraron productos.</p>';
    return;
  }

  lista.forEach(producto => {
    const imagen = imagenesProductos[producto.nombre] || imagenDefault;

    const card = document.createElement('article');
    card.className = 'producto-card';

    card.innerHTML = `
      <img src="${imagen}" alt="${producto.nombre}">
      <div class="producto-info">
        <span class="badge">${producto.stock > 0 ? 'Disponible' : 'Agotado'}</span>
        <small>${producto.categoria || 'Ferretería'}</small>
        <h3>${producto.nombre}</h3>
        <p>${producto.descripcion || 'Producto de ferretería de alta calidad.'}</p>
        <p class="marca">${producto.marca || 'Marca genérica'}</p>
        <div class="producto-footer">
          <strong>$${Number(producto.precio).toFixed(2)}</strong>
          <button onclick="agregarAlCarrito(${producto.producto_id})">
            Agregar
          </button>
        </div>
      </div>
    `;

    listaProductos.appendChild(card);
  });
}

function agregarAlCarrito(productoId) {
  const producto = productos.find(p => Number(p.producto_id) === Number(productoId));
  if (!producto) return;

  const itemExistente = carrito.find(item => Number(item.producto_id) === Number(productoId));

  if (itemExistente) {
    itemExistente.cantidad += 1;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }

  renderizarCarrito();
}

function renderizarCarrito() {
  itemsCarrito.innerHTML = '';

  if (carrito.length === 0) {
    itemsCarrito.innerHTML = '<p>Tu carrito está vacío.</p>';
    totalCarrito.textContent = '$0.00';
    return;
  }

  let total = 0;

  carrito.forEach(item => {
    const subtotal = Number(item.precio) * item.cantidad;
    total += subtotal;

    const div = document.createElement('div');
    div.className = 'carrito-item';

    div.innerHTML = `
      <div>
        <h4>${item.nombre}</h4>
        <p>${item.cantidad} x $${Number(item.precio).toFixed(2)}</p>
      </div>

      <div class="carrito-acciones">
        <button onclick="cambiarCantidad(${item.producto_id}, -1)">-</button>
        <span>${item.cantidad}</span>
        <button onclick="cambiarCantidad(${item.producto_id}, 1)">+</button>
        <button class="eliminar" onclick="eliminarDelCarrito(${item.producto_id})">Eliminar</button>
      </div>
    `;

    itemsCarrito.appendChild(div);
  });

  totalCarrito.textContent = `$${total.toFixed(2)}`;
}

function cambiarCantidad(productoId, cambio) {
  const item = carrito.find(p => Number(p.producto_id) === Number(productoId));
  if (!item) return;

  item.cantidad += cambio;

  if (item.cantidad <= 0) {
    carrito = carrito.filter(p => Number(p.producto_id) !== Number(productoId));
  }

  renderizarCarrito();
}

function eliminarDelCarrito(productoId) {
  carrito = carrito.filter(p => Number(p.producto_id) !== Number(productoId));
  renderizarCarrito();
}

async function comprar() {
  if (carrito.length === 0) {
    alert('Agrega productos al carrito antes de comprar.');
    return;
  }

  if (!clienteNombre.value || !clienteTelefono.value || !direccionEnvio.value || !estadoEnvio.value) {
    alert('Completa los datos de envío.');
    return;
  }
const metodoPago = document.querySelector('input[name="metodoPago"]:checked').value;

if (metodoPago === 'Tarjeta') {
  if (!nombreTarjeta.value || !numeroTarjeta.value || !vencimientoTarjeta.value || !cvvTarjeta.value) {
    alert('Completa los datos de la tarjeta.');
    return;
  }
}
const payload = {
  cliente: clienteNombre.value,
  telefono: clienteTelefono.value,
  estadoEnvio: estadoEnvio.value,
  direccion: direccionEnvio.value,
  metodoPago: metodoPago,
  productos: carrito.map(item => ({
    producto_id: item.producto_id,
    cantidad: item.cantidad
  }))
};
  };
  const nombreTarjeta = document.getElementById('nombreTarjeta');
const numeroTarjeta = document.getElementById('numeroTarjeta');
const vencimientoTarjeta = document.getElementById('vencimientoTarjeta');
const cvvTarjeta = document.getElementById('cvvTarjeta');

  try {
    const res = await fetch(`${API}/comprar`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error || 'Error al procesar la compra');
      return;
    }

    alert(`Compra realizada correctamente. Orden #${data.orden_id}. ${data.envio}`);

    carrito = [];
    renderizarCarrito();
    clienteNombre.value = '';
    clienteTelefono.value = '';
    direccionEnvio.value = '';
    estadoEnvio.value = '';

    await cargarResumen();
    await cargarRankingProductos();
    await cargarClientesVIP();
  } catch (error) {
    console.error(error);
    alert('No se pudo conectar con la API.');
  }

async function cargarRankingProductos() {
  if (!rankingProductos) return;

  try {
    const res = await fetch(`${API}/ranking-productos`);
    const data = await res.json();

    rankingProductos.innerHTML = '';

    data.forEach(item => {
      rankingProductos.innerHTML += `
        <div class="ranking-item">
          <span>#${item.ranking}</span>
          <strong>${item.nombre}</strong>
          <small>${item.total_vendido} vendidos</small>
        </div>
      `;
    });
  } catch (error) {
    console.error('Error al cargar ranking:', error);
  }
}

async function cargarClientesVIP() {
  if (!clientesVIP) return;

  try {
    const res = await fetch(`${API}/clientes-vip`);
    const data = await res.json();

    clientesVIP.innerHTML = '';

    data.forEach(item => {
      clientesVIP.innerHTML += `
        <div class="vip-item">
          <span>⭐</span>
          <strong>${item.cliente}</strong>
          <small>${item.compras} compras | $${Number(item.total_gastado).toFixed(2)}</small>
        </div>
      `;
    });
  } catch (error) {
    console.error('Error al cargar clientes VIP:', error);
  }
}

if (vaciarCarritoBtn) {
  vaciarCarritoBtn.addEventListener('click', () => {
    carrito = [];
    renderizarCarrito();
  });
}

if (comprarBtn) {
  comprarBtn.addEventListener('click', comprar);
}

if (buscador) {
  buscador.addEventListener('input', () => {
    const texto = buscador.value.toLowerCase();

    const filtrados = productos.filter(producto =>
      producto.nombre.toLowerCase().includes(texto) ||
      (producto.descripcion || '').toLowerCase().includes(texto) ||
      (producto.marca || '').toLowerCase().includes(texto)
    );

    mostrarProductos(filtrados);
  });
}

botonesCategoria.forEach(boton => {
  boton.addEventListener('click', () => {
    const categoria = boton.dataset.categoria;

    if (categoria === 'todas') {
      mostrarProductos(productos);
      return;
    }

    const filtrados = productos.filter(producto => producto.categoria === categoria);
    mostrarProductos(filtrados);
  });
});

async function iniciar() {
  await cargarResumen();
  await cargarProductos();
  await cargarRankingProductos();
  await cargarClientesVIP();
  renderizarCarrito();
}

iniciar();