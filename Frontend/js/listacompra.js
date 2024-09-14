document.addEventListener('DOMContentLoaded', function() {
    const buylistLink = document.getElementById('contenedorListaCompra');
    const contenidoTitulo = document.getElementById('contenidoTitulo');
    const contenidoTabla = document.getElementById('contenidoTabla');

    buylistLink.addEventListener('click', function(e) {
        e.preventDefault();
        cargarListaCompra();
    });

});

//Función para obtener el token generado en el login:
function getToken() {
    return localStorage.getItem('token');
}
//Fin de la función. 

// Función para cargar la lista de compra desde la API
async function cargarListaCompra() {
    try {
        // Obtén el token de autenticación
        const token = getToken();  // Asegúrate de que esta función devuelve un token válido

        // Si no se encuentra un token, lanza un error
        if (!token) {
            throw new Error('No se encontró un token de autenticación');
        }

        // Realiza la solicitud a la API, incluyendo el token en los encabezados
        const response = await fetch('https://libreriaety.somee.com/api/ListaCompra/ver/listacompra', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`, // Incluir el token en el encabezado Authorization
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        mostrarTablaListaCompra(data);
    } catch (error) {
        console.error('Error al cargar la lista de compra:', error);
        document.getElementById('contenidoTabla').innerHTML = '<p>Error al cargar la lista de compra. Por favor, intente más tarde.</p>';
    }
}

// Función para mostrar la lista de compra de productos
function mostrarTablaListaCompra(data) {
    const contenidoTitulo = document.getElementById('contenidoTitulo');
    const contenidoTabla = document.getElementById('contenidoTabla');
    
    contenidoTitulo.textContent = 'Lista de Compra';
    contenidoTitulo.className = 'titulo-lista-compra';
    
    const columnTitles = {
        'nombreProducto': 'Nombre del Producto',
        'precioCompra': 'Precio de Compra',
        'precioVenta': 'Precio de Venta',
        'cantidadStock': 'Cantidad en stock',
        'nombreProveedor': 'Proveedor',
        'noTelefono': 'Teléfono del proveedor'
    };

    let tabla = '<table class="tabla-lista-compra"><thead><tr>';
    
    if (data.length > 0) {
        Object.keys(data[0]).forEach(key => {
            const title = columnTitles[key] || key;
            tabla += `<th>${title}</th>`;
        });
    }
    
    tabla += '</tr></thead><tbody>';

    data.forEach(item => {
        tabla += '<tr>';
        Object.keys(item).forEach(key => {
            let value = item[key];
            if (key === 'precioCompra' || key === 'precioVenta') {
                value = `Q${parseFloat(value).toFixed(2)}`;
            }
            tabla += `<td>${value}</td>`;
        });
        tabla += '</tr>';
    });

    tabla += '</tbody></table>';
    contenidoTabla.innerHTML = tabla;
}

/*Fin de la función*/




// Función para mostrar los registros de caja en tarjetas
function mostrarCajas(cajas) {
    const contenedor = document.getElementById('seccionCaja');  // Puedes renombrar este id a algo más apropiado como 'contenedorCajas'

    if (!contenedor) {
        throw new Error("El contenedor de cajas no se encontró.");
    }

    contenedor.innerHTML = ''; // Limpiar el contenedor antes de agregar nuevas tarjetas

    cajas.forEach(caja => {
        const card = document.createElement('div');
        card.classList.add('card', 'text-bg-success', 'mb-3');
        card.style.maxWidth = '18rem';

        card.innerHTML = `
            <div class="card-header">Operación: ${caja.tipoOperacion}</div>
            <div class="card-body">
                <h5 class="card-title">Dinero Inicial: Q${caja.dineroInicial}</h5>
                <p class="card-text">Dinero Final: Q${caja.dineroFinal}</p>
                <p class="card-text">Balance del Día: Q${caja.balanceDelDia}</p>
                <p class="card-text">Fecha y Hora: ${new Date(caja.fechaYhora).toLocaleString()}</p>
                <p class="card-text">Observaciones: ${caja.observaciones}</p>
            </div>
        `;

        contenedor.appendChild(card);
    });
}

// Función para mostrar los registros de caja en tarjetas
function mostrarCajas(cajas) {
    // Obtén el contenedor donde se mostrarán las tarjetas (puedes renombrar el ID a algo más apropiado, como 'contenedorCajas')
    const contenedor = document.getElementById('seccionCaja');

    // Verifica si el contenedor existe en el DOM
    if (!contenedor) {
        throw new Error("El contenedor de cajas no se encontró.");
    }

    // Limpia el contenedor antes de agregar nuevas tarjetas
    contenedor.innerHTML = '';

    // Itera sobre el array de cajas y crea una tarjeta para cada registro de caja
    cajas.forEach(caja => {
        const card = document.createElement('div');
        // Añade las clases CSS para el estilo de la tarjeta
        card.classList.add('card', 'text-bg-success', 'mb-3');
        card.style.maxWidth = '18rem';  // Establece el ancho máximo de la tarjeta

        // Rellena la tarjeta con la información de la caja
        card.innerHTML = `
            <div class="card-header">Operación: ${caja.tipoOperacion}</div>
            <div class="card-body">
                <h5 class="card-title">Dinero Inicial: Q${caja.dineroInicial}</h5>
                <p class="card-text">Dinero Final: Q${caja.dineroFinal}</p>
                <p class="card-text">Balance del Día: Q${caja.balanceDelDia}</p>
                <p class="card-text">Fecha y Hora: ${new Date(caja.fechaYhora).toLocaleString()}</p>
                <p class="card-text">Observaciones: ${caja.observaciones}</p>
            </div>
        `;

        // Añade la tarjeta al contenedor
        contenedor.appendChild(card);
    });
}

// Función para obtener y mostrar los registros de caja
async function verCajas() {
    try {
        // Obtén el token de autenticación
        const token = getToken();

        // Si no se encuentra un token, lanza un error
        if (!token) {
            throw new Error('No se encontró un token de autenticación');
        }

        // Define la URL de la API para obtener los registros de caja
        const url = 'https://libreriaety.somee.com/api/Caja/lista';

        // Realiza una solicitud GET a la API para obtener los registros de caja
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`, // Incluir el token en el encabezado Authorization
                'Content-Type': 'application/json'
            }
        });

        // Si la respuesta no es exitosa, lanza un error
        if (!response.ok) {
            throw new Error('Error al obtener registros de caja');
        }

        // Convierte la respuesta a JSON
        const cajas = await response.json();

        // Muestra los registros de caja usando la función mostrarCajas
        mostrarCajas(cajas);
    } catch (error) {
        // Muestra un mensaje de error si algo falla
        console.error(error);
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `¡Error al obtener registros de caja! ${error.message}`,
        });
    }
}
//Fin de la función

