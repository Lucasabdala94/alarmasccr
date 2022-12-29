import React, { useState  } from "react";
import { Form, Input, Message, TextArea,Button } from 'semantic-ui-react';
import ModalError from './../modal/ModalError';
import Modalincompleto from './../modal/Modalincompleto';
import { useAuth } from '../../context/authContext';
import { doc, setDoc,collection,getDocs } from "firebase/firestore"; 
import { db } from './../../firebase';
import ModalSuccesEditar from "../modal/ModalSuccesEditar";
import {crearArrayAlarmEt} from '../../helper/consultasFB';
import {nivelesTension} from '../../helper/nivelesTension';

export default function AlarmsFormsEdit(props) {
    const {id,onClose,data,setReload,reload}=props;
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [existente, setExistente] = useState(false);
    const [editada, setEditada] = useState(false);

    const initialStateValue = {
        alarma: data?.alarma,
        et: data?.et,
        descripcion: data?.descripcion,
        nivelTension: data?.nivelTension,
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
        const { alarma, et, descripcion, nivelTension } = values;
    
        const alarmaSan = alarma.toLocaleLowerCase().trim();
    
        const etSan = et.toLocaleLowerCase().trim();
    
        const descripcionSan = descripcion.trim();
    
        if (
            alarmaSan.length !== 0 &&
            etSan.length !== 0 &&
            descripcionSan.length !== 0 &&
            descripcionSan.length !== 1
        ) {
            setLoading(true);

            async function ComprobarExisteEnviar (){
                try {
                    //funcion que almacena en un array un conjunto de alarma + et.
                    const alarEt= await crearArrayAlarmEt();

                    // si existe= true es porque ya existe una misma alarma en esa et. Se compara el nuevo registro editado con todos los de la base de datos.
                    let existe = alarEt.includes(alarmaSan + etSan);

                    if (repetida === true) {
                        setLoading(false);
                        setExistente(true);
                    } else {
                        //Condicion donde pasa todo las barreras de edicion.
                        const EditRef = doc(db, '/alarmas', id);
                        // eslint-disable-next-line
                        const EditDoc = await setDoc(EditRef, {
                            alarma: alarmaSan,
                            descripcion: descripcionSan,
                            et: etSan,
                            nivelTension: nivelTension,
                            fecha: new Date(),
                            creado: user?.displayName || user?.email,
                        });
                        setEditada(true);
                        setLoading(false);
                        setReload(!reload);                      
                    }
                } catch (e) {
                    setLoading(false);
                }
            };
            ComprobarExisteEnviar();
        } else {
            setError(true);
            setLoading(false);
        }
    };
    return (
        <Form warning error loading={loading} onSubmit={handleSubmit}>
            <Form.Field
                control={Input}
                label="Señalizacion SCADA"
                onChange={handleInputChange}
                name="alarma"
                value={values?.alarma}
            />
            <Message
                error
                list={[
                    'Ingresar exactamente como se lee el Nombre Del Punto de la alarma en Scada respetando espacios',
                ]}
            />

            <Form.Group widths="equal">
                <Form.Field
                    label="Nivel de Tensión"
                    control="select"
                    onChange={handleInputChange}
                    name="nivelTension"
                    value={values?.nivelTension}
                >
                    {nivelesTension()}
                </Form.Field>
                <Form.Field
                    control={Input}
                    label="Nombre Abreviado de ET "
                    onChange={handleInputChange}
                    name="et"
                    value={values?.et}
                />
            </Form.Group>
            <Message
                warning
                list={[
                    'Alarmas donde intervienen dos ET, escribir ET emisora de la misma',
                ]}
            />
            <Form.Field
                control={TextArea}
                label="Agrege una descripción"
                onChange={handleInputChange}
                name="descripcion"
                value={values?.descripcion}
            />
            <Message
                warning
                list={[
                    'Ingresar fecha y hora de los eventos ',
                    'Incluir informacion del personal informado',
                ]}
            />
            <Form.Field>
                <div className='contenedor-botones-center'>
                    <Button inverted color="blue" onClick={onClose}>
                        Cancelar
                    </Button>
                    <Button inverted color="red" onClick={handleInputChange}>
                        Editar
                    </Button>
                </div>
            </Form.Field>

            <Modalincompleto
                onClose={() => setError(false)}
                onOpen={() => setError(true)}
                open={error}
                values={values}
            />
            <ModalError
                onClose={() => setExistente(false)}
                onOpen={() => setExistente(true)}
                open={existente}
            />
            <ModalSuccesEditar
                onClose={() => {
                    setEditada(false);
                    onClose();
                }}
                onOpen={() => setEditada(true)}
                open={editada}
            />
        </Form>
    );
}
