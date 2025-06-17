
# Convertidor de CUP a BTC

Este es un pequeño programa en Node.js que permite convertir **pesos cubanos (CUP)** a **Bitcoin (BTC)** utilizando tasas de cambio actualizadas. La tasa USD/BTC se obtiene en tiempo real desde una API pública, y se usa un valor fijo para el cambio CUP/USD.

---

## 🚀 Características

- Conversión directa de CUP a BTC o satoshis.
- Tasa de cambio de BTC actualizada automáticamente desde la API de [Coinlore](https://www.coinlore.com/).
- Manejo de errores en caso de que falle la API (usa una tasa alternativa).
- Interfaz por línea de comandos.
- Validación de entrada del usuario.

---

## 📦 Requisitos

- Node.js (v18 o superior recomendado)
- Conexión a internet para obtener el precio en tiempo real de BTC

---

## ⚙️ Instalación y ejecución

1. Clona este repositorio:
   ```bash
   git clone https://github.com/euriLuis/cupToBTC.git
   cd cupToBTC
   ```

2. Ejecuta el programa:
   ```bash
   node cupToBTC.js
   ```

3. Ingresa la cantidad en CUP cuando se te solicite.
4. Ten en cuenta que debe ser un número positivo y que solo se admiten caracteres numéricos.

---

## 💡 Ejemplo de uso

```bash
***Bienvenido a su convertidor automatico***

Introduce la cantidad en CUP: 1500
1500 CUP equivale al cambio actual a 5964 Satoshis
```

---

## 🔧 Notas técnicas

- El valor de 1 USD se fija en **375 CUP**. Puedes modificar esta tasa cambiaria directamente en el archivo `cupToBTC.js`:
  ```js
  const cambioCUPaUSD = 375;
  ```

- La tasa de BTC se obtiene mediante una petición a:  
  `https://api.coinlore.net/api/ticker/?id=90`

- Si la API no responde, el script utilizará una tasa alternativa de **105,000 USD por BTC**.

---

## ✨ Autor

Desarrollado por **Euri Luis Veranes Santo**.  
¡Si te resulta útil, considera darle una estrella al repositorio!