// Función para mostrar los registros de ventas en tarjetas
function mostrarVentas(ventas) {
    // Obtén el contenedor donde se mostrarán las tarjetas
    const contenedor = document.getElementById('seccionVentas');

    // Verifica si el contenedor existe en el DOM
    if (!contenedor) {
        console.error("El contenedor de ventas no se encontró.");
        return;
    }

    // Limpia el contenedor antes de agregar nuevas tarjetas
    contenedor.innerHTML = '';

    // Verifica si hay ventas
    if (ventas.length === 0) {
        contenedor.innerHTML = '<p>No se encontraron ventas.</p>';
        return;
    }

    // Itera sobre el array de ventas y crea una tarjeta para cada registro de venta
    ventas.forEach(venta => {
        const card = document.createElement('div');
        card.classList.add('card', 'text-bg-info', 'mb-3');
        card.style.maxWidth = '18rem';  // Establece el ancho máximo de la tarjeta

        // Crea un HTML para listar los productos vendidos
        let productosHTML = '<ul>';
        venta.productos.forEach(producto => {
            productosHTML += `
                <li>
                    
                    Cantidad: ${producto.cantidadProducto || 'N/A'}, 
                    Unidad de medida: ${producto.unidadDeMedida || 'N/A'}
                </li>`;
        });
        productosHTML += '</ul>';

        // Rellena la tarjeta con la información de la venta
        card.innerHTML = `
            <div class="card-header">Fecha Vendida: ${new Date(venta.fechaVendida).toLocaleString()}</div>
            <div class="card-body">
                <h5 class="card-title">Total Vendido: Q${venta.totalVendido}</h5>
                <p class="card-text">Descripción: ${venta.descripcionVenta || 'Sin descripción'}</p>
                <p class="card-text">Productos Vendidos:</p>
                ${productosHTML}
            </div>
        `;

        // Añade la tarjeta al contenedor
        contenedor.appendChild(card);
    });
}

