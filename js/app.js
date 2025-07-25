// Array de objetos con información de cada gatito
const gatitos = [
  {
    nombre: "Bigotes",
    imagen: "../img/GatoPasoUno.jpg",
    descripcion: "Curioso y observador, ¡nunca se le escapa nada!",
  },
  {
    nombre: "Muffin",
    imagen: "../img/GatoPasoDos.jpg",
    descripcion: "Le encantan los abrazos y el atún.",
  },
  {
    nombre: "Canela",
    imagen: "../img/GatoPasoTres.png",
    descripcion: "Le gusta mirar por la ventana todo el día.",
  },
  {
    nombre: "Rayas",
    imagen: "../img/GatoPasoCuatro.jpg",
    descripcion: "Un remolino de energía, ideal para jugar.",
  },
  {
    nombre: "Copito",
    imagen: "../img/gatitorojocopia.png",
    descripcion: "Duerme 18 horas y ronronea las otras 6.",
  },
];

// Selecciona el contenedor donde se van a mostrar las tarjetas de gatitos
const contenedor = document.getElementById("contenedor-gatitos");

// Trae del localStorage los nombres de los gatitos ya adoptados (si existen)
let adoptados = JSON.parse(localStorage.getItem("gatitosAdoptados")) || [];

// ------------------------------ MOSTRAR TARJETAS ------------------------------
if (contenedor) {
  // Por cada gatito del array se genera una tarjeta en HTML
  gatitos.forEach((gato, index) => {
    // Verifica si el gatito ya fue adoptado
    const adoptado = adoptados.includes(gato.nombre);

    // Crea el HTML de la tarjeta del gatito
    const tarjeta = `
      <div class="card-gatito">
        <img src="${gato.imagen}" alt="${gato.nombre}">
        <h3>${gato.nombre}</h3>
        <p>${gato.descripcion}</p>
        <button class="btn-adoptar" data-index="${index}" ${
      adoptado ? "disabled" : ""
    }>
          ${adoptado ? "¡Ya adoptado!" : "Adoptar"}
        </button>
      </div>
    `;

    // Agrega la tarjeta al contenedor del HTML
    contenedor.innerHTML += tarjeta;
  });
}

// --------------------------- INTERACCIÓN --------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  // Selecciona todos los botones de "Adoptar"
  const botones = document.querySelectorAll(".btn-adoptar");

  // Agrega evento click a cada botón
  botones.forEach((boton) => {
    const index = parseInt(boton.dataset.index); // obtiene el índice del gatito correspondiente

    boton.addEventListener("click", () => {
      const nombre = gatitos[index].nombre;
      const imagen = gatitos[index].imagen;

      // Auto-rellena el campo de "asunto" con el nombre del gato adoptado
      const inputAsunto = document.getElementById("asunto");
      if (inputAsunto && !inputAsunto.value.includes(nombre)) {
        inputAsunto.value += inputAsunto.value ? `, ${nombre}` : nombre;
      }

      // Si ya fue adoptado, no hace nada
      if (adoptados.includes(nombre)) return;

      // Muestra alerta con SweetAlert al adoptar
      Swal.fire({
        title: `¡Adoptaste a ${nombre}! 🐾`,
        text: "Nos pondremos en contacto para seguir el proceso.",
        imageUrl: imagen,
        imageAlt: `Foto de ${nombre}`,
        imageWidth: 200,
        confirmButtonText: "¡Genial!",
        confirmButtonColor: "#da8f44",
      });

      // Guarda el nombre del gatito adoptado en el array
      adoptados.push(nombre);

      // Guarda la lista de adoptados en localStorage
      localStorage.setItem("gatitosAdoptados", JSON.stringify(adoptados));

      // Cambia el botón a "¡Ya adoptado!" y lo desactiva
      boton.textContent = "¡Ya adoptado!";
      boton.disabled = true;
    });
  });

  // Si ya había adoptados, auto-rellena el campo "asunto" al cargar la página
  const inputAsunto = document.getElementById("asunto");
  if (inputAsunto && adoptados.length > 0) {
    inputAsunto.value = adoptados.join(", ");
  }
});

// -------------------------- RESERVA DE MESAS CON CALENDLY ---------------------------
document.addEventListener("DOMContentLoaded", function () {
  // Selecciona el botón de reservar
  const btn = document.getElementById("reservar");
  if (btn) {
    // Al hacer click en el botón, abre el widget emergente de Calendly
    btn.addEventListener("click", function () {
      Calendly.initPopupWidget({
        url: "https://calendly.com/meortega-frba/reserva_mesa_catcafe",
      });
      return false; // evita que el botón recargue la página
    });
  }
});
