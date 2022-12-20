import BuscadorAlarms from "./BuscadorAlarms";
import ModalAgregarAlarm from "./AgregarAlarma";
import { useAuth } from "../context/authContext";
import { useState } from "react";

export default function Home() {

  // constantes para recargar las alarmas.
  const [reload, setRelaod] = useState(false);

  // Estados del contexto general.
  const { user, logout } = useAuth();

  //Funcion para cerrar sesion en la aplicacion.
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="App">
      <div className="header">
        <h3>{user?.displayName || user?.email}</h3>
        {/* Boton para cerrar sesion */}
        <button onClick={handleLogout} className="header-btn">salir</button>
      </div>

      <h1>Registro de Alarmas</h1>
      <div className="contenedor-centrador">
        <ModalAgregarAlarm setRelaod={setRelaod} reload={reload} />
      </div>

      <BuscadorAlarms reload={reload} />
    </div>
  );
}