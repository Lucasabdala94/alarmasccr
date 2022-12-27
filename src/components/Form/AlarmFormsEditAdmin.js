import React, { useState  } from "react";
import { Form, Input, Message, TextArea,Button } from 'semantic-ui-react';
import { useAuth } from '../../context/authContext';
import { enviarRespuestaAdmin } from "../../helper/consultasFB";
import ModalincompletoAdmin from "../Admin/ModalincompletoAdmin";
import ModalSuccesEditarAdmin from "../Admin/ModalSuccesEditarAdmin";

export default function AlarmsFormsEditAdmin(props) {
    const {id,onClose,data,setReload,reload}=props;
    //maneja el slider de carga del formulario.
    const [loading, setLoading] = useState(false);
    //maneja el estado del modal de incompleto admin.
    const [error, setError] = useState(false);
    //almacena si la respuesta del admin se cargo o no.
    const [respuesta, setRespuesta] = useState(false);

    const initialStateValue = {
        alarma: data?.alarma,
        et: data?.et,
        descripcion: data?.descripcion,
        nivelTension: data?.nivelTension,
        fecha:data?.fecha,
        descripcionAdmin:data?.descripcionAdmin,
    };


    //valores del formulario
    const [values, setValues] = useState(initialStateValue);
    // extraemos del contexto general el usuario.
    const {user}=useAuth();
    

    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues({
          ...values,
          [name]: value,
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const { descripcionAdmin } = values;
    
        const descripcionAdminSan = descripcionAdmin.trim();
    
        if (
            descripcionAdminSan.length !== 0
        ) {
            setLoading(true);

            enviarRespuestaAdmin(data,user,descripcionAdminSan,id,setRespuesta,setLoading,setReload,reload);    
            
        } else {
            setError(true);
            setLoading(false);
        }
    };
    return (
        <Form warning error loading={loading} onSubmit={handleSubmit}>
            <Message
                error
                list={[
                    'Solo se permite agregar una respuesta.',
                ]}
            />
            <Form.Field
                control={Input}
                label="Señalizacion SCADA"
                name="alarma"
                value={values?.alarma}
            />
            <Form.Group widths="equal">
                
                 <Form.Field
                control={Input}
                label="Nivel de Tensión"
                name="nivelTension"
                value={values?.nivelTension}
                />
                <Form.Field
                    control={Input}
                    label="Nombre Abreviado de ET "
                    name="et"
                    value={values?.et}
                />
            </Form.Group>
            <Form.Field
                control={TextArea}
                label="Agrege una respuesta"
                onChange={handleInputChange}
                name="descripcionAdmin"
                value={ values?.descripcionAdmin}
            />
            <Form.Field>
                <div className='contenedor-botones-center'>
                    <Button inverted color="blue" onClick={onClose}>
                        Cancelar
                    </Button>
                    <Button inverted color="red" onClick={handleInputChange}>
                        Agregar respuesta
                    </Button>
                </div>
            </Form.Field>

            <ModalincompletoAdmin
                onClose={() => setError(false)}
                onOpen={() => setError(true)}
                open={error}
            />
            <ModalSuccesEditarAdmin
                cerrarModalAnterior={()=>onClose(true)}
                onClose={() => setRespuesta(false)}
                onOpen={() => setRespuesta(true)}
                open={respuesta}
            />
        </Form>
    );
}
