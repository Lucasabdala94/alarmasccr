import BotonEditarAdmin from "../components/Admin/BotonEditarAdmin";

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