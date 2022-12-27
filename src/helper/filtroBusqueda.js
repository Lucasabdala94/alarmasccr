//crea un array con las alarmas que coinciden con busquedas.

export async function filtroBusqueda(alarmas, busqueda) {
    let resultado = await alarmas?.filter((alarma) => {
      if (alarma?.data?.et.includes(busqueda)) {
        return alarma;
      }
    });
    return resultado;
}