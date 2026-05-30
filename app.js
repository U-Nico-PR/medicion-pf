// ==========================================
// 1. MATRICES DE CONOCIMIENTO (DATOS PUROS)
// ==========================================

const COMPLEJIDAD_TABLAS = {
    ILF: (ret, det) => {
        if (ret === 1) return det <= 19 ? 'Bajo' : det <= 50 ? 'Bajo' : 'Medio';
        if (ret >= 2 && ret <= 5) return det <= 19 ? 'Bajo' : det <= 50 ? 'Medio' : 'Alto';
        return det <= 19 ? 'Medio' : det <= 50 ? 'Alto' : 'Alto';
    },
    EIF: (ret, det) => COMPLEJIDAD_TABLAS.ILF(ret, det), // Comparte matriz con ILF
    EI: (ftr, det) => {
        if (ftr <= 1) return det <= 4 ? 'Bajo' : det <= 15 ? 'Bajo' : 'Medio';
        if (ftr === 2) return det <= 4 ? 'Bajo' : det <= 15 ? 'Medio' : 'Alto';
        return det <= 4 ? 'Medio' : det <= 15 ? 'Alto' : 'Alto';
    },
    EO: (ftr, det) => { // Mismo comportamiento de EQ/Matriz transaccional de salida estándar
        if (ftr <= 1) return det <= 5 ? 'Bajo' : det <= 19 ? 'Bajo' : 'Medio';
        if (ftr >= 2 && ftr <= 3) return det <= 5 ? 'Bajo' : det <= 19 ? 'Medio' : 'Alto';
        return det <= 5 ? 'Medio' : det <= 19 ? 'Alto' : 'Alto';
    },
    EQ: (ftr, det) => {
        if (ftr <= 1) return det <= 5 ? 'Bajo' : det <= 19 ? 'Bajo' : 'Medio';
        if (ftr >= 2 && ftr <= 3) return det <= 5 ? 'Bajo' : det <= 19 ? 'Medio' : 'Alto';
        return det <= 5 ? 'Medio' : det <= 19 ? 'Alto' : 'Alto';
    }
};

const PUNTOS_PESO = {
    ILF: { Bajo: 7, Medio: 10, Alto: 15 },
    EIF: { Bajo: 5, Medio: 7, Alto: 10 },
    EI:  { Bajo: 3, Medio: 4, Alto: 6 },
    EO:  { Bajo: 4, Medio: 5, Alto: 7 },
    EQ:  { Bajo: 3, Medio: 4, Alto: 6 }
};

const GSC_PREGUNTAS = [
    { id: 1, name: "Comunicación de Datos", desc: "0: Stand-alone a 5: Redes dedicadas alta velocidad." },
    { id: 2, name: "Procesamiento Distribuido", desc: "0: Servidor único a 5: Cloud computing / balanceo dinámico." },
    { id: 3, name: "Rendimiento (Performance)", desc: "0: Sin requisitos a 5: Tiempo real estricto." },
    { id: 4, name: "Configuración del Equipamiento", desc: "0: Hardware de sobra a 5: Dispositivos embebidos limitados." },
    { id: 5, name: "Tasa de Transacciones", desc: "0: 10 al día a 5: Millones por minuto." },
    { id: 6, name: "Entrada de Datos en Línea", desc: "0: Todo batch a 5: Más del 30% interactivo." },
    { id: 7, name: "Eficiencia del Usuario Final", desc: "0: Consola de texto a 5: UX optimizado para alta velocidad." },
    { id: 8, name: "Actualización en Línea", desc: "0: Batch nocturno a 5: Réplica inmediata en tiempo real." },
    { id: 9, name: "Procesamiento Complejo", desc: "0: Movimiento simple a 5: Criptografía o IA avanzada." },
    { id: 10, name: "Reusabilidad", desc: "0: Un solo proyecto a 5: Framework base institucional." },
    { id: 11, name: "Facilidad de Instalación", desc: "0: Sin requisitos a 5: Despliegue automatizado masivo (K8s)." },
    { id: 12, name: "Facilidad de Operación", desc: "0: Sin mantenimiento a 5: Autogestión (Self-healing)." },
    { id: 13, name: "Ubicaciones Múltiples", desc: "0: Un solo sitio a 5: Configuración dinámica por geolocalización." },
    { id: 14, name: "Facilidad de Cambio", desc: "0: Hard-coded a 5: Motor de reglas visual." }
];

