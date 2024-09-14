const cloud = document.getElementById("cloud");
const barraLateral = document.querySelector(".barra-lateral");
const spans = document.querySelectorAll("span");
const palanca = document.querySelector(".switch");
const circulo = document.querySelector(".circulo");
const menu = document.querySelector(".menu");
const main = document.querySelector("main");
const menuItems = document.querySelectorAll('.navegacion .main-menu-item');

// Alterna el modo oscuro/claro al hacer clic en la palanca
palanca.addEventListener("click", () => {
    let body = document.body;
    body.classList.toggle("dark-mode"); // Cambia entre modo oscuro y claro
    circulo.classList.toggle("prendido");
});

// Alterna la visualización de la barra lateral
menu.addEventListener("click", () => {
    barraLateral.classList.toggle("max-barra-lateral");
    if (barraLateral.classList.contains("max-barra-lateral")) {
        menu.children[0].style.display = "none";
        menu.children[1].style.display = "block";
    } else {
        menu.children[0].style.display = "block";
        menu.children[1].style.display = "none";
    }
    if (window.innerWidth <= 320) {
        barraLateral.classList.add("mini-barra-lateral");
        main.classList.add("min-main");
        spans.forEach((span) => {
            span.classList.add("oculto");
        });
    }
});

// Alterna la visualización mini de la barra lateral al hacer clic en cloud
cloud.addEventListener("click", () => {
    barraLateral.classList.toggle("mini-barra-lateral");
    main.classList.toggle("min-main");
    spans.forEach((span) => {
        span.classList.toggle("oculto");
    });
});

// Función para alternar menús y submenús
function toggleMenu(clickedItem, submenuId = null) {
    // Desactivar todos los elementos del menú principal
    menuItems.forEach(item => {
        if (item !== clickedItem) {
            item.classList.remove('active');
            const parentLi = item.closest('li');
            const submenu = parentLi.querySelector('.submenu');
            if (submenu) {
                submenu.classList.remove('active');
            }
        }
    });

    // Activar el elemento clickeado
    clickedItem.classList.toggle('active');

    // Manejar submenú si existe
    if (submenuId) {
        const submenu = document.getElementById(submenuId);
        submenu.classList.toggle('active');
    }
}

// Cerrar todos los menús
function closeAllMenus() {
    menuItems.forEach(item => {
        item.classList.remove('active');
        const parentLi = item.closest('li');
        const submenu = parentLi.querySelector('.submenu');
        if (submenu) {
            submenu.classList.remove('active');
        }
    });
}

// Cerrar menús cuando se hace clic fuera de la barra lateral
document.addEventListener('click', function(event) {
    if (!barraLateral.contains(event.target) && !menu.contains(event.target)) {
        closeAllMenus();
    }
});

// Evitar que los clics en los submenús cierren el menú principal
document.querySelectorAll('.submenu').forEach(submenu => {
    submenu.addEventListener('click', function(event) {
        event.stopPropagation();
    });
});


//Función para obtener el token generado en el login:
function getToken() {
    return localStorage.getItem('token');
}
//Fin de la función.

//URL constante de la API: 
const apiURL='https://libreriaety.somee.com/api/';
//Fin de la URL
//`${apiURL}Acceso/Login`,

//SweetAlert que me despliega un mensaje de error sobre si cerrar sesión o no:
function cerrarsesion(){
    Swal.fire({
        title: "¿Estás seguro?",
        text: "¡Estás a punto de cerrar sesión!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, cerrar sesión"
    }).then((result) => {
        if (result.isConfirmed) {
            logout();
        }
    });
}
//Fin de la función

//Función para cerrar sesión:
function logout() {
    // Eliminar el token del localStorage
    localStorage.removeItem('token');
    // Redirigir al login
    window.location.href = '../index.html'; 
}
//Fin de la función.

// Ocultar todas las secciones y mostrar solo la seleccionada
function showSection(seccion, loadDataFunction = null) {
    console.log("Mostrando sección: " + seccion);
   
    // Ocultar todos los contenedores
    const contenedores = [
        'seccionCompras', 'seccionUsuarios', 'seccionProveedores', 
        'contenedorProductos', 'seccionVentas', 'contenedorListaCompra', 
        'seccionCaja', 'buscador'
    ];
    
    contenedores.forEach(id => {
        document.getElementById(id).style.display = 'none';
    });

    // Mostrar la sección seleccionada
    var sectionToShow = document.getElementById(seccion);
    if (sectionToShow) {
        sectionToShow.style.display = 'block';
        
        // Si es la sección de productos, mostrar el buscador y preparar el contenedor de productos
        if (seccion === 'contenedorProductos') {
            const buscador = document.getElementById('buscador');
            const contenedorProductos = document.getElementById('contenedorProductos');
            
            // Mostrar el buscador
            buscador.style.display = 'block';
            
            // Limpiar y mostrar el contenedor de productos
            contenedorProductos.innerHTML = '';
            contenedorProductos.style.display = 'block';
            
            // Mover el contenedor de productos justo después del buscador
            buscador.parentNode.insertBefore(contenedorProductos, buscador.nextSibling);
        }
       
        // Si hay una función de carga de datos, se ejecuta
        if (loadDataFunction) {
            loadDataFunction();
        }
    } else {
        console.error("No se encontró la sección: " + seccion);
    }
}

