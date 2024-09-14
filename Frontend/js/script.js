


function prueba2(){
    Swal.fire({
    title: "¡Excelente!",
    text: "¡Sesión iniciada con éxito!",
    icon: "success"
    });
    console.log("Sesión iniciada con éxito")
}



/*Método para el login:*/
//Esto evita que se envíe por defecto el formulario del login
document.addEventListener('DOMContentLoaded', function(){
const loginForm=document.getElementById('loginForm');
loginForm.addEventListener('submit', function(e){
    e.preventDefault();
    loginForm();
});
});

//URL constante de la API: 
const apiURL='https://libreriaety.somee.com/api/';
//Fin de la URL
//`${apiURL}Acceso/Login`,

// Función para el login:
function login() {
    // Obtener los valores ingresados por el usuario en los campos de nombre de usuario y contraseña:
    const nombreuser = document.getElementById('nombreuser').value;
    const password = document.getElementById('password').value;

    // Crear un objeto con los datos de inicio de sesión para enviarlos en formato JSON:
    const loginData = {
        Nombre_usuario: nombreuser, // Asigna el nombre de usuario al objeto
        Contraseña: password         // Asigna la contraseña al objeto
    };

    // Realizar una solicitud POST a la API para autenticar al usuario:
    fetch(`${apiURL}Acceso/Login`, {
        method: 'POST',             // Método HTTP para enviar datos
        headers: {
            'Content-Type': 'application/json',  // Especifica que los datos se envían en formato JSON
        },
        body: JSON.stringify(loginData)  // Convierte el objeto de datos en una cadena JSON para enviarlo en la solicitud
    })
    .then(response => response.json())  // Convertir la respuesta en formato JSON
    .then(data => {
        // Si la autenticación es exitosa:
        if (data.isSuccess) {
            // Mostrar una animación de inicio de sesión exitoso con un temporizador:
            let timerInterval;
            Swal.fire({
                title: "¡Inicio de sesión correcto!", // Mensaje de éxito
                html: "Iniciando sesión en <b></b> milisegundos.", // Contenido dinámico que muestra el tiempo restante
                timer: 2000,  // Duración de la animación (2 segundos)
                timerProgressBar: true, // Muestra una barra de progreso junto al temporizador
                didOpen: () => {
                    // Mostrar el temporizador en tiempo real durante la animación:
                    Swal.showLoading();
                    const timer = Swal.getPopup().querySelector("b");
                    timerInterval = setInterval(() => {
                        timer.textContent = `${Swal.getTimerLeft()}`; // Actualiza el contenido con el tiempo restante
                    }, 100);
                },
                willClose: () => {
                    // Limpiar el intervalo del temporizador cuando se cierre la animación:
                    clearInterval(timerInterval);
                }
            }).then((result) => {
                // Después de que el temporizador termine, redirigir al dashboard:
                if (result.dismiss === Swal.DismissReason.timer) {
                    console.log("I was closed by the timer"); // Mensaje de registro en la consola
                    window.location.href = 'html/dashboard.html'; // Redirección al dashboard
                }
            });

            // Guardar el token de autenticación en el almacenamiento local del navegador:
            localStorage.setItem('token', data.token);
            //Guardar el nombre de usuario que se acaba de loguear
            localStorage.setItem('nombreUsuario', nombreuser); // Guarda el nombre de usuario


        } else {
            // Si la autenticación falla, mostrar un mensaje de error con SweetAlert:
            Swal.fire({
                icon: "error",  // Icono de error
                title: "Oops...",  // Título del mensaje
                text: 'Error de inicio de sesión: ' + (data.message || 'Credenciales inválidas'), // Muestra el mensaje de error devuelto por la API o un mensaje genérico
            });
            console.error('Error de login:', data.message); // Registro del error en la consola para depuración
        }
    });

    // Limpiar el formulario de inicio de sesión (esto es opcional, pero útil para UX):
    limpiar();
}
// Fin de la función login

//Función para limpiar el formulario:
function limpiar(){
    document.getElementById('nombreuser').value='';
    document.getElementById('password').value='';
}
//Fin del método.



//Para limpiar usuario 2:
function limpiar2(){
    document.getElementById('nombre').value='';
    document.getElementById('correos').value='';
}
//Fin.

//Método para recuperar contraseña: 
async function recuperarmodal(){
    //Obteniendo los valores del modal: 
   const nombreUsuario= document.getElementById('nombre').value;
    const correoElectronico=document.getElementById('correos').value;
    //Objeto que guardará los datos: 
    const recuperarDTO={
        nombreUsuario: nombreUsuario,
        correoElectronico: correoElectronico
    };
    try{
        const response= await fetch(`${apiURL}RecuperarPassword/recuperar/contraseña`,{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(recuperarDTO)
        });
        //Si la solicitud fue exitosa: 
        if(response.ok){
            const mensaje= await response.text(); //Respuesta que da el backend 
            Swal.fire({
                title: "¡Excelente!",
                text: "¡Se le enviará un correo con su nueva contraseña dentro de 1 hora!",
                icon: "success"
                });
                console.log(mensaje);
        }else{ //Mensajes de error del backend
            const errorData = await response.text();
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `¡Error al recuperar la contraseña! ${errorData}`,
            });
        }
    }catch(error){ //Error que no está en el backend
        console.error('Hubo un problema con la solicitud:', error);
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: 'Ocurrió un error al intentar recuperar la contraseña.',
        });
    }
        //Para limpiar el formulario:
        limpiar2();
}
//Fin del método.