// Función para obtener y mostrar los registros de ventas
async function verVentas() {
    try {
        // Obtén el token de autenticación
        const token = getToken();

        // Si no se encuentra un token, lanza un error
        if (!token) {
            throw new Error('No se encontró un token de autenticación');
        }

        // Define la URL de la API para obtener los registros de ventas
        const url = 'https://libreriaety.somee.com/api/Ventas/ver/ventas';

        // Realiza una solicitud GET a la API para obtener los registros de ventas
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`, // Incluir el token en el encabezado Authorization
                'Content-Type': 'application/json'
            }
        });

        // Si la respuesta no es exitosa, lanza un error
        if (!response.ok) {
            throw new Error('Error al obtener registros de ventas');
        }

        // Convierte la respuesta a JSON
        const ventas = await response.json();
        console.log('Ventas obtenidas:', ventas); // Para depurar y verificar la respuesta

        // Muestra los registros de ventas usando la función mostrarVentas
        mostrarVentas(ventas);
    } catch (error) {
        // Muestra un mensaje de error si algo falla
        console.error('Error en verVentas:', error);
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `¡Error al obtener registros de ventas! ${error.message}`,
        });
    }
}

//Fin de la función.

// Mostrar contenedor vacío al cargar la página para que quede limpio
document.addEventListener('DOMContentLoaded', function () {
    // Limpia el contenedor de productos al cargar la página
    document.getElementById('seccionVentas').innerHTML = '';
});

//Fin de la función.

// Función para mostrar los registros de compras en tarjetas
function mostrarCompras(compras) {
    const contenedor = document.getElementById('seccionCompras');  // Asegúrate de tener un contenedor con este ID

    if (!contenedor) {
        throw new Error("El contenedor de compras no se encontró.");
    }

    contenedor.innerHTML = ''; // Limpiar el contenedor antes de agregar nuevas tarjetas

    compras.forEach(compra => {
        const card = document.createElement('div');
        card.classList.add('card', 'text-bg-warning', 'mb-3');  // Puedes ajustar los estilos según tu preferencia
        card.style.maxWidth = '18rem';

        // Detalles de los productos comprados
        let productosHTML = '<ul>';
        compra.productos.forEach(producto => {
            productosHTML += `
                <li>
                    Cantidad Comprada: ${producto.cantidadComprado}, 
                    Precio Compra: Q${producto.precioCompra}
                </li>`;
        });
        productosHTML += '</ul>';

        card.innerHTML = `
            <div class="card-header">Fecha de Compra: ${new Date(compra.fechaDeCompra).toLocaleString()}</div>
            <div class="card-body">
                <h5 class="card-title">Total de la Compra: Q${compra.totalDeLaCompra}</h5>
                <p class="card-text">Descripción: ${compra.descripcionCompra}</p>
                <p class="card-text">Productos Comprados:</p>
                ${productosHTML}
            </div>
        `;

        contenedor.appendChild(card);
    });
}

// Función para obtener y mostrar los registros de compras
async function verCompras() {
    try {
        const token = getToken(); // Obtén el token de autenticación

        if (!token) {
            throw new Error('No se encontró un token de autenticación');
        }

        const url = 'https://libreriaety.somee.com/api/Compras/ver/compras'; // URL de la API para obtener compras

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`, // Incluir el token en el encabezado Authorization
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Error al obtener registros de compras');
        }

        const compras = await response.json(); // Convierte la respuesta a JSON

        mostrarCompras(compras); // Muestra las compras usando la función mostrarCompras
    } catch (error) {
        console.error(error);
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `¡Error al obtener registros de compras! ${error.message}`,
        });
    }
}
//Fin de la función. 

