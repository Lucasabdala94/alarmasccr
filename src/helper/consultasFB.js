import BotonEditarAdmin from "../components/Admin/BotonEditarAdmin";
import { collection, addDoc, getDocs } from 'firebase/firestore';
import {db} from "../firebase";
import { v4 as uuidv4 } from 'uuid';

export async function enviarRespuestaAdmin(data,user,descripcionAdminSan,id,setRespuesta,setLoading,setReload,reload){
    try {
        await BotonEditarAdmin(data,user,descripcionAdminSan,id)
        setRespuesta(true);
        setLoading(false);
        setReload(!reload);
    } catch (e) {
        setLoading(false);
    }
};

export async function crearArrayAlarmEt(){
    let descriptionAll = [];
    try {
        const getAlarm = await getDocs(collection(db, '/alarmas'));
        getAlarm.forEach((doc) => {
          descriptionAll.push(doc.data().alarma + doc.data().et);
        });
        return descriptionAll;
    } catch (e) {
        return e
    }      
}
export async function crearArrayAlarmEtEditar(id){
    let descriptionAll = [];
    try {
        const getAlarm = await getDocs(collection(db, '/alarmas'));
        getAlarm.forEach((doc) => {
          if(id!== doc.id){
          descriptionAll.push(doc.data().alarma + doc.data().et);}
        });
        return descriptionAll;
    } catch (e) {
        return e
    }      
}

export async function agregarAlarma(alarmaSan,descripcionSan,etSan,nivelTension,user){
    try {
      await addDoc(collection(db, '/alarmas'), {
        alarma: alarmaSan,
        descripcion: descripcionSan,
        et: etSan,
        nivelTension: nivelTension,
        id: uuidv4(),
        fecha:new Date(),
        creado: user?.displayName || user?.email,
        fechaAdmin:"",
        descripcionAdmin:"",
        creadoAdmin:"",
      });
    } catch (e) {
      return e
    }
  }