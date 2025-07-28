//Perdon los comentarios es para entender mejor y no olvidarme.

// ------------------- ARRAY DE GATITOS -------------------
// Define un array constante 'gatitos' que contiene objetos con información de gatos para adopción
const gatitos = [
  {
    nombre: "Bigotes", // Nombre del primer gato
    imagen: "../img/GatoPasoUno.jpg", // Ruta de la imagen
    descripcion: "Curioso y observador, ¡nunca se le escapa nada!", // Descripción
  },
  {
    nombre: "Muffin", // Nombre del segundo gato
    imagen: "../img/GatoPasoDos.jpg", // Ruta de la imagen
    descripcion: "Le encantan los abrazos y el atún.", // Descripción
  },
  {
    nombre: "Canela", // Nombre del tercer gato
    imagen: "../img/GatoPasoTres.png", // Ruta de la imagen
    descripcion: "Le gusta mirar por la ventana todo el día.", // Descripción
  },
  {
    nombre: "Rayas", // Nombre del cuarto gato
    imagen: "../img/GatoPasoCuatro.jpg", // Ruta de la imagen
    descripcion: "Un remolino de energía, ideal para jugar.", // Descripción
  },
  {
    nombre: "Copito", // Nombre del quinto gato
    imagen: "../img/gatitorojocopia.png", // Ruta de la imagen
    descripcion: "Duerme 18 horas y ronronea las otras 6.", // Descripción
  },
];

// Obtiene el elemento del DOM con id "contenedor-gatitos" donde se mostrarán las tarjetas
const contenedor = document.getElementById("contenedor-gatitos");

// Obtiene del localStorage los nombres de gatos ya adoptados (o array vacío si no hay)
let adoptados = JSON.parse(localStorage.getItem("gatitosAdoptados")) || [];

// ------------------- MOSTRAR TARJETAS en SECCION ADOPCION -------------------
// Verifica si existe el contenedor antes de manipularlo
if (contenedor) {
  // Itera sobre cada gato en el array 'gatitos'
  gatitos.forEach((gato, index) => {
    // Verifica si el gato actual está en la lista de adoptados
    const adoptado = adoptados.includes(gato.nombre);

    // Crea el HTML de la tarjeta del gato con plantilla
    const tarjeta = `
      <div class="card-gatito">
        <img src="${gato.imagen}" alt="${gato.nombre}"> <!-- Imagen del gato -->
        <h3>${gato.nombre}</h3> <!-- Nombre del gato -->
        <p>${gato.descripcion}</p> <!-- Descripción del gato -->
        <button class="btn-adoptar" data-index="${index}" ${
      adoptado ? "disabled" : ""
    }>
          ${
            adoptado ? "¡Ya adoptado!" : "Adoptar"
          } <!-- Texto condicional del botón -->
        </button>
      </div>
    `;

    // Agrega la tarjeta al contenido del contenedor
    contenedor.innerHTML += tarjeta;
  });
}

// ------------------- INTERACCIÓN boton de ADOPCIÓN -------------------
// Espera a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", () => {
  // Selecciona todos los botones con clase 'btn-adoptar'
  const botones = document.querySelectorAll(".btn-adoptar");

  // Si existen botones...
  if (botones.length > 0) {
    // Itera sobre cada botón
    botones.forEach((boton) => {
      // Obtiene el índice del gato desde el atributo data-index
      const index = parseInt(boton.dataset.index);

      // Agrega un evento para el click en el botón
      boton.addEventListener("click", () => {
        // Obtiene nombre e imagen del gato correspondiente
        const nombre = gatitos[index].nombre;
        const imagen = gatitos[index].imagen;

        // Busca el input de asunto y agrega el nombre del gato si no está
        const inputAsunto = document.getElementById("asunto");
        if (inputAsunto && !inputAsunto.value.includes(nombre)) {
          inputAsunto.value += inputAsunto.value ? `, ${nombre}` : nombre;
        }

        // Si ya está adoptado, no hace nada
        if (adoptados.includes(nombre)) return;

        // Muestra alerta con SweetAlert2
        Swal.fire({
          title: `¡Adoptaste a ${nombre}! 🐾`,
          text: "Nos pondremos en contacto para seguir el proceso.",
          imageUrl: imagen, // Muestra imagen del gato
          imageAlt: `Foto de ${nombre}`,
          imageWidth: 200,
          confirmButtonText: "¡Genial!",
          confirmButtonColor: "#da8f44",
        });

        // Agrega el nombre a la lista de adoptados
        adoptados.push(nombre);
        // Guarda en localStorage
        localStorage.setItem("gatitosAdoptados", JSON.stringify(adoptados));

        // Actualiza el botón
        boton.textContent = "¡Ya adoptado!";
        boton.disabled = true;
      });
    });

    // Precarga el campo asunto con gatos ya adoptados
    const inputAsunto = document.getElementById("asunto");
    if (inputAsunto && adoptados.length > 0) {
      inputAsunto.value = adoptados.join(", ");
    }
  }
});

