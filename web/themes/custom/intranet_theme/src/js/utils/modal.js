export function initializeModal() {
  var areaId = document.querySelectorAll('[id^="area"]');

  areaId.forEach(function (area) {
    var id = area.id.replace("area", "");

    var modal = document.getElementById("modal");
    var closeBtn = document.getElementsByClassName("close-btn")[0];
    const modalInfo = document.getElementById("modal-info");
    const modalTitle = document.getElementById("modal-title");
    var modalImage = document.getElementById("modal-image");

    const campoPuesto = document.getElementById("edit-pusto-trabajo");
    const campoNid = document.getElementById("edit-nid");

    var description = area.getAttribute("data-desc");
    var imageUrl = area.getAttribute("data-img");
    var nid = area.getAttribute("data-nid");

    function showModal(info) {
      modalInfo.textContent = info;
      modal.style.display = "block";
    }

    function showModalTitle(info) {
      modalTitle.textContent = info;
      modal.style.display = "block";
    }

    area.addEventListener("click", function () {
      modal.style.display = "block";
      modalImage.src = imageUrl;
      campoPuesto.value = `Puesto #: ${id}`;
      campoNid.value = nid;
      showModalTitle(`Has seleccionado el area #: ${id}`);
      showModal(description);
    });

    closeBtn.onclick = function () {
      modal.style.display = "none";
    };

    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    };
  });
}

export function closeModal() {
  let modalClose = document.getElementById("modal-close-button");

  if (modalClose) {
    modalClose.addEventListener("click", function () {
      let modal = document.getElementById("webform-confirmation-modal");

      if (modal) {
        modal.classList.add("hidden");
        setTimeout(function () {
          modal.remove();
        }, 300);
      }

      fetch(location.href)
        .then((response) => response.text())
        .then((html) => {
          let tempDiv = document.createElement('div');
          tempDiv.innerHTML = html;

          let updatedTable = tempDiv.querySelector('.table-container-reserva');
          if (updatedTable) {
            document.querySelector('.table-container-reserva').innerHTML = updatedTable.innerHTML;
          }
        })
        .catch((error) => console.error('Error al cargar la tabla:', error));
    });
  } else {
    console.error("El botón para cerrar el modal no se encontró.");
  }
}


