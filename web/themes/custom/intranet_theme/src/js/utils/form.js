export function cupos() {
    const turnoField = document.getElementById('edit-turno');
    const cupoField = document.getElementById('edit-cupo');
  
    if (!turnoField || !cupoField) {
      console.error("No se encontraron los campos especificados.");
      return;
    }

    const updateCupo = () => {
      const selectedValue = turnoField.value;
      let cupoValue = 0;
  
      if (selectedValue === "1" || selectedValue === "2") {
        cupoValue = 1;
      } else if (selectedValue === "3") {
        cupoValue = 2;
      }
      cupoField.value = cupoValue;
    };
    
    turnoField.addEventListener("change", updateCupo);
    updateCupo();
  }
