import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";

export default async function BotonEditarAdmin(data,user,descripcionAdminSan,id){
    //se edita la alarma agregando la respuesta del admin.
    const EditRef = doc(db, '/alarmas', id);
    // eslint-disable-next-line
    const EditDoc = await setDoc(EditRef, {
        alarma: data?.alarma,
        et: data?.et,
        descripcion: data?.descripcion,
        nivelTension: data?.nivelTension,
        creado: data?.creado,
        fecha: data?.fecha,
        descripcionAdmin: descripcionAdminSan,
        fechaAdmin: new Date(),
        creadoAdmin: user?.displayName || user?.email,
    });
};