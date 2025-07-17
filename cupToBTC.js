const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const cambioCUPaUSD = 375;

console.log(`\n            ***Bienvenido a su convertidor automatico***\n`);
console.log(`
    ██████╗██╗   ██╗██████╗      █████╗     ██████╗ ████████╗ ██████╗              
   ██╔════╝██║   ██║██╔══██╗    ██╔══██╗    ██╔══██╗╚══██╔══╝██╔════╝              
   ██║     ██║   ██║██████╔╝    ███████║    ██████╔╝   ██║   ██║                   
   ██║     ██║   ██║██╔═══╝     ██╔══██║    ██╔══██╗   ██║   ██║                   
   ╚██████╗╚██████╔╝██║         ██║  ██║    ██████╔╝   ██║   ╚██████╗              
    ╚═════╝ ╚═════╝ ╚═╝         ╚═╝  ╚═╝    ╚═════╝    ╚═╝    ╚═════╝              
`);

async function obtenerPrecioBTC() {
  const apis = [
    {
      name: 'CryptoCompare',
      url: 'https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD',
      parse: (data) => data.USD
    },
    {
      name: 'Coinlore',
      url: 'https://api.coinlore.net/api/ticker/?id=90',
      parse: (data) => parseFloat(data[0].price_usd)
    },
    {
      name: 'CoinGecko',
      url: 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd',
      parse: (data) => data.bitcoin.usd
    },
    {
      name: 'CoinCap',
      url: 'https://api.coincap.io/v2/assets/bitcoin',
      parse: (data) => parseFloat(data.data.priceUsd)
    },
    {
      name: 'Coinpaprika',
      url: 'https://api.coinpaprika.com/v1/tickers/btc-bitcoin',
      parse: (data) => data.quotes.USD.price
    }
  ];

  for (const api of apis) {
    try {
      const respuesta = await fetch(api.url);
      const datos = await respuesta.json();
      const precio = api.parse(datos);
      if (precio && !isNaN(precio)) {
        console.log(`Precio obtenido desde ${api.name}: $${Math.floor(precio)}`);
        return Math.floor(precio);
      }
    } catch (error) {
      console.warn(`No se pudo obtener el precio desde ${api.name}:`, error.message);
    }
  }

  console.error("No fue posible obtener el precio de BTC desde ninguna API.");
  return null;
}

function pedirNumero() {
  return new Promise((resolve) => {
    rl.question("Introduce la cantidad en CUP: ", async (respuesta) => {
      const numero = Number(respuesta);
      if (!isNaN(numero) && numero >= 0) {
        resolve(numero);
      } else {
        console.log("El número no es válido. Debe ser un número positivo.");
        resolve(await pedirNumero());
      }
    });
  });
}

(async () => {
  const cambioUSDaBTC = await obtenerPrecioBTC();
  if (!cambioUSDaBTC) {
    console.error("No se puede continuar sin el precio de BTC.");
    rl.close();
    return;
  }

  const cantidadDeCup = await pedirNumero();
  const totalDeBTCporCUP = cantidadDeCup / cambioCUPaUSD / cambioUSDaBTC;

  if (totalDeBTCporCUP <= 0.0009) {
    const cantEnSat = totalDeBTCporCUP * 100_000_000;
    console.log(`${cantidadDeCup} CUP equivale al cambio actual a ${cantEnSat.toFixed()} Satoshis`);
  } else {
    console.log(`${cantidadDeCup} CUP equivale al cambio actual a ${totalDeBTCporCUP.toFixed(6)} BTC`);
  }
  rl.close();
})();
