document.addEventListener("DOMContentLoaded", async ()=>{
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

    // Cargar datos desde los views de django

    const tbody = document.getElementById("productos-tbody");
    
    try {
        const response = await fetch('/administrarProductos/');
        const productos = await response.json();

        //Limpiar datos
        tbody.innerHTML = "";

        if (productos.length > 0) {
            productos.forEach(producto => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${producto.id}</td>
                    <td>${producto.nombre}</td>
                    <td>${producto.precio_unitario}</td>
                    <td>${producto.descuento}</td>
                    <td>${producto.stock}</td>
                    <td>${producto.descripcion}</td>
                    <td>${producto.sucursal}</td>
                    <td>
                        <div>
                            <button type="button" class="btn btn-primary btn-editar" data-id="${producto.id}" data-bs-toggle="modal" data-bs-target="#mdlAgregar">Editar</button>
                            <button type="button" class="btn btn-danger btn-borrar" data-id="${producto.id}" data-bs-toggle="modal" data-bs-target="#mdlBorrar">Borrar</button>
                        </div>
                    </td>
                `;
                tbody.appendChild(row);
            });
            document.querySelectorAll(".btn-editar").forEach(button => {
                button.addEventListener("click", function() {
                    cargarDatosProducto(button.dataset.id);
                });
            });
            document.querySelectorAll(".btn-borrar").forEach(button => {
                button.addEventListener("click", function() {
                    borrarProducto(button.dataset.id);
                });
            });
        } else {
            const row = document.createElement("tr");
            row.innerHTML = `<td colspan="8">No hay productos disponibles.</td>`;
            tbody.appendChild(row);
        }
    } catch (error) {
        console.error('Error al cargar los datos:', error);
    }
    
});

async function cargarDatosProducto(id) {
    try {
        const response = await fetch(`/obtener_producto/${id}/`);  // URL para obtener los datos del producto específico
        const producto = await response.json();

        document.getElementById("modalId").value = producto.id;
        document.getElementById("modalNombre").value = producto.nombre;
        document.getElementById("modalPrecio").value = producto.precio_unitario;
        document.getElementById("modalDescuento").value = producto.descuento;
        document.getElementById("modalStock").value = producto.stock;
        document.getElementById("modalDescripcion").value = producto.descripcion;
        // document.getElementById("modalSucursal").value = producto.sucursal;
        // Voy a mover esto hasta que se arregle los views, para poder ver como cargarlo

        document.getElementById("btnGuardarCambios").onclick = () => editarProducto(id);
    } catch (error) {
        console.error("Error al cargar los datos del producto:", error);
    }
}

async function editarProducto(id) {
    const producto = {
        nombre: document.getElementById("modalNombre").value,
        precio_unitario: document.getElementById("modalPrecio").value,
        descuento: document.getElementById("modalDescuento").value,
        stock: document.getElementById("modalStock").value,
        descripcion: document.getElementById("modalDescripcion").value,
        // sucursal: document.getElementById("productoSucursal").value
        // Lo mismo de arriba
    };

    try {
        // Cambiar a la url que se usara en el views de django (De preferencia recibir el id)
        const response = await fetch(`/editar_producto/${id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(producto),
        });

        if (response.ok) {
            alert("Producto editado con éxito");

            // Actualiza el DOM con los nuevos datos
            const row = document.querySelector(`tr[data-id="${id}"]`);
            row.innerHTML = `
                <td>${id}</td>
                <td>${producto.nombre}</td>
                <td>${producto.precio_unitario}</td>
                <td>${producto.descuento}</td>
                <td>${producto.stock}</td>
                <td>${producto.descripcion}</td>
                <td>${producto.sucursal}</td>
                <td>
                    <div>
                        <button type="button" class="btn btn-primary btn-editar" data-id="${id}" data-bs-toggle="modal" data-bs-target="#mdlAgregar">Editar</button>
                        <button type="button" class="btn btn-danger btn-borrar" data-id="${id}" data-bs-toggle="modal" data-bs-target="#mdlBorrar">Borrar</button>
                    </div>
                </td>
            `;

            // Reagrega los event listeners a los botones de la fila
            row.querySelector(".btn-editar").addEventListener("click", () => cargarDatosProducto(id));
            row.querySelector(".btn-borrar").addEventListener("click", () => borrarProducto(id));
        } else {
            console.error("Error al editar el producto");
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

async function borrarProducto(id) {
    try {
        // Lo mismo, redireccionar al views que borrar el producto, de preferencia, con id
        const response = await fetch(`/borrar_producto/${id}/`, {
            method: 'DELETE'
        });

        if (response.ok) {
            alert("Producto borrado con éxito");

            // Elimina la fila del DOM
            const row = document.querySelector(`tr[data-id="${id}"]`);
            if (row) row.remove();
        } else {
            console.error("Error al borrar el producto");
        }
    } catch (error) {
        console.error("Error:", error);
    }
}


async function agregarProducto() {
    const producto = {
        // Haria falta agregar el campo del id, pero eso lo checare despues su nivel de que se ocupe o algo asi
        nombre: document.getElementById("modalNombre").value,
        precio_unitario: document.getElementById("modalPrecio").value,
        descuento: document.getElementById("modalDescuento").value,
        stock: document.getElementById("modalStock").value,
        descripcion: document.getElementById("modalDescripcion").value,
        sucursal: document.getElementById("modalSucursal").value
    };

    try {
        // Lo mismo, hacer la redireccion (Por ahora dejare todas asi a la brava)
        const response = await fetch('/agregar_producto/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(producto),
        });

        if (response.ok) {
            const data = await response.json();
            alert("Producto agregado con éxito");

            // Añadir la nueva fila al DOM
            const row = document.createElement("tr");
            row.dataset.id = data.id;
            row.innerHTML = `
                <td>${data.id}</td>
                <td>${producto.nombre}</td>
                <td>${producto.precio_unitario}</td>
                <td>${producto.descuento}</td>
                <td>${producto.stock}</td>
                <td>${producto.descripcion}</td>
                <td>${producto.sucursal}</td>
                <td>
                    <div>
                        <button type="button" class="btn btn-primary btn-editar" data-id="${data.id}" data-bs-toggle="modal" data-bs-target="#mdlAgregar">Editar</button>
                        <button type="button" class="btn btn-danger btn-borrar" data-id="${data.id}" data-bs-toggle="modal" data-bs-target="#mdlBorrar">Borrar</button>
                    </div>
                </td>
            `;
            document.getElementById("productos-tbody").appendChild(row);

            // Agregar eventos a los botones nuevos
            row.querySelector(".btn-editar").addEventListener("click", () => cargarDatosProducto(data.id));
            row.querySelector(".btn-borrar").addEventListener("click", () => borrarProducto(data.id));
        } else {
            console.error("Error al agregar el producto");
        }
    } catch (error) {
        console.error("Error:", error);
    }
}
