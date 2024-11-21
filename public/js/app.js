// Selecciona la ventana inicial
const ventanaInicio = document.querySelector('.ventana-inicio');

// Agrega un evento para detectar el final de la animación
ventanaInicio.addEventListener('animationend', () => {
  // Redirige a /login después de que termine la animación
  window.location.href = '/login';
});