//Fin de la función.

//Función para calcular el precio venta de un producto: 
function calculoPrecio(){
    // Obtener el precio compra
    var price = parseFloat(document.getElementById('cantidad').value);
    var select = document.getElementById('seleccion');
    var percentage = parseFloat(select.value);
 
    // Verificar que los valores sean válidos
    if (isNaN(price) || percentage === 0) {
        alert('Por favor, ingrese valores válidos para el precio y el porcentaje');
        return;
    }
 
    // Calcular el precio total
    var totalPrice = price * percentage;
    var total = price + totalPrice;
 
    // Mostrar el precio total en la página
    Swal.fire("El precio venta aproximado es de: " + total);
 
    // Limpiar los campos
    document.getElementById('cantidad').value = '';
    select.selectedIndex = 0; // Restablecer el select al valor por defecto
 }
 
//Fin del método

//Método para agregar productos: 
document.addEventListener('DOMContentLoaded', function() {
    // Obtener referencias a los elementos
    const btnAgregarProducto = document.getElementById('btnAgregarProducto');
    const modalProducto = new bootstrap.Modal(document.getElementById('modalproducto'));

    // Agregar evento de clic al botón
    btnAgregarProducto.addEventListener('click', function() {
        modalProducto.show();
    });
});

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM cargado y listo.');

    const modalProducto = document.getElementById('modalproducto');
    console.log('Modal encontrado:', modalProducto);

    const selectProveedor = document.getElementById('proveedor');
    console.log('Select de proveedores encontrado:', selectProveedor);
    
    modalProducto.addEventListener('show.bs.modal', cargarProveedores);
    
// Función para cargar proveedores
    async function cargarProveedores() {
        try {
        const token = getToken();
        if (!token) {
            throw new Error('No se encontró un token de autenticación');
        }
        const response = await fetch(`${apiURL}Proveedores/ver/proveedor`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            if (response.status === 401) {
                throw new Error('No autorizado. Por favor, inicie sesión nuevamente.');
            }
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const proveedores = await response.json();

        console.log('Proveedores recibidos:', proveedores);

        // Limpiar el select antes de agregar nuevas opciones
        const selectProveedor = document.getElementById('proveedor');
        selectProveedor.innerHTML = '<option selected disabled>Seleccione un proveedor</option>';

        // Llenar el select con los proveedores
        proveedores.forEach(proveedor => {
            const option = document.createElement('option');
            option.value = proveedor.idProveedor;
            option.textContent = proveedor.nombreProveedor;
            selectProveedor.appendChild(option);
        });

        console.log('Proveedores cargados correctamente en el select.');
    } catch (error) {
        console.error('Error al cargar los proveedores:', error);
        alert(error.message);
    }
    }

    // Función para agregar producto
    window.agregarproducto = async function() {
        const nombreProducto = document.getElementById('nombreproducto').value;
        const precioCompra = parseFloat(document.getElementById('precio1').value);
        const precioVenta = parseFloat(document.getElementById('precio2').value);
        const cantidadStock = parseInt(document.getElementById('cantidadstock').value);
        const unidadMedida = document.getElementById('unidadmedida').value;
        const idProveedor = parseInt(document.getElementById('proveedor').value);
    
        const producto = {
            IdProducto: 0,
            NombreProducto: nombreProducto,
            PrecioCompra: precioCompra,
            PrecioVenta: precioVenta,
            CantidadStock: cantidadStock,
            UnidadDeMedida: unidadMedida,
            EstadoDelProducto: 1,
            IdProveedor: idProveedor
        };
    
        try {
            const token = getToken();
            if (!token) {
                throw new Error('No se encontró un token de autenticación');
            }
    
            const response = await fetch('https://libreriaety.somee.com/api/SPProductos/crear/producto', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(producto)
            });
    
            const text = await response.text();
    
            if (!response.ok) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: `¡Error al registrar el producto! ${text}`, // El texto de error que viene del backend
                });
                return; // Detiene la ejecución del método si hubo un error
            }
    
            Swal.fire({
                title: "¡Excelente!",
                text: "¡Producto agregado con éxito!",
                icon: "success"
            });
    
            // Para cerrar el modal y limpiar el formulario
            const modalProducto = bootstrap.Modal.getInstance(document.getElementById('modalproducto'));
            modalProducto.hide();
            limpiarproducto();
    
        } catch (error) {
            console.error('Error en la solicitud:', error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `¡Error al agregar el producto! ${error.message}`, // Aquí se maneja cualquier error que no exista en el SP
            });
        }
    };

});
//Fin de la función.


//Para limpiar el formulario del modal:
function limpiarproducto(){
    document.getElementById('nombreproducto').value='';
    document.getElementById('precio1').value='';
    document.getElementById('precio2').value='';
    document.getElementById('cantidadstock').value='';
    document.getElementById('unidadmedida').value='';
    document.getElementById('proveedor').value='';
} 
//Fin de la función. 


