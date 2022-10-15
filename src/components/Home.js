import Alarms from "./Alarms";
import ModalAlarm from "./ModalAlarm";
import { useAuth } from "../context/authContext";
import { useState } from "react";






function Home() {
  const [reload,setRelaod]=useState(false);
  const {user,logout}=useAuth();
  const handleLogout= async()=>{
    try {
      await logout();
    } catch (error) {
      console.log(error);
    } 
  }
  
    return (
        <div className="App">
          <div>
            <h5>{user?.displayName || user?.email}</h5>
            <button onClick={handleLogout}>Salir</button>  
          </div>
          
          <h1>Registro de Alarmas</h1>
          <div className="contenedor-centrador">
            <ModalAlarm setRelaod={setRelaod} reload={reload} />
          </div>
    
          <Alarms reload={reload} />
        </div>
    );
}

export default Home;