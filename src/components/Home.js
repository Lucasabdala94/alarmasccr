import BuscadorAlarms from "./BuscadorAlarms";
import { Icon } from "semantic-ui-react";
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
        <div className="container-user">
        <Icon name="user" />
        <h3>{user?.displayName || user?.email}</h3>
        </div>
        
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