// Función para apertura y cierre de caja:
async function cuadrecaja() {
    // Obtén el valor de lista de selección:
    let operacion = document.getElementById('operacion').value;

    // Validar que no se elija la opción en blanco
    if (operacion === "0") {
        Swal.fire({
            title: "Error",
            text: "Por favor, selecciona una operación antes de continuar.",
            icon: "error"
        });
        return; // Detener la ejecución de la función
    }

    // Obtener los valores de los campos del modal
    let dineroinicial = parseFloat(document.getElementById('dineroinicial').value);
    let dinerofinal = parseFloat(document.getElementById('dinerofinal').value);
    let observaciones = document.getElementById('observaciones').value;

    // Validar que los campos de dinero sean números válidos
    if (isNaN(dineroinicial) || isNaN(dinerofinal)) {
        Swal.fire({
            title: "Error",
            text: "Por favor, ingresa números para dinero inicial y dinero final.",
            icon: "error"
        });
        return;
    }

    // Creando el JSON que se enviará al backend    
    let data = {
        tipoOperacion: operacion,
        fechaYhora: new Date().toISOString(), // Fecha automática en formato ISO
        dineroInicial: dineroinicial,
        dineroFinal: dinerofinal,
        balanceDelDia: dinerofinal - dineroinicial, // Calcular el balance directamente
        observaciones: observaciones || "" // Asegurarse de que no sea null
    };

    //Aquí se obtiene el token antes de realizar la operación
    try {
        const token = getToken(); 
        if (!token) {
            throw new Error('No se encontró un token de autenticación');
        }
        const response = await fetch(`${apiURL}Caja/guardar`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            const result = await response.json();
            Swal.fire({
                title: "¡Éxito!",
                text: "Operación de caja guardada correctamente.",
                icon: "success"
            });
            limpiarcaja();
            console.log("Datos guardados:", result);
        } else {
            const errorText = await response.text();
            Swal.fire({
                title: "Error",
                text: `¡Ocurrió al guardar la operación de caja: ${errorText} !`,
                icon: "error"
            });
            limpiarcaja();
            console.error("Error en la solicitud:", errorText);
        }
    } catch (error) {
        Swal.fire({
            title: "Error",
            text: "¡No se pudo conectar con el servidor!",
            icon: "error"
        });
        limpiarcaja();
        console.error("Error:", error);
    }
}
// Fin de la función

//Para limpiar los valores de la función de caja: 
function limpiarcaja(){
    document.getElementById('operacion').value='';
    document.getElementById('dineroinicial').value='';
    document.getElementById('dinerofinal').value='';
    document.getElementById('observaciones').value='';
}
//Fin 

//Función para agregar un proveedor: 
async function guardarproveedor(){

    const proveedorname=document.getElementById('proveedorname').value;
    const telefono=document.getElementById('telefono').value;

    const data18={
         nombreProveedor: proveedorname,
         noTelefono: telefono
    }

    //Para obtener el token:
    try {
        const tokens = getToken(); 
        if (!tokens) {
            throw new Error('No se encontró un token de autenticación');
        }

        const response = await fetch(`${apiURL}Proveedores/ingresar/proveedor`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${tokens}`
            },
            body: JSON.stringify(data18)
        });

        if(response.ok){
            const result = await response.text(); // Cambiar a .text()  la respuesta
            Swal.fire({
                title: "¡Éxito!",
                text: result, // Muestra el mensaje de la respuesta
                icon: "success"
            });
            limpiarproveedor();
            console.log("Datos guardados:", result);
        } else {
            const errorText = await response.text();
            Swal.fire({
                title: "Error",
                text: `¡Ocurrió un error al guardar el proveedor!`,
                icon: "error"
            });
            limpiarproveedor();
            console.error("Error en la solicitud:", errorText);
        }
        


    } catch (error) {
        Swal.fire({
            title: "Error",
            text: "¡No se pudo conectar con el servidor!",
            icon: "error"
        });
    }
    
}
//Fin de la función.

//Para limpiar el modal de proveedores: 
function limpiarproveedor(){
    document.getElementById('proveedorname').value='';
    document.getElementById('telefono').value='';
} 

//Función para obtener los roles y listarlos
document.addEventListener("DOMContentLoaded", async function() {
    const rolSelect = document.getElementById("idRol");

    try {
        // Realizar una solicitud GET para obtener los roles
        const response = await fetch(`${apiURL}Rol/ver/rol`);
        const roles = await response.json();

        // Llenar el select con los roles obtenidos
        roles.forEach(rol => {
            const option = document.createElement("option");
            option.value = rol.idRol;  // El valor será el IdRol
            option.text = rol.nombreRol; // El texto visible será el NombreRol
            rolSelect.appendChild(option);
        });
    } catch (error) {
        console.error("Error al cargar los roles:", error);
    }
}); 

//Fin de la función.

//Función para registrar usuarios:
async function registrarse() {
    event.preventDefault();

    const nombreUsuario = document.getElementById('nombreUsuario').value;
    const contraseña = document.getElementById('contraseña').value;
    const correo = document.getElementById('correo').value;
    const idRol = document.getElementById('idRol').value;

    const usuarioDTO = {
        Nombre_usuario: nombreUsuario,
        Contraseña: contraseña,
        Correo_electronico: correo,
        Estado: 1,
        Id_rol: parseInt(idRol)
    };

    try {
        const tokens = getToken(); 
        if (!tokens) {
            throw new Error('No se encontró un token de autenticación');
        } 
        const response = await fetch(`${apiURL}Acceso/Registrarse`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${tokens}`
            },
            body: JSON.stringify(usuarioDTO)
        });

        if (response.ok) {
            const data = await response.json(); // Interpretar respuesta como JSON.
            Swal.fire({
                title: "¡Excelente!",
                text: "¡Usuario guardado con éxito!",
                icon: "success"
            });
            limpiarFormulario();
        } else {
            // Manejar el caso de errores
            let errorData = {};
            try {
                errorData = await response.json(); // Tratar de leer la respuesta como JSON
            } catch (e) {
                console.error("Error al interpretar la respuesta como JSON:", e);
            }

            const errorMessage = errorData.message || "Error desconocido al registrar el usuario";
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `¡Error al registrar el usuario! ${errorMessage}`,
            });
        }
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "¡Error al registrar el usuario! Por favor, inténtelo más tarde.",
        });
        console.error("Error en la solicitud:", error);
    }
}
//Fin de la función.

