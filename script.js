// ===========================
// Estructura cineploplis
// ===========================

// Películas/salas disponibles
const cartelera = [
  { sala: "Sala 1", pelicula: "Superman", horario: "20:00", clasificacion: "+7" },
  { sala: "Sala 2", pelicula: "Los 4 Fantásticos: Primeros pasos", horario: "18:30", clasificacion: "TE" }
];

// Cine con salas y añadir sala
const Cine = {
  nombre: "CinePLOPlis",
  salas: {},

  agregarSala(id) {
    this.salas[id] = { id, reservados: [] };
    logAccion(`Sala ${id} creada.`);
  }
};

// ==========================
//  FUNCIONES 
// ==========================

// Reservar asiento
function reservar() {
  const salaId = document.getElementById("salaSelect").value;
  const asiento = prompt("Ingresa el asiento a reservar (ej: B3):");

  if (!validarAsiento(asiento)) {
    mostrarResultado("Formato inválido. Usa A1 a E5.");
    return;
  }

  const sala = Cine.salas[salaId];
  if (sala.reservados.includes(asiento)) {
    mostrarResultado(`El asiento ${asiento} ya está reservado.`);
    return;
  }

  sala.reservados.push(asiento);
  mostrarResultado(`¡Tu asiento ${asiento} está reservado! Disfruta la función`);
  logAccion(`Reservado: ${asiento} en ${salaId}`);
}

// Cancelar reserva
function cancelar() {
  const salaId = document.getElementById("salaSelect").value;
  const asiento = prompt("Ingresa el asiento a cancelar:");

  if (!validarAsiento(asiento)) {
    mostrarResultado("Formato inválido. Usa A1 a E5.");
    return;
  }

  const sala = Cine.salas[salaId];
  if (!sala.reservados.includes(asiento)) {
    mostrarResultado(`El asiento ${asiento} no está reservado.`);
    return;
  }

  sala.reservados = sala.reservados.filter(a => a !== asiento);
  mostrarResultado(`🔄 Reserva cancelada para asiento ${asiento}`);
  logAccion(`Cancelado: ${asiento} en ${salaId}`);
}

// ===============================
// ADICIONALES :B
// ===============================

// Validación asiento
function validarAsiento(asiento) {
  return /^[A-E][1-5]$/.test(asiento);
}

// consola 
function mostrarResultado(texto) {
  console.log(texto);
}

function logAccion(texto) {
  console.log(texto);
}

// Renderiza el selector de salas
function renderSelectorSalas() {
  const selector = document.getElementById("salaSelect");
  cartelera.forEach(peli => {
    const option = document.createElement("option");
    option.value = peli.sala;
    option.text = `${peli.sala} - ${peli.pelicula}`;
    selector.appendChild(option);
  });
}

// claro/oscuro
document.getElementById("modoBtn").addEventListener("click", () => {
  document.body.classList.toggle("light");
});

// Inicializar
function iniciarCine() {
  cartelera.forEach(peli => Cine.agregarSala(peli.sala));
  renderSelectorSalas();

  document.getElementById("reservarBtn").addEventListener("click", reservar);
  document.getElementById("cancelarBtn").addEventListener("click", cancelar);
}

document.addEventListener("DOMContentLoaded", iniciarCine);
