/* ================================================
   FALLA — main.js
   Toda la lógica dinámica de la página web
   ================================================ */

'use strict';

/* -----------------------------------------------
   1. MENÚ HAMBURGUESA (móvil)
   ----------------------------------------------- */
const hamburgerBtn = document.getElementById('hamburgerBtn');
const navLinks     = document.getElementById('navLinks');

hamburgerBtn.addEventListener('click', () => {
  navLinks.classList.toggle('abierto');
});

// Cerrar menú al hacer clic en un enlace
navLinks.querySelectorAll('a').forEach(enlace => {
  enlace.addEventListener('click', () => navLinks.classList.remove('abierto'));
});

// Resaltar enlace activo al hacer scroll
const secciones = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  let actual = '';
  secciones.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 80) actual = sec.id;
  });
  navLinks.querySelectorAll('a').forEach(a => {
    a.classList.toggle('activo', a.getAttribute('href') === `#${actual}`);
  });
});


/* -----------------------------------------------
   2. CUENTA ATRÁS — Falles (19 de març)
   ----------------------------------------------- */
function actualizarCuentaAtras() {
  const ahora  = new Date();
  // Calcula la próxima "nit de la cremà" (19 de marzo)
  let anyo = ahora.getFullYear();
  let fallas = new Date(anyo, 2, 19, 0, 0, 0); // 19 marzo
  if (ahora >= fallas) fallas = new Date(anyo + 1, 2, 19, 0, 0, 0);

  const diff = fallas - ahora;
  const dias    = Math.floor(diff / 86400000);
  const horas   = Math.floor((diff % 86400000) / 3600000);
  const minutos = Math.floor((diff % 3600000)  / 60000);
  const segs    = Math.floor((diff % 60000)    / 1000);

  document.getElementById('dias').textContent     = String(dias).padStart(2,'0');
  document.getElementById('horas').textContent    = String(horas).padStart(2,'0');
  document.getElementById('minutos').textContent  = String(minutos).padStart(2,'0');
  document.getElementById('segundos').textContent = String(segs).padStart(2,'0');
}
actualizarCuentaAtras();
setInterval(actualizarCuentaAtras, 1000);


/* -----------------------------------------------
   3. FRASES FALLERAS ALEATORIAS
   ----------------------------------------------- */
const frases = [
  "Tot l'any esperant les Falles, i les Falles passen en un sospir.",
  "Qui no ha vist les Falles de València, no ha vist la festa.",
  "La pólvora ens crida, el foc ens uneix.",
  "Ser faller és una manera de viure.",
  "On hi ha mascletà, hi ha alegria.",
  "Les Falles no s'expliquen, es viuen.",
  "El millor souvenir de les Falles és el record.",
  "Fallera major, reina d'un poble apassionat.",
  "La flama de la tradició no s'apaga mai.",
  "Foc, festa i germanor — això són les Falles!"
];

let fraseActual = 0;
const fraseEl   = document.getElementById('fraseFallera');

function cambiarFrase() {
  fraseEl.style.opacity = '0';
  setTimeout(() => {
    fraseActual = (fraseActual + 1) % frases.length;
    fraseEl.textContent = `"${frases[fraseActual]}"`;
    fraseEl.style.opacity = '1';
  }, 500);
}
setInterval(cambiarFrase, 5000);


/* -----------------------------------------------
   4. REPRESENTANTES
   ----------------------------------------------- */
