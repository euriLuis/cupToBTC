const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

//valores de cambio.
const cambioUSDaBTC = obtenerPrecioBTC();
const cambioCUPaUSD = 375;

console.log(`
            ***Bienvenido a su convertidor automatico***
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

//obtener la cantidad que desea calcular el usuario 
function pedirNumero() {
  return new Promise((resolve) => {
    rl.question("Introduce la cantidad en CUP:", (respuesta) => {
      const numero = Number(respuesta);
      if (!isNaN(numero) && numero >= 0) {
        resolve(numero);
      } else {
        console.log("El número no es válido");
        console.log(`Debe ser un número positivo y que no contenga
ningún otro tipo de caracter`);
        resolve(pedirNumero());
      }
    });
  });
}

(async () => {
  let cantidadDeCup = await pedirNumero();
  let totalDeBTCporCUP = await cantidadDeCup / cambioCUPaUSD /await cambioUSDaBTC;

  
  if(await totalDeBTCporCUP <= 0.0009){
    let cantEnSat = await totalDeBTCporCUP * 100000000;
    console.log(await cantidadDeCup + " CUP equivale al cambio actual a " + await cantEnSat.toFixed() + " Satochis");
  }else{
    console.log(await cantidadDeCup + " CUP equivale al cambio actual a " + await totalDeBTCporCUP.toFixed(3) + " BTC")
  }
  rl.close();
})();

