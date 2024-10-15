function calcular() {
  const lambda = parseFloat(document.getElementById("lambda").value);
  const mu = parseFloat(document.getElementById("mu").value);
  const c = parseInt(document.getElementById("c").value);

  if (isNaN(lambda) || isNaN(mu) || lambda <= 0 || mu <= 0 || c <= 0) {
    alert("Por favor ingrese valores válidos para los parámetros.");
    return;
  }

  let rho;
  let resultadosHTML = "";

  if (c === 1) {
    rho = lambda / mu; 
    const P0 = 1 - rho;
    const Lq = (lambda * lambda) / (mu * (mu - lambda));
    const Ls = Lq + lambda / mu;
    const Wq = Lq / lambda;
    const Ws = Wq + 1 / mu;
    const Pw = rho;

    resultadosHTML = `
              <h1>M/M/1</h1>
              <p><strong>Factor de utilización (&rho;):</strong> ${rho.toFixed(
                4
              )}</p>
              <p><strong>Probabilidad de que no haya unidades en el sistema (P0):</strong> ${P0.toFixed(
                4
              )}</p>
              <p><strong>Número promedio de unidades en cola (Lq):</strong> ${Lq.toFixed(
                4
              )}</p>
              <p><strong>Número promedio de unidades en el sistema (Ls):</strong> ${Ls.toFixed(
                4
              )}</p>
              <p><strong>Tiempo promedio que una unidad pasa en una cola (Wq):</strong> ${Wq.toFixed(
                4
              )} horas</p>
              <p><strong>Tiempo promedio que una unidad pasa en el sistema (Ws):</strong> ${Ws.toFixed(
                4
              )} horas</p>
              <p><strong>Probabilidad de que una unidad que llega tenga que esperar por el servicio (Pw):</strong> ${
                Pw.toFixed(2) * 100
              }%</p>
          `;
  } else {
    rho = lambda / (mu * c);
    const P0 = calcularP0(lambda, mu, c);
    const Lq =
      P0 *
      (Math.pow(lambda / mu, c + 1) /
        (factorial(c - 1) * Math.pow(c - lambda / mu, 2)));
    const Lq2 = Math.pow(lambda, 2) / (mu * (mu * c - lambda)); //este No
    const Ls = Lq + lambda / mu;
    const Wq = Lq / lambda;
    const Ws = Wq + 1 / mu;
    const Pw = rho;

    resultadosHTML = `
              <h1>M/M/C</h1>
              <p><strong>Factor de utilización (&rho;):</strong> ${rho.toFixed(
                4
              )}</p>
              <p><strong>Probabilidad de que no haya unidades en el sistema (P0):</strong> ${P0.toFixed(
                4
              )}</p>
              <p><strong>Número promedio de unidades en cola (Lq):</strong> ${Lq.toFixed(
                4
              )}</p>
              <p><strong>Número promedio de unidades en el sistema (Ls):</strong> ${Ls.toFixed(
                4
              )}</p>
              <p><strong>Tiempo promedio que una unidad pasa en una cola (Wq):</strong> ${Wq.toFixed(
                4
              )} horas</p>
              <p><strong>Tiempo promedio que una unidad pasa en el sistema (Ws):</strong> ${Ws.toFixed(
                4
              )} horas</p>
              <p><strong>Probabilidad de que una unidad que llega tenga que esperar por el servicio (Pw):</strong> ${
                Pw.toFixed(2) * 100
              }%</p>
          `;
  }

  document.getElementById("resultados").innerHTML = resultadosHTML;
  actualizarBarra(rho);
}

function calcularP0(lambda, mu, c) {
  const rho = lambda / (mu * c);
  const sumatoria = Array.from({ length: c }).reduce(
    (acc, _, n) => acc + Math.pow(lambda / mu, n) / factorial(n),
    0);
  const P0 =
    1 / (sumatoria + Math.pow(lambda / mu, c) / (factorial(c) * (1 - rho)));
  return P0;
}

function factorial(n) {
  if (n === 0 || n === 1) return 1;
  return n * factorial(n - 1);
}

function actualizarBarra(rho) {
  const barraOcupado = document.getElementById("barraOcupado");
  const barraLibre = document.getElementById("barraLibre");
  const porcentajeOcupado = (rho * 100).toFixed(2);
  const porcentajeLibre = ((1 - rho) * 100).toFixed(2);

  barraOcupado.style.width = `${porcentajeOcupado}%`;


  if (rho >= 0.90) {
    barraOcupado.style.backgroundColor = "red"; 
    document.getElementById(
      "porcentaje"
    ).innerHTML = `Tiempo ocupado: ${porcentajeOcupado}% | Tiempo libre: ${porcentajeLibre}%<br><strong>Saturado</strong>`;
  } else if (rho >= 0.81) {
    barraOcupado.style.backgroundColor = "yellow"; 
    document.getElementById(
      "porcentaje"
    ).innerHTML = `Tiempo ocupado: ${porcentajeOcupado}% | Tiempo libre: ${porcentajeLibre}%<br><strong>Cercano a saturación</strong>`;
  } else {
    barraOcupado.style.backgroundColor = "#2196F3"; 
    document.getElementById(
      "porcentaje"
    ).innerHTML = `Tiempo ocupado: ${porcentajeOcupado}% | Tiempo libre: ${porcentajeLibre}%`;
  }

  barraLibre.style.width = `${porcentajeLibre}%`;
}