function limpiarFormulario() {
    document.getElementById('registroForm').reset();
}
 

//Para ver los productos en stock: 

// Función para mostrar los productos en el contenedor con opción de registrar venta
function mostrarProductos(productos) {
    const contenedor = document.getElementById('contenedorProductos');
    
    if (!contenedor) {
        throw new Error("El contenedor de productos no se encontró.");
    }

    contenedor.innerHTML = ''; // Limpiar el contenedor antes de agregar nuevos productos
    
    // Fijamos la posición de desplazamiento actual para evitar que cambie
    const currentScrollPos = window.pageYOffset;

    productos.forEach(producto => {
        const card = document.createElement('div');
        card.classList.add('card', 'text-bg-danger', 'mb-3');
        card.style.maxWidth = '18rem';

        card.innerHTML = `
            <div class="card-header">${producto.nombreProducto}</div>
            <div class="card-body">
                <h5 class="card-title">Precio Compra: Q${producto.precioCompra}</h5>
                <p class="card-text">Precio Venta: Q${producto.precioVenta}</p>
                <p class="card-text">Stock: ${producto.cantidadStock} ${producto.unidadDeMedida}(es)</p>
                <button class="btn btn-primary" onclick="abrirModalVenta(${producto.idProducto}, '${producto.nombreProducto}', ${producto.precioVenta})">Registrar Venta</button>
                <button class="btn btn-secondary" onclick="abrirModalCompra(${producto.idProducto}, '${producto.nombreProducto}', ${producto.precioCompra})">Registrar Compra</button>
            </div>
        `;

        contenedor.appendChild(card);
    });
    
    // Restauramos la posición de desplazamiento
    window.scrollTo(0, currentScrollPos);
}


// Función para obtener y mostrar los productos en base al nombre del buscador:
document.addEventListener('DOMContentLoaded', function() {
    // Solo configurar el evento del botón de búsqueda cuando la página esté cargada
    document.getElementById('buscarProductoBtn').addEventListener('click', function () {
        const nombreProducto = document.getElementById('buscarNombreProducto').value.trim();
        verProductos(nombreProducto);
    });
});

// Mostrar el buscador al hacer clic en "Ver productos en stock"
// Función para mostrar el buscador de productos
function mostrarBuscador() {
    const buscadorDiv = document.getElementById('buscador');
    const contenedorProductos = document.getElementById('contenedorProductos');
    
    if (buscadorDiv && contenedorProductos) {
        // Mostrar el buscador
        buscadorDiv.style.display = 'block';
        
        // Mostrar el contenedor de productos debajo del buscador, pero vacío inicialmente
        contenedorProductos.style.display = 'block';
        contenedorProductos.innerHTML = ''; // Limpiar el contenedor de productos
    } else {
        console.warn('El buscador o el contenedor de productos no fue encontrado en el DOM.');
    }
}


// Añadir evento al botón de buscar para ejecutar la búsqueda al hacer clic
document.getElementById('buscarProductoBtn').addEventListener('click', function (event) {
    event.preventDefault();  // Prevenir el comportamiento predeterminado (como scroll)
    
    const nombreProducto = document.getElementById('buscarNombreProducto').value.trim();
    
    // Llamar a la función verProductos para realizar la búsqueda
    verProductos(nombreProducto);
});