const representantesData = {
  2025: [
    { nombre: 'Maria García López',    cargo: 'Fallera Major',          emoji: '👑' },
    { nombre: 'Laura Martínez Pérez',  cargo: 'Fallera Major Infantil', emoji: '🌸' },
    { nombre: 'Josep Ferrer Blasco',   cargo: 'President',              emoji: '🎩' },
    { nombre: 'Ana Soler Domingo',     cargo: 'Secretària',             emoji: '📋' },
  ],
  2024: [
    { nombre: 'Carla Romeu Torres',    cargo: 'Fallera Major',          emoji: '👑' },
    { nombre: 'Noa Pla Giner',         cargo: 'Fallera Major Infantil', emoji: '🌸' },
    { nombre: 'Miquel Llopis Vidal',   cargo: 'President',              emoji: '🎩' },
    { nombre: 'Irene Cabrera Font',    cargo: 'Secretària',             emoji: '📋' },
  ],
  2023: [
    { nombre: 'Elena Puig Monfort',    cargo: 'Fallera Major',          emoji: '👑' },
    { nombre: 'Sofia Moll Roca',       cargo: 'Fallera Major Infantil', emoji: '🌸' },
    { nombre: 'Pau Crespo Fuster',     cargo: 'President',              emoji: '🎩' },
    { nombre: 'Marta Ibáñez Costa',    cargo: 'Secretària',             emoji: '📋' },
  ],
  2022: [
    { nombre: 'Cristina Boix March',   cargo: 'Fallera Major',          emoji: '👑' },
    { nombre: 'Vega Sanz Alberola',    cargo: 'Fallera Major Infantil', emoji: '🌸' },
    { nombre: 'Toni Navarro Lozano',   cargo: 'President',              emoji: '🎩' },
    { nombre: 'Gemma Ortiz Pedraza',   cargo: 'Secretària',             emoji: '📋' },
  ],
  2021: [
    { nombre: 'Raquel Valor Gimeno',   cargo: 'Fallera Major',          emoji: '👑' },
    { nombre: 'Inés Benito Saura',     cargo: 'Fallera Major Infantil', emoji: '🌸' },
    { nombre: 'Jordi Camps Segura',    cargo: 'President',              emoji: '🎩' },
    { nombre: 'Pilar Esteban Ruiz',    cargo: 'Secretària',             emoji: '📋' },
  ],
};

function renderRepresentantes(anyo) {
  const grid = document.getElementById('repGrid');
  const data = representantesData[anyo] || [];
  grid.innerHTML = data.map(r => `
    <div class="rep-card">
      <div class="rep-card__foto">${r.emoji}</div>
      <div class="rep-card__nombre">${r.nombre}</div>
      <div class="rep-card__anyo">${anyo}</div>
      <div class="rep-card__cargo">${r.cargo}</div>
    </div>
  `).join('');
}
renderRepresentantes(2025);

document.getElementById('repSelector').addEventListener('click', e => {
  const btn = e.target.closest('button');
  if (!btn) return;
  document.querySelectorAll('#repSelector button').forEach(b => b.classList.remove('activo'));
  btn.classList.add('activo');
  renderRepresentantes(Number(btn.dataset.anyo));
});


/* -----------------------------------------------
   5. MONUMENTOS
   ----------------------------------------------- */
const monumentosData = [
  { titulo: 'L\'Hort Màgic',        autor: 'Manolo García',      anyo: 2025, emoji: '🌱' },
  { titulo: 'Colors de la Festa',   autor: 'Vicent Llopis',      anyo: 2025, emoji: '🎨' },
  { titulo: 'El Temps que Passa',   autor: 'Ana Beltrán',        anyo: 2024, emoji: '⏳' },
  { titulo: 'Riu de Llum',          autor: 'Joan Pérez Fuster',  anyo: 2024, emoji: '💡' },
  { titulo: 'Tradicions',           autor: 'Pilar Monfort',      anyo: 2023, emoji: '🏺' },
  { titulo: 'La Flama Eterna',      autor: 'Tomàs Verdú',        anyo: 2022, emoji: '🔥' },
];

const monGrid = document.getElementById('monGrid');
monGrid.innerHTML = monumentosData.map(m => `
  <div class="mon-card">
    <div class="mon-card__img">${m.emoji}</div>
    <div class="mon-card__info">
      <div class="mon-card__titulo">${m.titulo} (${m.anyo})</div>
      <div class="mon-card__autor">Artista: ${m.autor}</div>
    </div>
  </div>
`).join('');


/* -----------------------------------------------
   6. PREMIOS / PALMARÈS
   ----------------------------------------------- */
const premiosData = [
  { anyo: 2024, monument: 'Riu de Llum',        seccio: 'Especial',  premi: 'Monument',   pos: 1 },
  { anyo: 2024, monument: 'El Temps que Passa',  seccio: '1a',        premi: 'Monument',   pos: 2 },
  { anyo: 2023, monument: 'Tradicions',          seccio: 'Especial',  premi: 'Artística',  pos: 3 },
  { anyo: 2022, monument: 'La Flama Eterna',     seccio: '2a',        premi: 'Monument',   pos: 1 },
  { anyo: 2021, monument: 'Arrels Valencianes',  seccio: '1a',        premi: 'Enginy',     pos: 2 },
  { anyo: 2019, monument: 'El Gran Bullir',      seccio: 'Especial',  premi: 'Monument',   pos: 1 },
];

