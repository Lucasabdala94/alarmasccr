/*transforma fecha a formato ej. lunes,26 de diciembre de 2022*/
export function transformFecha(registro) {
    const calculoFecha = new Date(registro.toDate());
  
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    const fechaEntrega = calculoFecha.toLocaleDateString('es-ES', options);
    return fechaEntrega.toString();
  }
  