// Función para obtener y mostrar los productos en base al nombre ingresado en el buscador
async function verProductos(nombreProducto = "") {
    try {
        // Obtenemos el token de autenticación
        const tokens = getToken();
        
        // Si no se encuentra un token, lanzamos un error
        if (!tokens) {
            throw new Error('No se encontró un token de autenticación');
        }

        // Construimos la URL de la API, agregando el nombre de producto si se proporcionó 
        let url = `${apiURL}Producto/Listar/productos`;
        if (nombreProducto) {
            url += `?nombre=${encodeURIComponent(nombreProducto)}`;
        }

        // Realizamos la solicitud a la API para obtener los productos
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${tokens}`
            }
        });

        // Si la respuesta no es exitosa, lanzamos un error
        if (!response.ok) {
            throw new Error('Error al obtener productos');
        }

        // Convertimos la respuesta en JSON
        const productos = await response.json();

        // Mostramos los productos llamando a la función mostrarProductos
        mostrarProductos(productos);
    } catch (error) {
        // Si hay algún error, lo mostramos en la consola y en un alert
        console.error(error);
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `¡Error al obtener productos! ${error.message}`,
          });
    }
}

// Mostrar buscador al cargar la página, pero sin listar productos inicialmente
document.addEventListener('DOMContentLoaded', function () {
    // Limpiamos cualquier contenido previo del contenedor de productos
    document.getElementById('contenedorProductos').innerHTML = '';
});

//Fin de la Función.





// Función para abrir el modal de registro de venta
function abrirModalVenta(idProducto, nombreProducto, precioVenta) {
    // Obtener el modal por su ID
    const modal = document.getElementById('modalRegistrarVenta');
    
    if (modal) {
        // Mostrar el modal
        modal.style.display = 'block';
        
        // Configurar el nombre del producto en el modal
        document.getElementById('modalProductoNombre').textContent = nombreProducto;
        
        // Limpiar el campo de cantidad en el modal
        document.getElementById('modalCantidad').value = '';
        
        // Mostrar el precio de venta en el modal
        document.getElementById('modalPrecioVenta').textContent = `Precio Venta: Q${precioVenta}`;
        
        // Configurar el botón para agregar el producto al carrito al hacer clic
        document.getElementById('btnConfirmarVenta').onclick = function() {
            agregarProductoAlCarrito(idProducto);  // Llama a la función para agregar el producto al carrito
        };
    }
}


// Array para almacenar los productos seleccionados para la venta
let carritoVentas = [];


// Agregar el precio de venta al producto al carrito
function agregarProductoAlCarrito(idProducto) {
    const productoNombre = document.getElementById('modalProductoNombre').innerText;
    const cantidad = parseFloat(document.getElementById('modalCantidad').value);
    const unidadMedida = 'Unidad'; 
    const precioVenta = parseFloat(document.getElementById('modalPrecioVenta').textContent.replace('Precio Venta: Q', '')); // Extrae el precio desde el modal

    if (isNaN(cantidad) || cantidad <= 0) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Debe ingresar una cantidad válida.",
        });
        return;
    }

    const productoEnCarrito = carritoVentas.find(p => p.idProducto === idProducto);

    if (productoEnCarrito) {
        productoEnCarrito.cantidad += cantidad;
    } else {
        carritoVentas.push({ 
            idProducto, 
            nombre: productoNombre, 
            cantidad, 
            unidadDeMedida: unidadMedida, 
            precioVenta  // Utiliza el precio directamente del modal
        });
    }

    const fila = `
        <tr data-id-producto="${idProducto}">
            <td>${productoNombre}</td>
            <td>${cantidad}</td>
            <td>${unidadMedida}</td>
            <td>Q${precioVenta}</td>  <!-- Muestra el precio en la tabla -->
        </tr>
    `;
    document.querySelector('#tablaCarrito tbody').insertAdjacentHTML('beforeend', fila);

    document.getElementById('modalRegistrarVenta').style.display = 'none';

    Swal.fire({
        icon: "success",
        title: "¡Producto añadido!",
        text: `Producto añadido al carrito con éxito.`,
    });
}

// Función para cerrar el modal
function cerrarModal() {
    const modal = document.getElementById('modalRegistrarVenta');
    if (modal) {
        modal.style.display = 'none';  // Ocultar el modal
    }
}

// Función para mostrar el carrito de ventas cuando se selecciona "Crear venta"
document.addEventListener('DOMContentLoaded', function() {
    const crearVentaLink = document.getElementById('crearVentaLink');
    if (crearVentaLink) {
        crearVentaLink.addEventListener('click', function(e) {
            e.preventDefault();
            mostrarCarritoDeVentas(); // Llamamos directamente a esta función
        });
    }
});

let productos = [];  // Array para almacenar productos seleccionados para la venta

// Función para mostrar los productos agregados al carrito en la tabla
function mostrarCarritoDeVentas() {
    const contenedorCarrito = document.getElementById('carritoDeVentas');
    const tablaCarrito = document.getElementById('tablaCarrito').querySelector('tbody');

    // Limpiar la tabla de productos del carrito
    tablaCarrito.innerHTML = '';

    // Si el carrito está vacío, mostrar mensaje de información
    if (carritoVentas.length === 0) {
        Swal.fire({
            icon: "info",
            title: "Carrito vacío",
            text: "No hay productos en el carrito.",
        });
        return;
    }

    // Recorrer los productos del carrito y mostrarlos en la tabla
    carritoVentas.forEach(producto => {
        const fila = document.createElement('tr');
        fila.setAttribute('data-id-producto', producto.idProducto);
        fila.innerHTML = `
            <td>${producto.nombre}</td>
            <td>${producto.cantidad}</td>
            <td>${producto.unidadDeMedida}</td>
        `;
        tablaCarrito.appendChild(fila);
    });

    // Verificar si el botón "Vaciar Carrito" ya existe para no añadirlo de nuevo
    if (!document.getElementById('vaciarCarrito')) {
        const vaciarCarritoBtn = document.createElement('button');
        vaciarCarritoBtn.id = 'vaciarCarrito';
        vaciarCarritoBtn.className = 'btn btn-danger';
        vaciarCarritoBtn.textContent = 'Vaciar Carrito';
        vaciarCarritoBtn.onclick = vaciarCarritoVentas; // Conecta el botón con la función de vaciar

        // Añadir el botón al contenedor del carrito, justo debajo del botón "Realizar Venta"
        contenedorCarrito.appendChild(vaciarCarritoBtn);
    }

    // Mostrar el contenedor del carrito
    contenedorCarrito.style.display = 'block';
}

function vaciarCarritoVentas() {
    // Vaciar el array del carrito
    carritoVentas = [];
    
    // Limpiar la tabla del carrito
    document.querySelector('#tablaCarrito tbody').innerHTML = '';
    
    // Ocultar el contenedor del carrito de ventas
    document.getElementById('carritoDeVentas').style.display = 'none';
    
    // Mostrar un mensaje de confirmación
    Swal.fire({
        icon: "success",
        title: "Carrito vaciado",
        text: "El carrito de ventas ha sido vaciado con éxito.",
    });
}


// Función para manejar la lógica de almacenamiento de productos en arrays
function arrayProducto(id, cantidad, unidadDeMedida) {
    // Busca si el producto ya está en el array
    let productoExistente = productos.find(producto => producto.id === id);

    if (productoExistente) {
        // Si ya existe, actualiza la cantidad
        productoExistente.cantidadProducto += cantidad;
    } else {
        // Si no existe, agrégalo al array
        productos.push({ idProducto: id, cantidadProducto: cantidad, unidadDeMedida: unidadDeMedida });
    }

    // También sincroniza con el carrito si es necesario
    let itemCarrito = carritoVentas.find(item => item.id === id);
    if (itemCarrito) {
        itemCarrito.cantidad += cantidad;
    } else {
        carritoVentas.push({ idProducto, nombre: productoNombre, cantidadVendida: cantidad, precioVenta: precioVenta });

    }
}

// Función para calcular el total de la venta basada en los productos del carrito
function calcularTotal() {
    return carritoVentas.reduce((total, producto) => {
        return total + (producto.cantidad * producto.precioVenta);  // Asegúrate de sumar "cantidad" y "precioVenta"
    }, 0);
}

// Función para realizar la venta enviando los productos al backend
function realizarVenta() {
    // Verificar si el carrito está vacío
    if (carritoVentas.length === 0) {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "No hay productos en el carrito.",
        });
        return;
    }

    // Mapear el carrito de productos al formato requerido por el backend
    productos = carritoVentas.map(producto => ({
        idProducto: producto.idProducto,  // Aquí el ID se extrae del carrito
        cantidadProducto: producto.cantidad,
        unidadDeMedida: producto.unidadDeMedida
    }));

    console.log("Carrito de ventas antes de calcular el total:", carritoVentas);
    
    let totalVendido = calcularTotal();
    console.log("Total calculado:", totalVendido);
    
    if (!totalVendido || totalVendido === 0) {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "El total de la venta no puede ser cero o vacío."
        });
        return;
    }

    // Construir el objeto de la venta
    let venta = {
        fechaVendida: new Date().toISOString(),
        totalVendido: totalVendido,  // Asegúrate de que no sea nulo
        descripcionVenta: "Descripción de la venta",
        productos: productos
    };

    // Obtener el token de autenticación
    const tokens = getToken();  // Suponiendo que tienes una función getToken() para obtener el token
    
    // Verificar si se encontró el token
    if (!tokens) {
        throw new Error('No se encontró un token de autenticación');
    }

    console.log("Datos de la venta enviados:", JSON.stringify(venta, null, 2)); // Para depuración

    // Enviar la solicitud al backend
    fetch(`${apiURL}ventas/agregar/venta`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokens}`
        },
        body: JSON.stringify(venta)
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(errorInfo => Promise.reject(errorInfo));
        }
        return response.text();
    })
    .then(data => {
        console.log("Venta registrada:", data);
        Swal.fire({
            icon: "success",
            title: "¡Su venta ha sido exitosa!",
            text: `¡Venta registrada exitosamente!`,
        });
          // Limpiar el carrito y los productos
            carritoVentas = [];
            productos = [];

  
          // Ocultar el carrito de ventas
          document.getElementById('carritoDeVentas').style.display = 'none';
        
    })
    .catch(error => {
        console.error("Error al realizar la venta:", error);
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Error al realizar la venta: " + (error.title || error.message),
        });
    });
}






