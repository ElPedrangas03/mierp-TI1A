document.addEventListener("DOMContentLoaded", ()=>{
    setTimeout(function() {
        var alertElements = document.querySelectorAll('.alert-dismissible');
        alertElements.forEach(function(alertElement) {
            var bootstrapAlert = new bootstrap.Alert(alertElement);
            bootstrapAlert.close();
        });
    }, 3000); // 5000 milisegundos = 5 segundos

    document.getElementById("txtEfectivo").onkeyup = e => {
        let total=parseFloat(document.getElementById("totalGeneral").textContent);
        let efectivo=parseFloat(document.getElementById("txtEfectivo").value);
        let txtEfectivo=document.getElementById("txtEfectivo");
        txtEfectivo.setCustomValidity("");
        console.log(txtEfectivo.value);
        console.log(total);
        if(total>efectivo){
            txtEfectivo.setCustomValidity("El efectivo debe ser mayor a el total.");
        }
        else if(efectivo<=0)
        {
            txtEfectivo.setCustomValidity("El efectivo debe ser mayor a 0");
        }
        if(isNaN(txtEfectivo.value) || txtEfectivo.value.trim() === ""){
            txtEfectivo.setCustomValidity("Ingresa una cantidad valida.");
        }

    }
    // document.getElementById("idProducto").onkeyup = e => {
    //     let producto = document.getElementById("idProducto");
    //     let idProducto = parseInt(producto);
    //     producto.setCustomValidity("");
    //     if(isNaN(idProducto.value)){
    //         producto.setCustomValidity("Ingresa un ID de producto valido");
    //     }
    // }
    document.getElementById("idProducto").onkeyup = e => {
        let txtProducto=document.getElementById("idProducto");
        
        txtProducto.setCustomValidity("");

        if(isNaN(txtProducto.value) || txtProducto.value.trim() === ""){
            txtProducto.setCustomValidity("Ingresa un ID de producto válido");
        }
    };


    document.getElementById("formTotal").addEventListener("submit", function(e) {
        e.preventDefault();
        let form = e.target;
        let total = parseFloat(document.getElementById("totalGeneral").textContent);
        let efectivo = parseFloat(document.getElementById("txtEfectivo").value);
        let txtEfectivo = document.getElementById("txtEfectivo");
        let txtProducto = document.getElementById("idProducto");
        
        txtEfectivo.setCustomValidity("");  // Resetear el mensaje de validación personalizado

        if (total > efectivo) {
            txtEfectivo.setCustomValidity("El efectivo debe ser mayor al total.");
        }

        if(isNaN(txtEfectivo.value) || txtEfectivo.value.trim() === ""){
            txtEfectivo.setCustomValidity("Ingresa una cantidad valida.");
        }

        if (total==0){
            txtEfectivo.setCustomValidity("Ingrese productos para efectuar la venta.");
        }

        if (form.checkValidity()) {
            // Si el formulario es válido, abre el modal
            let modal = new bootstrap.Modal(document.getElementById('staticBackdrop'));
            modal.show();
            document.getElementById("txtTotal").value=total;
            document.getElementById("txtEfectivoFinal").value=efectivo;
            document.getElementById("txtCambio").value=efectivo-total;
            document.getElementById("txtTotal").disabled=true;
            document.getElementById("txtEfectivoFinal").disabled=true;
            document.getElementById("txtCambio").disabled=true;
        } else {
            form.reportValidity(); // Muestra los mensajes de error del formulario
        }
    });
    document.getElementById("formVentas").addEventListener("submit", function(e){
        e.preventDefault(); // Evita el envío del formulario por defecto
        
        let formulario = e.target;
        let producto = document.getElementById("idProducto").value; // Obtén el valor del campo de producto
        let idProducto = parseInt(producto); // Convierte el valor a un número entero

        document.getElementById("idProducto").setCustomValidity("");
    
        if(isNaN(idProducto) || producto.trim() === ""){ // Verifica si no es un número o está vacío
            document.getElementById("idProducto").setCustomValidity("Ingresa un ID de producto válido"); // Establece el mensaje de validación personalizado
        } else {
            document.getElementById("idProducto").setCustomValidity(""); // Limpia el mensaje de validación
            formulario.submit(); // Envía el formulario si el valor es un número
        }
    });
    

    document.getElementById("formVenta").addEventListener("submit", function(e) {
        document.getElementById("txtTotal").disabled=false;
        document.getElementById("txtEfectivoFinal").disabled=false;
        document.getElementById("txtCambio").disabled=false;
    });

    

    
});