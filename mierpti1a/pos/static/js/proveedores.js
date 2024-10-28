document.addEventListener('DOMContentLoaded', function() {
    const openModalButton = document.querySelector('.btn btn-primary');
    const modalDetalles = new bootstrap.Modal(document.getElementById('modal-AddEdit'));

    openModalButton.addEventListener('click', function() {
        modalDetalles.show();
    });
});

// document.addEventListener('DOMContentLoaded', (event) => {
//     // Obtener el enlace y el modal
//     var btnAgregar = document.getElementById('.btnAgregar');
//     var modal = document.getElementById('modal-AddEdit');

//     // Cuando se hace clic en el enlace, abrir el modal
//     btnAgregar.onclick = function(event) {
//         event.preventDefault();
//         modal.style.display = 'block';
//     }
// });
