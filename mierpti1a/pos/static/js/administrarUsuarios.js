document.addEventListener("DOMContentLoaded", () => {
    // Oculta las alertas después de 3 segundos
    setTimeout(function() {
        var alertElements = document.querySelectorAll('.alert-dismissible');
        alertElements.forEach(function(alertElement) {
            var bootstrapAlert = new bootstrap.Alert(alertElement);
            bootstrapAlert.close();
        });
    }, 3000); 

    // Configura el modal de agregar/editar cuando se muestra
    document.getElementById("staticBackdrop").addEventListener('shown.bs.modal', (e) => {
        let operacion = e.relatedTarget.innerText;
        e.target.querySelector(".modal-title").innerText = operacion;
    });

    // Configura el modal de agregar/editar cuando se oculta
    document.getElementById("staticBackdrop").addEventListener('hidden.bs.modal', limpiarDatos);

    document.getElementById("modalNombre").onkeyup = e =>{
        let txtNombre = document.getElementById("modalNombre");
        if (txtNombre.value.trim().length < 10 || txtNombre.value.trim().length > 50 || !/[A-Za-z]/.test(txtNombre.value)) {
            txtNombre.setCustomValidity("El nombre es obligatorio y debe tener entre 10 y 50 caracteres.");
        }
        if ( /[\'"`]/.test(txtNombre.value)) {
            txtNombre.setCustomValidity("Estas intentando agregar un caracter que no esta permitido");
        }
        else{
            txtNombre.setCustomValidity("");
        }
    };

    document.getElementById("modalUsuario").onkeyup = e =>{
        let txtUsuario = document.getElementById("modalUsuario");
        if (txtUsuario.value.trim().length < 5 || txtUsuario.value.trim().length > 30) {
            txtUsuario.setCustomValidity("El usuario es obligatorio y debe tener entre 5 y 30 caracteres.");
        }
        if ( /[\'"`]/.test(txtUsuario.value)) {
            txtUsuario.setCustomValidity("Estas intentando agregar un caracter que no esta permitido");
        }
        else{
            txtUsuario.setCustomValidity("");
        }
    };

    document.getElementById("modalTelefono").onkeyup = e =>{
        let txtTelefono = document.getElementById("modalTelefono");
        if (txtTelefono.value.trim().length != 10 || !/^\d{10}$/.test(txtTelefono.value)) {
            txtTelefono.setCustomValidity("El teléfono es obligatorio y debe tener 10 dígitos.");
        }
        if ( /[\'"`]/.test(txtTelefono.value)) {
            txtTelefono.setCustomValidity("Estas intentando agregar un caracter que no esta permitido");
        }
        else{
            txtTelefono.setCustomValidity("");
        }
    };

    document.getElementById("modalPassword").onkeyup = e =>{
        let txtPassword = document.getElementById("modalPassword");
        if (txtPassword.value.trim().length < 8 && txtPassword.hasAttribute('required')) {
            txtPassword.setCustomValidity("La contraseña es obligatoria y debe tener al menos 8 caracteres.");
        }
        if ( /[\'"`]/.test(txtPassword.value)) {
            txtPassword.setCustomValidity("Estas intentando agregar un caracter que no esta permitido");
        }
        else{
            txtPassword.setCustomValidity("");
        }
    };

    document.getElementById("modalCaja").onkeyup = e =>{
        let txtCaja = document.getElementById("modalCaja");
        if (isNaN(txtCaja.value) || txtCaja.value < 0) {
            txtCaja.setCustomValidity("Por favor, ingrese un número válido para la caja.");
        }
        if ( /[\'"`]/.test(txtCaja.value)) {
            txtCaja.setCustomValidity("Estas intentando agregar un caracter que no esta permitido");
        }
        else{
            txtCaja.setCustomValidity("");
        }
    };

     // Validar y enviar el formulario
     document.getElementById("usuarioForm").addEventListener("submit", function(e) {
        e.preventDefault(); // Evita el envío predeterminado del formulario
        let form = e.target;
        let txtNombre = document.getElementById("modalNombre");
        let txtUsuario = document.getElementById("modalUsuario");
        let txtTelefono = document.getElementById("modalTelefono");
        let txtPassword = document.getElementById("modalPassword");
        let txtCaja = document.getElementById("modalCaja");

        // Reset custom validity
        txtNombre.setCustomValidity("");
        txtUsuario.setCustomValidity("");
        txtTelefono.setCustomValidity("");
        txtPassword.setCustomValidity("");
        txtCaja.setCustomValidity("");

        // Validación personalizada
        if (txtNombre.value.trim().length < 10 || txtNombre.value.trim().length > 50) {
            txtNombre.setCustomValidity("El nombre es obligatorio y debe tener entre 10 y 50 caracteres.");
        }
        if ( /[\'"]/.test(txtNombre.value)) {
            txtNombre.setCustomValidity("Estas intentando agregar un caracter que no esta permitido");
        }
        if (txtUsuario.value.trim().length < 5 || txtUsuario.value.trim().length > 30) {
            txtUsuario.setCustomValidity("El usuario es obligatorio y debe tener entre 5 y 30 caracteres.");
        }
        if ( /[\'"`]/.test(txtUsuario.value)) {
            txtUsuario.setCustomValidity("Estas intentando agregar un caracter que no esta permitido");
        }
        if (txtTelefono.value.trim().length != 10 || !/^\d{10}$/.test(txtTelefono.value)) {
            txtTelefono.setCustomValidity("El teléfono es obligatorio y debe tener 10 dígitos.");
        }
        if ( /[\'"`]/.test(txtTelefono.value)) {
            txtTelefono.setCustomValidity("Estas intentando agregar un caracter que no esta permitido");
        }
        if (txtPassword.value.trim().length < 8 && txtPassword.hasAttribute('required')) {
            txtPassword.setCustomValidity("La contraseña es obligatoria y debe tener al menos 8 caracteres.");
        }
        if ( /[\'"`]/.test(txtPassword.value)) {
            txtPassword.setCustomValidity("Estas intentando agregar un caracter que no esta permitido");
        }
        if (isNaN(txtCaja.value) || txtCaja.value < 0) {
            txtCaja.setCustomValidity("Por favor, ingrese un número válido para la caja.");
        }
        if ( /[\'"`]/.test(txtCaja.value)) {
            txtCaja.setCustomValidity("Estas intentando agregar un caracter que no esta permitido");
        }

        // Si el formulario es válido, envíalo
        if (form.checkValidity()) {
            form.submit();
        }
        else{
            e.preventDefault();
        }
    });
});

function cargarDatos(id, nombre, usuario, telefono, caja, rol, idSucursal) {
    console.log("Cargando datos:", id, nombre, usuario, telefono, caja, rol, idSucursal);
    
    document.getElementById("modalId").value = id;
    document.getElementById("modalNombre").value = nombre;
    document.getElementById("modalUsuario").value = usuario;
    document.getElementById("modalTelefono").value = telefono;
    document.getElementById("modalCaja").value = caja;
    document.getElementById("modalRoles").value = rol;
    document.getElementById("modalPassword").value = "";
    document.getElementById("modalPassword").removeAttribute('required', '');
    document.getElementById("modalSelect").value = idSucursal;
}

function limpiarDatos() {
    document.getElementById("modalId").value = 0;
    document.getElementById("modalNombre").value = "";
    document.getElementById("modalUsuario").value = "";
    document.getElementById("modalTelefono").value = "";
    document.getElementById("modalCaja").value = 0;
    document.getElementById("modalPassword").value = "";
    document.getElementById("modalPassword").setAttribute('required','');
    document.getElementById("modalRoles").value = "Administrador";
    document.getElementById("modalSelect").value = 1;
}

function borrarDatos(id, nombre) {
    var labelBorrar = document.getElementById("contenido-borrar");
    labelBorrar.innerText = "¿Realmente quieres borrar el empleado " + id + " (" + nombre + ")?" ;

    document.getElementById("borrarId").value = id;
}

