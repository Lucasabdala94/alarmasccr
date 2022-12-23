import React, { useState  } from "react";
import { Form, Input, Message, TextArea,Button } from 'semantic-ui-react';
import ModalError from './../modal/ModalError';
import Modalsucces from './../modal/Modalsucces';
import Modalincompleto from './../modal/Modalincompleto';
import { useAuth } from '../../context/authContext';
import { doc, setDoc,collection,getDocs } from "firebase/firestore"; 
import { db } from './../../firebase';

export default function AlarmsFormsEdit(props) {
    const {id,onClose,data,setReload,reload}=props;
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [existente, setExistente] = useState(false);
    const [registrada, setRegistrada] = useState(false);

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
          
          (async () => {
            try {
                let descriptionAll = [];
                const getAlarm = await getDocs(collection(db, '/alarmas'));
                getAlarm.forEach((doc) => {
                    //Compara que al editar no se edite por una alarma ya existente.
                    if(doc?.id!==id){
                    descriptionAll.push(doc.data().alarma + doc.data().et);
                  }                 
                });

              let existe  = descriptionAll.includes(alarmaSan + etSan);;
              
              if (existe === true) {
                setLoading(false);
                setExistente(true);
              } else {
                
                const EditRef = doc(db, '/alarmas', id);
                // eslint-disable-next-line
                const EditDoc = await setDoc(EditRef, {
                  alarma: alarmaSan,
                  descripcion: descripcionSan,
                  et: etSan,
                  nivelTension: nivelTension,
                  fecha:new Date(),
                  creado: user?.displayName || user?.email,
                }); 
                setRegistrada(true);
                setLoading(false);
                setReload(!reload);
              }
            } catch (e) {
              setLoading(false);
            }
          })();
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
                    <option value="-">---</option>
                    <option value="500 Kv">500 Kv</option>
                    <option value="345 Kv">345 Kv</option>
                    <option value="132 Kv">132 Kv</option>
                    <option value="66 Kv">66 Kv</option>
                    <option value="33 Kv">33 Kv</option>
                    <option value="13.2 Kv">13.2 Kv</option>
                    <option value="380v AC">380 v AC</option>
                    <option value="110 DC">110 DC</option>
                    <option value="48 DC">48 V DC</option>
                    <option value="Otros">Otra</option>
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
            <Modalsucces
                onClose={() => setRegistrada(false)}
                onOpen={() => setRegistrada(true)}
                open={registrada}
            />
        </Form>
    );
}