// ==========================================
// 2. ESTADO DE LA APLICACIÓN
// ==========================================
let funcionesAgregadas = [];

// ==========================================
// 3. LÓGICA DE NEGOCIO / CÁLCULOS
// ==========================================
function calcularComplejidadYPuntos(tipo, retFtr, det) {
    const complejidad = COMPLEJIDAD_TABLAS[tipo](retFtr, det);
    const puntos = PUNTOS_PESO[tipo][complejidad];
    return { complejidad, puntos };
}

function calcularTotales() {
    // 1. Calcular PF No Ajustados (PFNA)
    const pfna = funcionesAgregadas.reduce((sum, f) => sum + f.puntos, 0);

    // 2. Calcular Grado de Influencia (DI) de las GSC
    let sumGsc = 0;
    GSC_PREGUNTAS.forEach(q => {
        const selectEl = document.getElementById(`gsc-${q.id}`);
        if (selectEl) sumGsc += parseInt(selectEl.value) || 0;
    });

    // 3. Factor de Ajuste de Valor (VAF)
    const vaf = 0.65 + (0.01 * sumGsc);

    // 4. Puntos de Función Ajustados (PFA)
    const pfa = pfna * vaf;

    // === CÁLCULOS ADICIONALES DE ESTIMACIÓN ===
    const productividad = parseFloat(document.getElementById('proj-prod').value) || 0;
    const costoHora = parseFloat(document.getElementById('proj-cost').value) || 0;
    
    // Esfuerzo = PFA * Productividad (Horas totales requeridas)
    const esfuerzo = pfa * productividad;
    const costoTotal = esfuerzo * costoHora;

    // Inputs condicionales del usuario
    const inputPersonas = document.getElementById('proj-team').value;
    const inputMeses = document.getElementById('proj-months').value;

    let duracionTexto = "Falta definir personal";
    let personalTexto = "Falta definir duración";

    // Si el usuario ingresó Cantidad de Personas -> Calculamos duración en meses
    if (inputPersonas && !isNaN(inputPersonas) && parseInt(inputPersonas) > 0) {
        const numPersonas = parseInt(inputPersonas);
        const mesesCalculados = esfuerzo / (numPersonas * 160);
        duracionTexto = `${mesesCalculados.toFixed(1)} Meses`;
        personalTexto = `${numPersonas} Persona(s) [Fijado]`;
    } 
    // Si el usuario ingresó Duración en Meses (Entero) -> Calculamos cantidad de personas
    else if (inputMeses && !isNaN(inputMeses) && parseInt(inputMeses) > 0) {
        const numMeses = parseInt(inputMeses);
        const personasCalculadas = esfuerzo / (numMeses * 160);
        personalTexto = `${personasCalculadas.toFixed(1)} Personas`;
        duracionTexto = `${numMeses} Mes(es) [Fijado]`;
    }

    // === RENDERIZAR EN INTERFAZ DE USUARIO (MODAL) ===
    document.getElementById('total-ufp').textContent = pfna;
    document.getElementById('total-gsc-sum').textContent = sumGsc; 
    document.getElementById('total-vaf').textContent = vaf.toFixed(2);
    document.getElementById('total-afp').textContent = pfa.toFixed(2);

    // Renderizar métricas del negocio
    document.getElementById('res-esfuerzo').textContent = `${esfuerzo.toFixed(1)} hrs`;
    document.getElementById('res-costo').textContent = `$${costoTotal.toLocaleString('es-MX', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
    document.getElementById('res-duracion').textContent = duracionTexto;
    document.getElementById('res-personal').textContent = personalTexto;
}

// ==========================================
// 4. MANEJO DEL DOM / CONTROLADOR
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    inicializarGSC();
    setupEventos();
});

function inicializarGSC() {
    const container = document.getElementById('gsc-container');
    GSC_PREGUNTAS.forEach(q => {
        const item = document.createElement('div');
        item.className = 'gsc-item';
        item.innerHTML = `
            <label for="gsc-${q.id}"><strong>${q.id}. ${q.name}</strong></label>
            <p style="font-size:0.75rem; color:var(--text-light); margin-bottom:0.5rem;">${q.desc}</p>
            <select id="gsc-${q.id}" class="gsc-select" style="width:100%">
                <option value="0">0 - Inexistente / No aplica</option>
                <option value="1">1 - Incidental</option>
                <option value="2">2 - Moderado</option>
                <option value="3">3 - Medio</option>
                <option value="4">4 - Significativo</option>
                <option value="5">5 - Esencial / Crítico</option>
            </select>
        `;
        container.appendChild(item);
    });
}

function setupEventos() {
    const tipoSelect = document.getElementById('func-type');
    const labelRetFtr = document.getElementById('label-ret-ftr');
    const form = document.getElementById('function-form');
    
    // Componentes del Modal
    const modal = document.getElementById('result-modal');
    const btnOpenModal = document.getElementById('btn-open-modal');
    const modalClose = document.querySelector('.modal-close');

    // Cambiar etiquetas dinámicamente según el tipo de función
    tipoSelect.addEventListener('change', (e) => {
        const tipo = e.target.value;
        if (tipo === 'ILF' || tipo === 'EIF') {
            labelRetFtr.textContent = "RETs (Tipos de Registro):";
        } else {
            labelRetFtr.textContent = "FTRs (Archivos Consultados):";
        }
    });

    // Control mutuo de los inputs condicionales (limpiar el opuesto para evitar conflictos)
    document.getElementById('proj-team').addEventListener('input', () => {
        document.getElementById('proj-months').value = '';
    });
    document.getElementById('proj-months').addEventListener('input', () => {
        document.getElementById('proj-team').value = '';
    });

    // Eventos para abrir y cerrar la ventana emergente (Modal)
    btnOpenModal.addEventListener('click', () => {
        calcularTotales(); // Ejecuta los cálculos con la información actual
        modal.style.display = 'flex'; // Muestra la ventana
    });

    modalClose.addEventListener('click', () => {
        modal.style.display = 'none'; // Cierra la ventana
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none'; // Cierra haciendo clic fuera del cuadro
        }
    });

    // Manejar el envío del formulario de componentes
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const nombre = document.getElementById('func-name').value;
        const tipo = document.getElementById('func-type').value;
        const retFtr = parseInt(document.getElementById('func-ret-ftr').value);
        const det = parseInt(document.getElementById('func-det').value);

        const { complejidad, puntos } = calcularComplejidadYPuntos(tipo, retFtr, det);

        const nuevaFuncion = { id: Date.now(), nombre, tipo, retFtr, det, complejidad, puntos };
        funcionesAgregadas.push(nuevaFuncion);

        renderTablas();
        form.reset();
        tipoSelect.dispatchEvent(new Event('change'));
    });
}

function renderTablas() {
    const tbody = document.querySelector('#functions-table tbody');
    tbody.innerHTML = '';

    funcionesAgregadas.forEach(f => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>${f.nombre}</strong></td>
            <td><span class="badge">${f.tipo}</span></td>
            <td>${f.retFtr}</td>
            <td>${f.det}</td>
            <td>${f.complejidad}</td>
            <td><strong>${f.puntos} PF</strong></td>
            <td><button class="btn-danger" data-id="${f.id}">Eliminar</button></td>
        `;
        
        tr.querySelector('.btn-danger').addEventListener('click', (e) => {
            const idEliminar = parseInt(e.target.getAttribute('data-id'));
            funcionesAgregadas = funcionesAgregadas.filter(item => item.id !== idEliminar);
            renderTablas();
            calcularTotales();
        });

        tbody.appendChild(tr);
    });
}