function calcular() {
    const lambda = parseFloat(document.getElementById('lambda').value);
    const mu = parseFloat(document.getElementById('mu').value);
    const c = parseInt(document.getElementById('c').value);

    if (isNaN(lambda) || isNaN(mu) || lambda <= 0 || mu <= 0) {
        alert("Por favor ingrese valores válidos para los parámetros.");
        return;
    }

    const rho = lambda / mu;

    // Probabilidad de que no haya unidades en el sistema
    const P0 = 1 - rho;

    // Probabilidad de que haya n unidades en el sistema
    const Pn = rho * P0;

    // Número promedio de unidades en cola
    const Lq = (lambda * lambda) / (mu * (mu - lambda));

    // Número promedio de unidades en el sistema
    const Ls = Lq + (lambda / mu);

    // Tiempo promedio que una unidad pasa en una cola
    const Wq = Lq / lambda;

    // Tiempo promedio que una unidad pasa en el sistema
    const Ws = Wq + (1 / mu);

    // Probabilidad de que una unidad que llega tenga que esperar por el servicio
    const Pw = rho;

    // Mostrar resultados con 2 decimales
    const resultadosHTML = `
        <p><strong>Factor de utilización (&rho;):</strong> ${rho.toFixed(2)}</p>
        <p><strong>Probabilidad de que no haya unidades en el sistema (P0):</strong> ${P0.toFixed(4)}</p>
        <p><strong>Probabilidad de que haya n unidades en el sistema (Pn):</strong> ${Pn.toFixed(4)}</p>
        <p><strong>Número promedio de unidades en cola (Lq):</strong> ${Lq.toFixed(4)}</p>
        <p><strong>Número promedio de unidades en el sistema (Ls):</strong> ${Ls.toFixed(2)}</p>
        <p><strong>Tiempo promedio que una unidad pasa en una cola (Wq):</strong> ${Wq.toFixed(4)} horas</p>
        <p><strong>Tiempo promedio que una unidad pasa en el sistema (Ws):</strong> ${Ws.toFixed(4)} horas</p>
        <p><strong>Probabilidad de que una unidad que llega tenga que esperar por el servicio (Pw):</strong> ${Pw.toFixed(4)}</p>
    `;

    document.getElementById('resultados').innerHTML = resultadosHTML;

    // Actualizar barra de porcentaje
    actualizarBarra(rho);
}

function actualizarBarra(rho) {
    const barraOcupado = document.getElementById('barraOcupado');
    const barraLibre = document.getElementById('barraLibre');
    const porcentajeOcupado = (rho * 100).toFixed(2);
    const porcentajeLibre = ((1 - rho) * 100).toFixed(2);

    barraOcupado.style.width = `${porcentajeOcupado}%`;

    // Cambiar color de la barra y mostrar mensaje de saturación
    if (rho >= 1) {
        barraOcupado.style.backgroundColor = "red"; // Color rojo
        document.getElementById('porcentaje').innerHTML = `Tiempo ocupado: ${porcentajeOcupado}% | Tiempo libre: ${porcentajeLibre}%<br><strong>Saturado</strong>`;
    } else if (rho >= 0.9) {
        barraOcupado.style.backgroundColor = "yellow"; // Color amarillo
        document.getElementById('porcentaje').innerHTML = `Tiempo ocupado: ${porcentajeOcupado}% | Tiempo libre: ${porcentajeLibre}%<br><strong>Cercano a saturación</strong>`;
    } else {
        barraOcupado.style.backgroundColor = "#2196F3"; // Color original
        document.getElementById('porcentaje').innerHTML = `Tiempo ocupado: ${porcentajeOcupado}% | Tiempo libre: ${porcentajeLibre}%`;
    }

    barraLibre.style.width = `${porcentajeLibre}%`;
}

