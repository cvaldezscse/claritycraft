var nombre = "Carlos Valdez";
var altura = 189;

var concatenacion = nombre + " -> " + altura;

// var datos = document.getElementById("datos");

// var html = `
// <h1>Soy la caja de datos</h1>
// <h2>Soy ${nombre}</h2>
// <h3>Mido ${altura} cm </h3>
// `;

// datos.innerHTML = html;

// if (altura >= 190) {
//   datos.innerHTML += `<h1>Eres una persona alta</h1>`;
// } else {
//   datos.innerHTML += `<h1>Eres una persona bajita</h1>`;
// }

// for (var i = 2000; i <= 2020; i++) {
//   datos.innerHTML += `<h5>Estamos en ${i}</h5>`;
// }

function muestraMiNombre(nombre, altura) {
  // Comentario
  var datos = document.getElementById("datos");

  var html = `
    <h1>Soy la caja de datos</h1>
    <h2>Soy ${nombre}</h2>
    <h3>Mido ${altura} cm </h3>`;
  datos.innerHTML = html;
}

muestraMiNombre("nombre", 190);
