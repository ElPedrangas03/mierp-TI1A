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

    // Este es solo para agregar los productos de dicha venta a la tabla que tenemos en el html
    document.getElementById("formVentas").addEventListener("submit", async function(e){
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

        const idProductoFetch = document.getElementById("idProducto").value;
        const cantidadProducto = document.getElementById("cantidad").value;

        // Llamar a la función para cargar el producto
        const productoFetch = await cargarProducto(idProductoFetch);
        
        if (productoFetch) {
            // Mostrar producto en la tabla
            agregarProductoATabla(producto, cantidadProducto);
        } else {
            alert("Producto no encontrado");
        }
    });
    

    // Este es el form que realiza la venta, asi el final finalisimo
    document.getElementById("formVenta").addEventListener("submit", async function(e) {
        e.preventDefault();

        document.getElementById("txtTotal").disabled=false;
        document.getElementById("txtEfectivoFinal").disabled=false;
        document.getElementById("txtCambio").disabled=false;
        
        const efectivo = document.getElementById("txtEfectivo").value;
        const total = document.getElementById("totalGeneral").textContent;
        
        const productos = obtenerProductosDeTabla();

        const resultado = await realizarVenta(productos, efectivo, total);
        
        if (resultado.success) {
            alert("Venta realizada con éxito!");
        } else {
            alert("Error al realizar la venta: " + resultado.error);
        }
    });

    
});

async function cargarProducto(id) {
    try {
        const response = await fetch(`/obtener_producto/${id}/`); // Cambia esta URL por la correcta
        if (!response.ok) {
            throw new Error("Error en la carga del producto");
        }
        return await response.json();
    } catch (error) {
        console.error("Error:", error);
    }
}

function agregarProductoATabla(producto, cantidad) {
    const tblVentas = document.getElementById("tblVentas").querySelector("tbody");

    // Crear una nueva fila
    const nuevaFila = document.createElement("tr");
    nuevaFila.innerHTML = `
        <td>${producto.id}</td>
        <td>${producto.nombre}</td>
        <td>${producto.precio}</td>
        <td>${cantidad}</td>
        <td>${producto.precio * cantidad}</td>
    `;
    
    // Agregar la nueva fila a la tabla
    tblVentas.appendChild(nuevaFila);

    actualizarTotales();
}

async function realizarVenta(productos, efectivo, total) {
    try {
        const response = await fetch('/realizar_venta/', { // Cambiar en el momento por la correcta
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                productos: productos,
                efectivo: efectivo,
                total: total,
            }),
        });

        if (!response.ok) {
            throw new Error("Error al realizar la venta");
        }

        return await response.json(); 
    } catch (error) {
        console.error("Error:", error);
        return { success: false, error: error.message };
    }
}

function obtenerProductosDeTabla() {
    const productos = [];
    const tblVentas = document.getElementById("tblVentas").querySelector("tbody");
    const filas = tblVentas.querySelectorAll("tr");
    
    filas.forEach((fila) => {
        const celdas = fila.querySelectorAll("td");
        if (celdas.length > 0) { // Asegúrate de que la fila tenga datos
            const producto = {
                id: celdas[0].textContent,
                nombre: celdas[1].textContent,
                precio: parseFloat(celdas[2].textContent),
                cantidad: parseInt(celdas[3].textContent),
                subtotal: parseFloat(celdas[4].textContent),
            };
            productos.push(producto);
        }
    });

    return productos;
}

function actualizarTotales() {
    const tblVentas = document.getElementById("tblVentas").querySelector("tbody");
    const filas = tblVentas.querySelectorAll("tr");
    
    let subtotal = 0;
    filas.forEach(fila => {
        const celdas = fila.querySelectorAll("td");
        if (celdas.length > 0) { 
            subtotal += parseFloat(celdas[4].textContent); // Columna de subtotal (5ta)
        }
    });

    const iva = subtotal * 0.16; // IVA del 16%
    const total = subtotal + iva;

    document.querySelector("#totalGeneral").textContent = total.toFixed(2);
    document.querySelector("#total").innerHTML = `
        <label>Subtotal: ${subtotal.toFixed(2)}</label>
        <br>
        <label>IVA 16%: ${iva.toFixed(2)}</label>
        <br>
        <label>Total: <label id="totalGeneral">${total.toFixed(2)}</label></label>
    `;
}