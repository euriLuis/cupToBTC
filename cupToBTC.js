const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

//valores de cambio.
//const cambioUSDaBTC = obtenerPrecioBTC();
const cambioCUPaUSD = 375;

console.log(`
            ***Bienvenido a su converidor automatico***
            `)
console.log(
    `    ██████╗██╗   ██╗██████╗      █████╗     ██████╗ ████████╗ ██████╗              
   ██╔════╝██║   ██║██╔══██╗    ██╔══██╗    ██╔══██╗╚══██╔══╝██╔════╝              
   ██║     ██║   ██║██████╔╝    ███████║    ██████╔╝   ██║   ██║                   
   ██║     ██║   ██║██╔═══╝     ██╔══██║    ██╔══██╗   ██║   ██║                   
   ╚██████╗╚██████╔╝██║         ██║  ██║    ██████╔╝   ██║   ╚██████╗              
    ╚═════╝ ╚═════╝ ╚═╝         ╚═╝  ╚═╝    ╚═════╝    ╚═╝    ╚═════╝
    `
);


//obtener el precio de btc desde la api.
async function obtenerPrecioBTC() {
  try {
    const respuesta = await fetch('https://api.coinlore.net/api/ticker/?id=90');
    const datos = await respuesta.json();
    return Math.floor(datos[0].price_usd);
  } catch (error) {
    console.error("Hemos tenido problemas para obtener el precio en tiempo real de BTC.");
    let precioALt = 105000;
    console.log("Usaremos en cambio una tasa de " + precioALt + "USD por Bitcon, hasta que se solucione el problema");
    return precioALt;
  }
}

obtenerPrecioBTC();


//obtener la cantidad que desea calcular el usuario 
function preguntaConValidacion(texto, validador) {
  return new Promise((resolve) => {
    function preguntar() {
      rl.question(texto, (respuesta) => {
        console.log(typeof respuesta);
        if (validador(respuesta)) {
          resolve(respuesta);
        } else {
          console.log('Entrada inválida, intenta de nuevo.');
          preguntar();
        }
      });
    }
    preguntar();
  });
}

async function main() {
    
  const edad = await preguntaConValidacion(
    
    'Ingresa tu edad (número): ',
    (input) => !isNaN(input) && input > 0
  );
  console.log(`Tu edad es: ${edad}`);
  rl.close();
}

main();

