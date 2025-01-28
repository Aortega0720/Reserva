import "@scss/main.scss";
import { 
    initializeModal, 
    closeModal }
     from "./utils/modal";
import { cupos  } from "./utils/form";

document.addEventListener("DOMContentLoaded", () => {
    initializeModal();
    closeModal();
    cupos();
});