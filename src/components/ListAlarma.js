export default function ListAlarma(props) {
  const { alarma } = props;
  return (
    <div key={alarma.id} className="containerAlarm">
      <div className="containerAlarm-title">
        <div className="contaienrAlarm-contenido">
          <span> ET : </span> {alarma.et.toUpperCase()}
        </div>
        <div className="contaienrAlarm-contenido">
          <span>Nivel : </span>
          {alarma.nivelTension}
        </div>
      </div>
      <div className="containerAlarm-descripcion">
        <h4 className="containerAlarm-alarmaScada-title">
          Señaliza:
        </h4>
        <div className="containerAlarm-alarmaScada">
          {alarma.alarma.toUpperCase()}
        </div>
        <div>
          <div className="containerAlarm-descripcion">
            {alarma.descripcion}
          </div>
        </div>

      </div>
      <br></br>
      <div className="contenedor-footer-alarm">
        <p className="containerAlarm-alarmaScada-historial">
            {alarma.creado}
        </p>
        <p className="containerAlarm-alarmaScada-historial">
          {capitalizarPrimeraLetra(fecha(alarma.fecha))}
        </p>
        
      </div>
    </div>
  );
}

/*capitalizar primera letra */
function capitalizarPrimeraLetra(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/*Calculo de fecha*/
function fecha(registro) {
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
