import { Fragment, useState } from "react";
import { Icon } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/authContext";
import BuscadorAlarms from "./BuscadorAlarms"
import AgregarAlarma from "./AgregarAlarma";

export default function Home() {

  // constantes para recargar las alarmas.
  const [reload, setReload] = useState(false);

  // Estados del contexto general.
  const { user, logout } = useAuth();

  //constante del reacRouter para navegar a otra pagina.
  const navigate= useNavigate();

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
      {user?.email=== "administrador@gmail.com" && 
      <div className="contenedor-menu-admin">
        <div className="contenedor-centrador">
          <h1>Registro de Alarmas</h1>
          <AgregarAlarma setReload={setReload} reload={reload} />
        </div>
        <div className="contenedor-btn-secundary">
          <button className="btn-primary" onClick={()=>{navigate('/register')}}>Registrar Usuario</button>
        </div>
      </div>

      }
      {user?.email!== "administrador@gmail.com" &&
      <Fragment>
        <h1>Registro de Alarmas</h1>
        <div className="contenedor-centrador">
          <AgregarAlarma setReload={setReload} reload={reload} />
        </div>
      </Fragment>
      }
      <BuscadorAlarms reload={reload} setReload={setReload} />
    </div>
  );
}