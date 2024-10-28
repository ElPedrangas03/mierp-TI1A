document.addEventListener('DOMContentLoaded', function() {
    const openModalButton = document.querySelector('.btn.btn-primary');
    const modalDetalles = new bootstrap.Modal(document.getElementById('modal-detalles'));

    openModalButton.addEventListener('click', function() {
        modalDetalles.show();
    });
});

function cargarDatosModal(Nombre, ID, Stock, Descripcion, Imagen)
{
    var nombreModal=document.getElementById("nombreModal");
    var idModal=document.getElementById("idModal");
    var stockModal=document.getElementById("stockModal");
    var descripcionModal=document.getElementById("descripcionModal");
    var imgModal=document.getElementById("imgModal");

    nombreModal.value=Nombre;
    idModal.value=ID;
    stockModal.value=Stock;
    descripcionModal.value=Descripcion;
    imgModal.src=Imagen
}