const badgeClass = { 1: 'badge-1', 2: 'badge-2', 3: 'badge-3' };
const medalla    = { 1: '🥇', 2: '🥈', 3: '🥉' };

document.getElementById('premiosTbody').innerHTML = premiosData.map(p => `
  <tr>
    <td>${p.anyo}</td>
    <td><em>${p.monument}</em></td>
    <td>${p.seccio}</td>
    <td>${p.premi}</td>
    <td>
      <span class="premio-badge ${badgeClass[p.pos] || ''}">
        ${medalla[p.pos] || ''} ${p.pos}r Premi
      </span>
    </td>
  </tr>
`).join('');


/* -----------------------------------------------
   7. CALENDARIO
   ----------------------------------------------- */
const NOMBRES_MES = [
  'ENERO','FEBRERO','MARZO','ABRIL','MAYO','JUNIO',
  'JULIO','AGOSTO','SEPTIEMBRE','OCTUBRE','NOVIEMBRE','DICIEMBRE'
];
const DIAS_SEM = ['Dl','Dt','Dc','Dj','Dv','Ds','Dg'];

// Eventos de la falla (mes 0-indexado)
const eventos = {
  '2025-2-1':  { titulo: 'Plantà',                   hora: '10:00 h' },
  '2025-2-15': { titulo: 'Mascletà',                  hora: '14:00 h' },
  '2025-2-17': { titulo: 'Ofrena de Flors',           hora: '17:00 h' },
  '2025-2-18': { titulo: 'Cavalcada del Foc',         hora: '23:00 h' },
  '2025-2-19': { titulo: "Nit de la Cremà",           hora: '24:00 h' },
  '2025-10-5': { titulo: 'Sopar de Gala',             hora: '21:00 h' },
  '2025-10-12':{ titulo: 'Concurs de Paella',         hora: '12:00 h' },
  '2025-11-20':{ titulo: 'Assemblea General',         hora: '19:00 h' },
};

let calAnyo = new Date().getFullYear();
let calMes  = new Date().getMonth();

function claveFecha(a, m, d) { return `${a}-${m}-${d}`; }

function renderCalendario() {
  document.getElementById('calMes').textContent = `${NOMBRES_MES[calMes]} ${calAnyo}`;
  const grid   = document.getElementById('calGrid');
  const lista  = document.getElementById('calEventos');
  const hoy    = new Date();
  const primero = new Date(calAnyo, calMes, 1).getDay(); // 0=dom
  // Convertir domingo=0 a lunes=0
  const offset  = (primero + 6) % 7;
  const totalDias = new Date(calAnyo, calMes + 1, 0).getDate();

  let html = DIAS_SEM.map(d => `<div class="cal-dia-nombre">${d}</div>`).join('');
  // Huecos iniciales
  for (let i = 0; i < offset; i++) html += `<div class="cal-dia vacio"></div>`;

  const eventosDelMes = [];
  for (let d = 1; d <= totalDias; d++) {
    const clave = claveFecha(calAnyo, calMes, d);
    const esHoy = (hoy.getFullYear() === calAnyo && hoy.getMonth() === calMes && hoy.getDate() === d);
    const tieneEvento = eventos[clave];
    let clases = 'cal-dia';
    if (esHoy)        clases += ' hoy';
    if (tieneEvento)  clases += ' evento';
    html += `<div class="${clases}" data-dia="${d}">${d}</div>`;
    if (tieneEvento) eventosDelMes.push({ dia: d, ...tieneEvento });
  }
  grid.innerHTML = html;

  // Lista de eventos
  if (eventosDelMes.length) {
    lista.innerHTML = eventosDelMes.map(e => `
      <div class="evento-item">
        <div class="evento-fecha">${String(e.dia).padStart(2,'0')}</div>
        <div class="evento-info">
          <strong>${e.titulo}</strong>
          <span>${NOMBRES_MES[calMes]} ${calAnyo} — ${e.hora}</span>
        </div>
      </div>
    `).join('');
  } else {
    lista.innerHTML = `<p style="opacity:.6; font-style:italic;">Cap event programat aquest mes.</p>`;
  }
}
renderCalendario();