// Función para abrir el modal de registro de compra
function abrirModalCompra(idProducto, nombreProducto, precioCompra) {
    const modal = document.getElementById('modalRegistrarCompra');
    
    if (modal) {
        // Mostrar el modal
        modal.style.display = 'block';
        // Establecer el nombre del producto en el modal
        document.getElementById('modalProductoNombreCompra').textContent = nombreProducto;
        // Limpiar el campo de cantidad
        document.getElementById('modalCantidadCompra').value = '';
        // Mostrar el precio de compra en el modal
        document.getElementById('modalPrecioCompra').textContent = `Precio Compra: Q${precioCompra}`;
        
        // Configurar el botón de confirmación para agregar el producto al carrito
        document.getElementById('btnConfirmarCompra').onclick = function() {
            agregarProductoAlCarritoCompras(idProducto, precioCompra);
        };
    }
}

// Función para cerrar el modal de registro de compra
function cerrarModalCompra() {
    const modal = document.getElementById('modalRegistrarCompra');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Array para almacenar los productos seleccionados para la compra
let carritoCompras = [];
 

// Función para agregar un producto al carrito de compras
function agregarProductoAlCarritoCompras(idProducto, precioCompra) {
    const productoNombre = document.getElementById('modalProductoNombreCompra').innerText;
    const cantidad = parseFloat(document.getElementById('modalCantidadCompra').value);

    if (isNaN(cantidad) || cantidad <= 0) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Debe ingresar una cantidad válida.",
        });
        return;
    }

    const fila = `
        <tr data-id-producto="${idProducto}">
            <td>${productoNombre}</td>
            <td>${cantidad}</td>
            <td>Q${precioCompra}</td>
        </tr>
    `;
    
    document.querySelector('#tablaCarritoCompras tbody').insertAdjacentHTML('beforeend', fila);

    const productoEnCarrito = carritoCompras.find(p => p.idProducto === idProducto);

    if (productoEnCarrito) {
        productoEnCarrito.cantidadComprado += cantidad;
        productoEnCarrito.precioCompra = precioCompra;
    } else {
        carritoCompras.push({ idProducto, nombre: productoNombre, cantidadComprado: cantidad, precioCompra: precioCompra });
    }

    document.getElementById('modalRegistrarCompra').style.display = 'none';

    Swal.fire({
        icon: "success",
        title: "¡Producto añadido!",
        text: `Producto añadido al carrito de compras con éxito.`,
    });
}