// ------------------- RESERVAS CALENDLY en INICIO -------------------
// Espera a que el DOM esté cargado
document.addEventListener("DOMContentLoaded", function () {
  // Obtiene el botón de reservar
  const btn = document.getElementById("reservar");

  // Si existe el botón...
  if (btn) {
    // Agrega event listener para el click
    btn.addEventListener("click", function () {
      // Abre el popup de Calendly con la URL especificada
      Calendly.initPopupWidget({
        url: "https://calendly.com/meortega-frba/reserva_mesa_catcafe",
      });
      return false; // Previene el comportamiento por defecto
    });
  }
});

// ------------------- VALIDACIÓN FORMULARIO DE CONTACTO -------------------
// Espera a que el DOM esté cargado
document.addEventListener("DOMContentLoaded", function () {
  // Obtiene el formulario de contacto
  const form = document.querySelector(".formulario-contacto form");

  // Si existe el formulario...
  if (form) {
    // Agrega event listener para el submit
    form.addEventListener("submit", function (event) {
      event.preventDefault(); // Evita el envío normal del form

      // Obtiene y limpia los valores de los campos
      const nombre = document.getElementById("nombre").value.trim();
      const email = document.getElementById("email").value.trim();
      const asunto = document.getElementById("asunto").value.trim();
      const mensaje = document.getElementById("mensaje").value.trim();

      // Valida que todos los campos tengan contenido
      if (!nombre || !email || !asunto || !mensaje) {
        // Muestra alerta de error con SweetAlert2
        Swal.fire({
          icon: "warning",
          title: "Faltan datos",
          text: "Por favor completá todos los campos.",
          confirmButtonColor: "#da8f44",
        });
      } else {
        // Muestra alerta de éxito
        Swal.fire({
          title: "Formulario enviado con éxito 🐾",
          text: "Gracias por tu mensaje, te estaremos respondiendo a la brevedad.",
          confirmButtonText: "¡Genial!",
          confirmButtonColor: "#da8f44",
        });
        form.reset(); // Limpia el formulario
      }
    });
  }
});

// ------------------- SECCIÓN BEBIDAS DEL MENÚ -------------------
// Array de objetos con información de bebidas
const bebidas = [
  {
    nombre: "Cat-latte", // Nombre de la bebida
    descripcion: "", // Descripción vacía
    clase: "cafe-leche", // Clase CSS
    imagen: "../img/caf late(cafe con leche).webp", // Ruta imagen
    alt: "foto de un café cremoso", // Texto alternativo
  },
  {
    nombre: "Gato Solo",
    descripcion: "",
    clase: "cafe-solo",
    imagen:
      "../img/20250602_1545_Catfecito Café y Gato_simple_compose_01jwrzb5e1fn695vwdngtsaa9s.png",
    alt: "foto de una taza de café solo",
  },
  {
    nombre: "Matcha-miau",
    descripcion: "",
    clase: "cafe-matcha",
    imagen:
      "../img/20250602_1549_Taza Catfecito con Matcha_simple_compose_01jwrzjrjxe68ttprj178dmz3v.png",
    alt: "una taza de matcha",
  },
];

// Obtiene la sección de bebidas del menú
const seccionBebidas = document.getElementById("seccionBebidas");

// Si existe la sección...
if (seccionBebidas) {
  // Itera sobre cada bebida
  bebidas.forEach((bebida) => {
    // Crea un div para la tarjeta
    const tarjeta = document.createElement("div");
    tarjeta.className = "tarjeta"; // Asigna clase CSS

    // Asigna el HTML interno con los datos de la bebida
    tarjeta.innerHTML = `
      <img src="${bebida.imagen}" alt="${bebida.nombre}"> <!-- Imagen -->
      <h3>${bebida.nombre}</h3> <!-- Nombre -->
      <p>${bebida.descripcion}</p> <!-- Descripción -->
      <button>Elegir</button> <!-- Botón para seleccionar -->
    `;

    // Obtiene el botón y agrega event listener
    const boton = tarjeta.querySelector("button");
    boton.addEventListener("click", () => {
      agregarAlPedido(bebida); // Llama a la función para agregar al pedido
    });

    // Agrega la tarjeta al DOM
    seccionBebidas.appendChild(tarjeta);
  });
}

// ------------------- AGREGAR AL PEDIDO boton Menu -------------------
// Función para agregar bebidas al pedido
function agregarAlPedido(bebida) {
  // Obtiene pedidos existentes del localStorage o array vacío
  let pedidos = JSON.parse(localStorage.getItem("pedidoCatfecito")) || [];

  // Agrega la bebida al array
  pedidos.push(bebida);

  // Guarda el array actualizado en localStorage
  localStorage.setItem("pedidoCatfecito", JSON.stringify(pedidos));

  // Muestra alerta con SweetAlert2
  Swal.fire({
    title: `¡${bebida.nombre} agregado! 🐾`,
    text: "Tu bebida fue añadida al pedido correctamente.",
    imageUrl: bebida.imagen, // Muestra imagen de la bebida
    imageAlt: `Imagen de ${bebida.nombre}`,
    imageWidth: 200,
    confirmButtonText: "OK",
    confirmButtonColor: "#da8f44", // Color naranja
  });
}
