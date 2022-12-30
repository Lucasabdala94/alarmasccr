//crea un array con las alarmas que coinciden con busquedas.

export async function filtroBusqueda(alarmas, busqueda) {
  let resultado = alarmas.filter(alarma => alarma?.data?.et.includes(busqueda));
  return resultado;
}