// Mostrar el carrito de compras solo cuando se hace clic en "Crear compra"
document.addEventListener('DOMContentLoaded', function() {
    const crearCompraLink = document.getElementById('crearCompraLink');
    if (crearCompraLink) {
        crearCompraLink.addEventListener('click', function(e) {
            e.preventDefault();
            if (typeof toggleMenu === 'function') {
                toggleMenu(this, 'submenu-compras');
            }
            if (carritoCompras.length === 0) {
                Swal.fire({
                    icon: "info",
                    title: "Carrito vacío",
                    text: "No hay productos en el carrito de compras.",
                });
            } else {
                mostrarCarritoDeCompras(); // Mostrar el carrito solo cuando se hace clic en "Crear compra"
            }
        });
    }

    const btnRegistrarCompra = document.getElementById('btnRegistrarCompra');
    const btnVaciarCarrito = document.getElementById('btnVaciarCarrito');
    if (btnRegistrarCompra) {
        btnRegistrarCompra.addEventListener('click', realizarCompra);
    } else {
        console.log("El botón de 'Registrar Compra' no se encontró en el DOM.");
    }

    // Listener para el botón de "Vaciar Carrito"
    if (btnVaciarCarrito) {
        btnVaciarCarrito.addEventListener('click', vaciarCarrito);
    }
});

// Función para realizar la compra enviando los productos al backend
function realizarCompra() {
    if (carritoCompras.length === 0) {
        Swal.fire({
            icon: "error",
            title: "Carrito vacío",
            text: "No hay productos en el carrito de compras.",
        });
        return;
    }

    let productosCompra = carritoCompras.map(producto => ({
        idProducto: producto.idProducto,
        cantidadComprado: producto.cantidadComprado,
        precioCompra: producto.precioCompra
    }));

    let compra = {
        fechaDeCompra: new Date().toISOString(),
        totalDeLaCompra: calcularTotalCompra(),
        descripcionCompra: "Descripción de la compra",
        idProveedor: 1, // Asegúrate de obtener el ID del proveedor correctamente
        productos: productosCompra
    };

    const tokens = getToken();
    
    if (!tokens) {
        Swal.fire({
            icon: "error",
            title: "Error de autenticación",
            text: "No se encontró un token de autenticación",
        });
        return;
    }

    console.log("Datos de la compra enviados:", JSON.stringify(compra, null, 2));
    //Solicitud al backend:  
    fetch(`${apiURL}Compras/insertar/compra`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokens}`
        },
        body: JSON.stringify(compra)
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(errorInfo => Promise.reject(errorInfo));
        }
        return response.text();
    })
    .then(data => {
        console.log("Compra registrada:", data);
        Swal.fire({
            icon: "success",
            title: "¡Su compra ha sido exitosa!",
            text: `¡Compra registrada exitosamente!`,
        });
        carritoCompras = [];
        ocultarCarritoDeCompras(); // Ocultar el carrito después de registrar la compra
    })
    .catch(error => {
        console.error("Error al realizar la compra:", error);
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Error al realizar la compra: " + (error.title || error.message),
        });
    });
}

// Función para vaciar el carrito de compras
function vaciarCarrito() {
    carritoCompras = [];
    document.querySelector('#tablaCarritoCompras tbody').innerHTML = ''; // Limpiar la tabla del carrito
    ocultarCarritoDeCompras(); // Ocultar el carrito después de vaciarlo
    Swal.fire({
        icon: "success",
        title: "Carrito vaciado",
        text: "El carrito de compras ha sido vaciado con éxito.",
    });
}

// Función para ocultar el carrito de compras
function ocultarCarritoDeCompras() {
    const contenedorCarrito = document.getElementById('carritoDeCompras');
    const btnRegistrarCompra = document.getElementById('btnRegistrarCompra');
    const btnVaciarCarrito = document.getElementById('btnVaciarCarrito');
    
    contenedorCarrito.style.display = 'none';
    btnRegistrarCompra.style.display = 'none';
    btnVaciarCarrito.style.display = 'none';
}

// Función para mostrar el carrito de compras
function mostrarCarritoDeCompras() {
    const contenedorCarrito = document.getElementById('carritoDeCompras');
    const tablaCarrito = document.getElementById('tablaCarritoCompras');
    const tbody = tablaCarrito.querySelector('tbody');
    const btnRegistrarCompra = document.getElementById('btnRegistrarCompra');
    const btnVaciarCarrito = document.getElementById('btnVaciarCarrito');

    // Limpiar el contenido actual de la tabla
    tbody.innerHTML = '';

    // Verificar si el carrito está vacío al mostrar el carrito
    if (carritoCompras.length === 0) {
        contenedorCarrito.style.display = 'none';
        btnRegistrarCompra.style.display = 'none';
        btnVaciarCarrito.style.display = 'none';
        return; // Salir de la función para que no se muestre el carrito
    }

    // Agregar cada producto del carrito a la tabla
    carritoCompras.forEach(producto => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${producto.nombre}</td>
            <td>${producto.cantidadComprado}</td>
            <td>Q${producto.precioCompra}</td>
        `;
        tbody.appendChild(fila);
    });

    // Mostrar el contenedor del carrito, la tabla y el botón de registrar compra
    contenedorCarrito.style.display = 'block';
    tablaCarrito.style.display = 'table';
    btnRegistrarCompra.style.display = 'block';
    btnVaciarCarrito.style.display = 'block'; // Mostrar el botón de "Vaciar Carrito"
}

