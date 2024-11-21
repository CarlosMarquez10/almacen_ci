document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".card");
  
    cards.forEach((card) => {
      const modalBtn = card.querySelector(".modal-btn");
      const modal = card.querySelector(".modal");
      const closeModal = card.querySelector(".modal-close");
      const textarea = card.querySelector("textarea");
  
      const checkBtn = card.querySelector(".check-btn");
      const changeBtn = card.querySelector(".change-btn");
      const chargeBtn = card.querySelector(".charge-btn");
  
      // Abrir modal específico
      modalBtn.addEventListener("click", () => {
        modal.style.display = "flex";
      });
  
      // Cerrar modal específico
      closeModal.addEventListener("click", () => {
        modal.style.display = "none";
      });
  
      // Cambiar color de la card en base al botón presionado
      checkBtn.addEventListener("click", () => {
        card.style.backgroundColor = "lightgreen"; // Cambia a verde
      });
  
      changeBtn.addEventListener("click", () => {
        card.style.backgroundColor = "orange"; // Cambia a naranja
      });
  
      chargeBtn.addEventListener("click", () => {
        card.style.backgroundColor = "lightcoral"; // Cambia a rojo claro
      });
  
      // Ejemplo: Manejo de contenido en el textarea
      textarea.addEventListener("input", () => {
        console.log(`Texto en la card: ${textarea.value}`);
      });
    });
  });
  