document.getElementById('calPrev').addEventListener('click', () => {
  calMes--;
  if (calMes < 0) { calMes = 11; calAnyo--; }
  renderCalendario();
});
document.getElementById('calNext').addEventListener('click', () => {
  calMes++;
  if (calMes > 11) { calMes = 0; calAnyo++; }
  renderCalendario();
});


/* -----------------------------------------------
   8. NOTICIAS
   ----------------------------------------------- */
const noticiasData = [
  {
    fecha: '15 Febrero 2025',
    titulo: 'La comission presenta el nuevo monumento',
    resumen: 'El diseño de este año, a cargo del artista Vicent Llopis, promete sorprender a todo el barrio con una apuesta atrevida y colorida.',
    emoji: '🎭'
  },
  {
    fecha: '10 Febrero 2025',
    titulo: 'Gran éxito del sopar de presentación',
    resumen: 'Más de 200 fallers i falleres es van reunir per celebrar el sopar de presentación dels representants d\'enguany.',
    emoji: '🍽️'
  },
  {
    fecha: '5 Enero 2025',
    titulo: 'Comienza la recogida de cuotas',
    resumen: 'A partir de esta semana, la secretaria de la falla obra el terminio para renovar la cuota anual de fallero.',
    emoji: '📝'
  },
  {
    fecha: '18 Diciembre 2024',
    titulo: "Premio a la mejor escena de humor",
    resumen: 'El ninot satirizando la política local a obtenido el primer premio al mejor ninot de seccion a la nuestra categoria.',
    emoji: '🏆'
  },
  {
    fecha: '20 Noviembre 2024',
    titulo: 'Asamblea general anual',
    resumen: 'La junta directiva va a presentar las cuentas del exercicio y va a aprovar el presupuesto para las Fallas 2025.',
    emoji: '📊'
  },
  {
    fecha: '12 Octubre 2024',
    titulo: 'Gran concurso de paella',
    resumen: 'El concurso de paella se celebró con una participacion record de 30 equipos. Enhorabuena a los ganadores!',
    emoji: '🥘'
  },
];

document.getElementById('noticiasGrid').innerHTML = noticiasData.map(n => `
  <article class="noticia-card">
    <div class="noticia-card__img">${n.emoji}</div>
    <div class="noticia-card__body">
      <div class="noticia-card__fecha">${n.fecha}</div>
      <div class="noticia-card__titulo">${n.titulo}</div>
      <div class="noticia-card__resumen">${n.resumen}</div>
    </div>
  </article>
`).join('');


/* -----------------------------------------------
   9. GALERÍA (placeholder)
   ----------------------------------------------- */
const galeriaEmojis = ['🎆','🎇','🔥','🎭','🌸','💥','🎊','🎉','🌟','✨','🏮','🎈'];

const galeriaGrid = document.getElementById('galeriaGrid');
galeriaGrid.innerHTML = galeriaEmojis.map((e, i) => `
  <div class="galeria-item" data-index="${i}">
    ${e}
  </div>
`).join('');

// Lightbox (con fotos reales añadirías img src)
const lightbox      = document.getElementById('lightbox');
const lightboxClose = document.getElementById('lightboxClose');

galeriaGrid.addEventListener('click', e => {
  const item = e.target.closest('.galeria-item');
  if (!item) return;
  // Con fotos reales: lightboxImg.src = item.querySelector('img').src;
  // Por ahora muestra el emoji en grande
  lightbox.classList.add('activo');
});

lightboxClose.addEventListener('click', () => lightbox.classList.remove('activo'));
lightbox.addEventListener('click', e => {
  if (e.target === lightbox) lightbox.classList.remove('activo');
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') lightbox.classList.remove('activo');
});


/* -----------------------------------------------
   10. LLIBRETS
   ----------------------------------------------- */
const anyosLlibrets = [2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018];
const emojisLlibret = ['📗','📘','📕','📙','📓','📔','📒','📃'];

document.getElementById('llibretsGrid').innerHTML = anyosLlibrets.map((a, i) => `
  <div class="llibret-card">
    <div class="llibret-card__portada">${emojisLlibret[i]}</div>
    <div class="llibret-card__anyo">${a}</div>
  </div>
`).join('');
