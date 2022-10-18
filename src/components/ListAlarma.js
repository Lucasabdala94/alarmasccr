export default function ListAlarma(props) {
  const { alarma } = props;
  return (
    <div key={alarma.id} className="containerAlarm">
      <div className="containerAlarm-title">
        <p className="contaienrAlarm-contenido">
          <span> ET : </span> {alarma.et.toUpperCase()}
        </p>
        <p className="contaienrAlarm-contenido">
          <span>Nivel : </span>
          {alarma.nivelTension}
        </p>
      </div>
      <div className="containerAlarm-descripcion">
        <h4 className="containerAlarm-alarmaScada-title">
          Señaliza:
        </h4>
        <p className="containerAlarm-alarmaScada">
          {alarma.alarma.toUpperCase()}
        </p>
        <div>
          <p className="containerAlarm-descripcion">
            {alarma.descripcion}
          </p>
        </div>

      </div>
      <br></br>
      <p className="containerAlarm-alarmaScada-historial">
        {capitalizarPrimeraLetra(fecha(alarma.fecha))}
      </p>
      <p className="containerAlarm-alarmaScada-historial">
        {alarma.creado}
      </p>
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
