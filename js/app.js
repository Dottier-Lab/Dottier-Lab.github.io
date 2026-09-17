/* =========================================================
   FUNCIONES DE LA PÁGINA

   No necesitas modificar este archivo para cambiar textos,
   colores, imágenes ni datos de contacto.
   ========================================================= */

const configuracion = window.CONFIGURACION || {};

/* Datos de empresa */
document.querySelectorAll("[data-empresa]").forEach((elemento) => {
  elemento.textContent = configuracion.nombreEmpresa || "TALLMA";
});

document.querySelectorAll("[data-phone]").forEach((elemento) => {
  elemento.textContent = configuracion.telefonoVisible || "";
});

document.querySelectorAll("[data-phone-link]").forEach((elemento) => {
  const telefono = (configuracion.numeroWhatsApp || "").replace(/\D/g, "");
  elemento.href = telefono ? `tel:+${telefono}` : "#contacto";
});

document.querySelectorAll("[data-email]").forEach((elemento) => {
  elemento.textContent = configuracion.correo || "";
});

document.querySelectorAll("[data-email-link]").forEach((elemento) => {
  elemento.href = configuracion.correo
    ? `mailto:${configuracion.correo}`
    : "#contacto";
});

/* Enlaces de WhatsApp */
document.querySelectorAll("[data-whatsapp]").forEach((enlace) => {
  const numero = (configuracion.numeroWhatsApp || "").replace(/\D/g, "");
  const mensaje = encodeURIComponent(configuracion.mensajeWhatsApp || "Hola");

  if (numero) {
    enlace.href = `https://wa.me/${numero}?text=${mensaje}`;
    enlace.target = "_blank";
    enlace.rel = "noopener noreferrer";
  } else {
    enlace.href = "#contacto";
  }
});

/* Menú para celulares */
const botonMenu = document.querySelector(".menu-button");
const menu = document.querySelector(".main-menu");

function cerrarMenu() {
  if (!botonMenu || !menu) return;
  botonMenu.setAttribute("aria-expanded", "false");
  botonMenu.setAttribute("aria-label", "Abrir menú");
  menu.classList.remove("open");
  document.body.classList.remove("menu-open");
}

if (botonMenu && menu) {
  botonMenu.addEventListener("click", () => {
    const abierto = botonMenu.getAttribute("aria-expanded") === "true";
    botonMenu.setAttribute("aria-expanded", String(!abierto));
    botonMenu.setAttribute("aria-label", abierto ? "Abrir menú" : "Cerrar menú");
    menu.classList.toggle("open", !abierto);
    document.body.classList.toggle("menu-open", !abierto);
  });

  menu.querySelectorAll("a").forEach((enlace) => {
    enlace.addEventListener("click", cerrarMenu);
  });
}

document.addEventListener("keydown", (evento) => {
  if (evento.key === "Escape") cerrarMenu();
});

/* Entrada suave de cada bloque */
const elementosAnimados = document.querySelectorAll("[data-reveal]");

if ("IntersectionObserver" in window) {
  const observador = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          entrada.target.classList.add("visible");
          observador.unobserve(entrada.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  elementosAnimados.forEach((elemento) => observador.observe(elemento));
} else {
  elementosAnimados.forEach((elemento) => elemento.classList.add("visible"));
}

/* Indicador naranja de avance y menú activo */
const barra = document.querySelector(".scroll-progress span");
const secciones = document.querySelectorAll("main section[id]");
const enlacesMenu = document.querySelectorAll('.main-menu a[href^="#"]');

function actualizarPagina() {
  const altura = document.documentElement.scrollHeight - window.innerHeight;
  const avance = altura > 0 ? (window.scrollY / altura) * 100 : 0;
  if (barra) barra.style.width = `${Math.min(avance, 100)}%`;

  let idActual = "";
  secciones.forEach((seccion) => {
    if (window.scrollY >= seccion.offsetTop - 160) idActual = seccion.id;
  });

  enlacesMenu.forEach((enlace) => {
    enlace.classList.toggle("active", enlace.getAttribute("href") === `#${idActual}`);
  });
}

window.addEventListener("scroll", actualizarPagina, { passive: true });
window.addEventListener("resize", actualizarPagina);
actualizarPagina();

/* Año automático */
const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();
