document.addEventListener('DOMContentLoaded', async function() {
    async function cargarProductos() {
        try {
            // La misma shit, no funcionara hasta hacer bien la redireccion al view correcto
            const response = await fetch('get_catalogo/');
            const productos = await response.json();
            mostrarProductos(productos);
        } catch (error) {
            console.error("Error al cargar productos:", error);
        }
    }
    function mostrarProductos(productos) {
        const productosContainer = document.getElementById('productosContainer');
        productosContainer.innerHTML = '';
        productos.catalogo.forEach(producto => {
            const div = document.createElement('div');
            div.className = 'producto';
            // div.dataset.sucursal = producto.sucursal; Activarlo cuando la sucursal se active
            div.innerHTML = `
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <div>
                    <h3>${producto.nombre}</h3>
                    <label id="idprod">ID: ${producto.id}</label>
                    <label id="descripcion">${producto.descripcion}</label>
                    <label id="stock">Stock: ${producto.stock}</label>
                </div>
                <div>
                    <input type="button" value="Ver" data-bs-toggle="modal" data-bs-target="#modal-detalles" onclick="cargarDatosModal('${producto.nombre}', ${producto.id}, ${producto.stock}, '${producto.descripcion}', '${producto.imagen}')">
                </div>
            `;
            productosContainer.appendChild(div);
        });
    }
    function cargarDatosModal(Nombre, ID, Stock, Descripcion, Imagen) {
        var nombreModal = document.getElementById("nombreModal");
        var idModal = document.getElementById("idModal");
        var stockModal = document.getElementById("stockModal");
        var descripcionModal = document.getElementById("descripcionModal");
        var imgModal = document.getElementById("imgModal");

        nombreModal.textContent = Nombre;
        idModal.textContent = "ID: " + ID;
        stockModal.textContent = "Stock: " + Stock;
        descripcionModal.textContent = Descripcion;
        imgModal.src = Imagen;
    }

    function filtrarProductosPorSucursal() {
        var select = document.getElementById('sucursalSelect');
        var idSucursal = select.value;
        var productos = document.querySelectorAll('.producto');

        productos.forEach(function(producto) {
            if (idSucursal === 'all' || producto.getAttribute('data-sucursal') === idSucursal) {
                producto.style.display = 'flex';
            } else {
                producto.style.display = 'none';
            }
        });
    }

    // Puede que todos estos metodos no funcionen si no estan en su html, de ser asi, agregar una seccion script ahi y 
    // Ponerlos, ni idea de por que no los tome si estan aca
    function filtrarProductos() {
        var input = document.getElementById('buscar');
        var filter = input.value.toLowerCase();
        var productos = document.querySelectorAll('.producto');

        productos.forEach(function(producto) {
            var nombre = producto.querySelector('h3').textContent.toLowerCase();

            if (nombre.includes(filter)) {
                producto.style.display = 'flex';
            } else {
                producto.style.display = 'none';
            }
        });
    }
    cargarProductos();
});