// Función para mostrar los registros de usuarios en tarjetas
function mostrarUsuarios(usuarios) {
    const contenedor = document.getElementById('seccionUsuarios');  // Asegúrate de tener un contenedor con este ID

    if (!contenedor) {
        throw new Error("El contenedor de usuarios no se encontró.");
    }

    contenedor.innerHTML = ''; // Limpiar el contenedor antes de agregar nuevas tarjetas

    usuarios.forEach(usuario => {
        const card = document.createElement('div');
        card.classList.add('card', 'text-bg-secondary', 'mb-3'); 
        card.style.maxWidth = '18rem';

        card.innerHTML = `
            <div class="card-header">ID Usuario: ${usuario.id_usuario}</div>
            <div class="card-body">
                <h5 class="card-title">Nombre: ${usuario.nombre_usuario}</h5>
                <p class="card-text">Correo: ${usuario.correo_electronico}</p>
                <p class="card-text">Estado: ${usuario.estado === 1 ? 'Activo' : 'Inactivo'}</p>
                <p class="card-text">ID Rol: ${usuario.id_rol}</p>
            </div>
        `;

        contenedor.appendChild(card);
    });
}

// Función para obtener y mostrar los registros de usuarios
async function verUsuarios() {
    try {
        const token = getToken(); // Obtén el token de autenticación

        if (!token) {
            throw new Error('No se encontró un token de autenticación');
        }

        const url = 'https://libreriaety.somee.com/api/Usuario/ver/users'; // URL de la API para obtener usuarios

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`, // Incluir el token en el encabezado Authorization
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Error al obtener registros de usuarios');
        }

        const usuarios = await response.json(); // Convierte la respuesta a JSON

        mostrarUsuarios(usuarios); // Muestra los usuarios usando la función mostrarUsuarios
    } catch (error) {
        console.error(error);
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `¡Error al obtener registros de usuarios! ${error.message}`,
        });
    }
}
//Fin de la función.

// Función para mostrar los registros de proveedores en tarjetas
function mostrarProveedores(proveedores) {
    const contenedor = document.getElementById('seccionProveedores');  // Asegúrate de tener un contenedor con este ID

    if (!contenedor) {
        throw new Error("El contenedor de proveedores no se encontró.");
    }

    contenedor.innerHTML = ''; // Limpiar el contenedor antes de agregar nuevas tarjetas

    proveedores.forEach(proveedor => {
        const card = document.createElement('div');
        card.classList.add('card', 'text-bg-primary', 'mb-3');  // Ajusta los estilos según tu preferencia
        card.style.maxWidth = '18rem';

        // Agregamos un botón para cambiar el número de teléfono
        card.innerHTML = `
            <div class="card-header">ID Proveedor: ${proveedor.idProveedor}</div>
            <div class="card-body">
                <h5 class="card-title">Nombre: ${proveedor.nombreProveedor}</h5>
                <p class="card-text">Teléfono: <span id="telefono-${proveedor.idProveedor}">${proveedor.noTelefono}</span></p>
               <button class="btn btn-dark" data-id="${proveedor.idProveedor}" data-bs-toggle="modal" data-bs-target="#cambiarTelefonoModal">Cambiar número de teléfono</button>
            </div>
        `;

        contenedor.appendChild(card);
    });
}
// Función para obtener y mostrar los registros de proveedores
async function verProveedores() {
    try {
        const token = getToken(); // Obtén el token de autenticación

        if (!token) {
            throw new Error('No se encontró un token de autenticación');
        }

        const url = 'https://libreriaety.somee.com/api/Proveedores/ver/proveedor'; // URL de la API para obtener proveedores

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`, // Incluir el token en el encabezado Authorization
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Error al obtener registros de proveedores');
        }

        const proveedores = await response.json(); // Convierte la respuesta a JSON

        mostrarProveedores(proveedores); // Muestra los proveedores usando la función mostrarProveedores
    } catch (error) {
        console.error(error);
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `¡Error al obtener registros de proveedores! ${error.message}`,
        });
    }
}
//Fin de la función. 
 

