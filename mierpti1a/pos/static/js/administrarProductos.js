document.addEventListener("DOMContentLoaded", ()=>{
    setTimeout(function() {
        var alertElements = document.querySelectorAll('.alert-dismissible');
        alertElements.forEach(function(alertElement) {
            var bootstrapAlert = new bootstrap.Alert(alertElement);
            bootstrapAlert.close();
        });
    }, 3000); // 5000 milisegundos = 5 segundos
    document.getElementById("mdlAgregar").addEventListener('shown.bs.modal', (e) => {
        let operacion=e.relatedTarget.innerText;
        e.target.querySelector(".modal-title").innerText=operacion;
    });
 
    // Validaciones

    document.getElementById("modalNombre").onkeyup = e =>{
        let txtNombre = document.getElementById("modalNombre");
        if (txtNombre.value.trim().length < 5 || txtNombre.value.trim().length > 50 ) {
            txtNombre.setCustomValidity("El nombre es obligatorio y debe tener entre 5 y 50 caracteres.");
        }
        if ( /[\'"]/.test(txtNombre.value)) {
            txtNombre.setCustomValidity("Estas intentando agregar un caracter que no esta permitido");
        }
        else{
            txtNombre.setCustomValidity("");
        }
    };
    
    document.getElementById("modalPrecio").onkeyup = e =>{
        let txtPrecio = document.getElementById("modalPrecio");
        if (isNaN(txtPrecio.value) || txtPrecio.value <= 0) {
            txtPrecio.setCustomValidity("El precio es obligatorio y debe ser un número mayor o igual a uno.");
        }
        if ( /[\'"]/.test(txtPrecio.value)) {
            txtPrecio.setCustomValidity("Estas intentando agregar un caracter que no esta permitido");
        }
        else{
            txtPrecio.setCustomValidity("");
        }
    };
    
    document.getElementById("modalStock").onkeyup = e =>{
        let txtStock = document.getElementById("modalStock");
        if (!/^\d+$/.test(txtStock.value)) {
            txtStock.setCustomValidity("El stock es obligatorio y debe contener solo números.");
        }
        if ( /[\'"]/.test(txtStock.value)) {
            txtStock.setCustomValidity("Estas intentando agregar un caracter que no esta permitido");
        }
        else{
            txtStock.setCustomValidity("");
        }
    };
    
    document.getElementById("productoForm").addEventListener("submit", function(e) {
        e.preventDefault(); // Evita el envío predeterminado del formulario
        //console.log("pruebaaa")
        let form = e.target;
        let txtNombre = document.getElementById("modalNombre");
        let txtPrecio = document.getElementById("modalPrecio");
        let txtStock = document.getElementById("modalStock");
    
        // Reset custom validity
        txtNombre.setCustomValidity("");
        txtPrecio.setCustomValidity("");
        txtStock.setCustomValidity("");
    
        // Validación personalizada
        if (txtNombre.value.trim().length < 5 || txtNombre.value.trim().length > 50) {
            txtNombre.setCustomValidity("El nombre es obligatorio y debe tener entre 5 y 50 caracteres.");
        }
        if ( /[\'"]/.test(txtNombre.value)) {
            txtNombre.setCustomValidity("Estas intentando agregar un caracter que no esta permitido");
        }
        if (isNaN(txtPrecio.value) || txtPrecio.value <= 0) {
            txtPrecio.setCustomValidity("El precio es obligatorio y debe ser un número mayor o igual a uno.");
        }
        if ( /[\'"]/.test(txtPrecio.value)) {
            txtPrecio.setCustomValidity("Estas intentando agregar un caracter que no esta permitido");
        }
        if (!/^\d+$/.test(txtStock.value)) {
            txtStock.setCustomValidity("El stock es obligatorio y debe contener solo números.");
        }
        if ( /[\'"]/.test(txtStock.value)) {
            txtStock.setCustomValidity("Estas intentando agregar un caracter que no esta permitido");
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

function cargarDatos(ID, Nombre, Precio, Stock, Descripcion, sucursal)
{
    var modalId=document.getElementById("modalId");
    var modalNombre=document.getElementById("modalNombre");
    var modalPrecio=document.getElementById("modalPrecio");
    var modalStock=document.getElementById("modalStock");
    var modalDescripcion=document.getElementById("modalDescripcion");
    var modalSelect=document.getElementById("modalSelect");
    var seccionSucursal=document.getElementById("ocultarSucursal");
    modalId.value=ID;
    modalNombre.value=Nombre;
    modalPrecio.value=Precio;
    modalStock.value=Stock;
    modalDescripcion.value=Descripcion;
    modalSelect.value = sucursal;
    seccionSucursal.style.display = 'none';
    console.log(modalSelect.value);
}
function limpiarDatos()
{
    var modalId=document.getElementById("modalId");
    var modalNombre=document.getElementById("modalNombre");
    var modalPrecio=document.getElementById("modalPrecio");
    var modalStock=document.getElementById("modalStock");
    var modalDescripcion=document.getElementById("modalDescripcion");
    var modalSelect=document.getElementById("modalSelect");
    modalId.value=0;
    modalNombre.value="";
    modalPrecio.value=0;
    modalStock.value=0;
    modalDescripcion.value="";
    modalSelect.value = 1;
    seccionSucursal.style.display = 'block';
}
function borrarDatos(ID, Nombre, nombreSucursal, idSucursal)
{
    var labelBorrar=document.getElementById("contenido-borrar");
    labelBorrar.innerText="¿Realmente quieres borrar el producto "+ID+" ("+Nombre+") de la sucursal: "+
    nombreSucursal+"?";
    var modalId=document.getElementById("borrarId");
    modalId.value=ID;
    var modalIdSucursal=document.getElementById("borrarIdSucursal");
    modalIdSucursal.value=idSucursal;
}