// Función para calcular el total de la compra
function calcularTotalCompra() {
    return carritoCompras.reduce((total, producto) => {
        return total + (producto.cantidadComprado * producto.precioCompra);
    }, 0);
}



// Función para cambiar el número de teléfono de un proveedor
async function cambiarTelefonoProveedor(idProveedor, nuevoTelefono) {
    try {
        const tokens = getToken(); // Asumiendo que tienes una función getToken() implementada
        
        if (!tokens) {
            throw new Error('No se encontró un token de autenticación');
        }
        
        // Obtener la información actual del proveedor desde la card
        const cardProveedor = document.querySelector(`[data-id="${idProveedor}"]`).closest('.card');
        const nombreProveedor = cardProveedor.querySelector('.card-title').textContent.split(': ')[1];
        
        const url = `${apiURL}Proveedores/actualizar/telefono`;
        
        const proveedorData = {
            idProveedor: parseInt(idProveedor),
            nombreProveedor: nombreProveedor,
            noTelefono: nuevoTelefono
        };
        
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${tokens}`
            },
            body: JSON.stringify(proveedorData)
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error al cambiar el número de teléfono');
        }
        
        const resultado = await response.text();
        
        // Actualizar la UI
        document.getElementById(`telefono-${idProveedor}`).textContent = nuevoTelefono;
        
        // Mostrar mensaje de éxito
        Swal.fire({
            icon: 'success',
            title: '¡Éxito!',
            text: resultado
        });
        
        limpiarnumerotelefono();
        // Cerrar el modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('cambiarTelefonoModal'));
        modal.hide();
        
    } catch (error) {
        console.error('Error:', error);
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `Error al cambiar el número de teléfono: ${error.message}`
        });
    }
}

// Event listener para el botón de guardar cambios
document.getElementById('guardarTelefonoBtn').addEventListener('click', function() {
    const idProveedor = this.getAttribute('data-id-proveedor');
    const nuevoTelefono = document.getElementById('nuevoTelefono').value;
    
    if (nuevoTelefono) {
        cambiarTelefonoProveedor(idProveedor, nuevoTelefono);
    } else {
        Swal.fire({
            icon: 'warning',
            title: 'Campo vacío',
            text: 'Por favor, ingresa un nuevo número de teléfono.'
        });
    }
        // Eliminar el aria-hidden después de cerrar el modal
        const modalElement = document.getElementById('cambiarTelefonoModal');
        modalElement.removeAttribute('aria-hidden');
});

// Event listener para los botones "Cambiar número de teléfono"
document.addEventListener('click', function(e) {
    if (e.target && e.target.matches('button[data-bs-toggle="modal"][data-bs-target="#cambiarTelefonoModal"]')) {
        const idProveedor = e.target.getAttribute('data-id');
        document.getElementById('guardarTelefonoBtn').setAttribute('data-id-proveedor', idProveedor);
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // Event listener para el botón de guardar cambios
    document.getElementById('guardarTelefonoBtn').addEventListener('click', function() {
        const idProveedor = this.getAttribute('data-id-proveedor');
        const nuevoTelefono = document.getElementById('nuevoTelefono').value;
        
        if (nuevoTelefono) {
            cambiarTelefonoProveedor(idProveedor, nuevoTelefono);
        } else {
            Swal.fire({
                icon: 'warning',
                title: 'Campo vacío',
                text: 'Por favor, ingresa un nuevo número de teléfono.'
            });
        }
    });

    // Event listener para los botones "Cambiar número de teléfono"
    document.addEventListener('click', function(e) {
        if (e.target && e.target.matches('button[data-bs-toggle="modal"][data-bs-target="#cambiarTelefonoModal"]')) {
            const idProveedor = e.target.getAttribute('data-id');
            document.getElementById('guardarTelefonoBtn').setAttribute('data-id-proveedor', idProveedor);
        }
    });
        // Eliminar el aria-hidden después de cerrar el modal
        const modalElement = document.getElementById('cambiarTelefonoModal');
        modalElement.removeAttribute('aria-hidden');
}); 



//Función para limpiar el modal luego de un insert: 
function limpiarnumerotelefono(){
    document.getElementById('nuevoTelefono').value='';
}
//Fin de la función
