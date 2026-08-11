
/* SCRIPT PRINCIPAL - Distribuidora de Golosinas */
/* Sistema de Carrito de Compras */



/* VARIABLES GLOBALES DEL CARRITO */

// CARRITO - Array que almacena los productos agregados al carrito de compras
let carrito = [];

// PRODUCTOS - Base de datos de productos disponibles en la tienda
const productos = [
    { id: 1, nombre: "Caramelos de menta", precio: 5000 },
    { id: 2, nombre: "Caramelos de fruta", precio: 4000 },
    { id: 3, nombre: "Chocolate amargo", precio: 5000 },
    { id: 4, nombre: "Chocolate con leche", precio: 8000 },
    { id: 5, nombre: "Chocolate con maní", precio: 7000 },
    { id: 6, nombre: "Galletas de avena", precio: 6000 },
    { id: 7, nombre: "Galletas rellenas", precio: 7000 },
    { id: 8, nombre: "Galletas pepas", precio: 6500 },
    { id: 9, nombre: "Snack salado", precio: 4000 },
    { id: 10, nombre: "Snack dulce", precio: 4500 },
    { id: 11, nombre: "Snack dulce", precio: 5000 }
];


/* FUNCION: Inicializar el sitio */

/**
 * INICIAR - Se ejecuta cuando se carga la pagina
 * Agrega event listeners a todos los botones de agregar al carrito
 */
function iniciar() {
    console.log("Sitio inicializado");
    
    // BOTONES AGREGAR AL CARRITO - Obtiene todos los botones
    const botonesAgregar = document.querySelectorAll("button:not(.carousel-dot)");
    
    // LOOP - Agrega event listener a cada botón
    botonesAgregar.forEach((boton, index) => {
        boton.addEventListener("click", () => {
            // AGREGAR PRODUCTO - Llama a la función para agregar producto
            agregarProductoAlCarrito(index + 1);
        });
    });
}


/* FUNCION: Agregar producto al carrito */

/**
 * AGREGAR PRODUCTO AL CARRITO - Añade un producto al carrito de compras
 * @param {number} idProducto - ID del producto a agregar
 */
function agregarProductoAlCarrito(idProducto) {
    // BÚSQUEDA - Busca el producto en el array de productos
    const producto = productos.find(p => p.id === idProducto);
    
    // VALIDACIÓN - Verifica que el producto existe
    if (!producto) {
        console.log("Producto no encontrado");
        return;
    }
    
    // CARRITO - Agrega el producto al array del carrito
    carrito.push(producto);
    
    // ACTUALIZAR - Recarga la visualizacion del carrito
    actualizarCarrito();
    
    // NOTIFICACION - Muestra mensaje de confirmacion
    console.log(`"${producto.nombre}" agregado al carrito`);
}

/* FUNCION: Actualizar visualizacion del carrito */

/**
 * ACTUALIZAR CARRITO - Actualiza la visualización del carrito en la pagina
 * Recalcula el total y actualiza el contador
 */
function actualizarCarrito() {
    // LISTA DEL CARRITO - Obtiene el elemento ul del carrito
    const listaCarrito = document.querySelector("#carrito ul");
    
    // CONTADOR DEL CARRITO - Obtiene el link del carrito en el header
    const contadorCarrito = document.querySelector("nav a[href='#carrito']");
    
    // LIMPIAR - Borra el contenido anterior del carrito
    listaCarrito.innerHTML = "";
    
    // VALIDACION - Si el carrito esta vacio, muestra mensaje
    if (carrito.length === 0) {
        listaCarrito.innerHTML = "<li>Tu carrito esta vacio</li>";
        contadorCarrito.textContent = "Carrito (0)";
    } else {
        // MOSTRAR PRODUCTOS - Agrega cada producto como un item de lista
        carrito.forEach((producto, index) => {
            const itemCarrito = document.createElement("li");
            itemCarrito.textContent = `${producto.nombre} - $${producto.precio}`;
            listaCarrito.appendChild(itemCarrito);
        });
        
        // ACTUALIZAR CONTADOR - Actualiza el numero en el header
        contadorCarrito.textContent = `Carrito (${carrito.length})`;
    }
    
    // TOTAL DEL CARRITO - Calcula el total de los precios
    calcularTotal();
}


/* FUNCIÓN: Calcular total del carrito */

/**
 * CALCULAR TOTAL - Suma todos los precios de los productos en el carrito
 */
function calcularTotal() {
    // SUMAR PRECIOS - Reduce el array de carrito para sumar todos los precios
    const total = carrito.reduce((suma, producto) => {
        return suma + producto.precio;
    }, 0);
    
    // TOTAL - Obtiene el elemento que muestra el total
    const elementoTotal = document.querySelector("#carrito p");
    
    // ACTUALIZAR - Muestra el total actualizado
    elementoTotal.textContent = `Total: $${total}`;
}
/*Vaciar carrito*/
function vaciarCarrito() {
    // LIMPIAR - Borra todos los productos del carrito
    carrito = [];
    actualizarCarrito();
    
}

    
/* EVENTO: Cargar la pagina */


// CARGAR - Ejecuta la funcion iniciar cuando se carga el DOM
document.addEventListener("DOMContentLoaded", iniciar);


