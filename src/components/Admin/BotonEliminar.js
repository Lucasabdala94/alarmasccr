import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase";

export default async function BotonEliminar(id){
    //Elimina la alarma segun su id.
    await deleteDoc(doc(db, "/alarmas", id));;
};