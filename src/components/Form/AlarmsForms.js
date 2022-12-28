import React, { useState } from 'react';
import { Form, Input, Message, TextArea } from 'semantic-ui-react';
import { useAuth } from '../../context/authContext';
import ModalError from './../modal/ModalError';
import Modalsucces from './../modal/Modalsucces';
import Modalincompleto from './../modal/Modalincompleto';
import {crearArrayAlarmEt} from '../../helper/consultasFB';
import {agregarAlarma} from '../../helper/consultasFB';
import {nivelesTension} from '../../helper/nivelesTension';


export default function AlarmsForms() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [existente, setExistente] = useState(false);
  const [registrada, setRegistrada] = useState(false);

  const {user}=useAuth();
  
  const initialStateValue = {
    alarma: '',
    et: '',
    descripcion: '',
    nivelTension: '-',
  };
  const [values, setValues] = useState(initialStateValue);

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
      nivelTension.length !== 1
    ) {
      setLoading(true);
      
      (async () => {
        try {
          //funcion que almacena en un array un conjunto de alarma + et.
          const alarEt= await crearArrayAlarmEt();

          // si existe= true es porque ya existe una misma alarma en esa et. Se compara el nuevo registro con todos los de las base de datos.
          let existe = alarEt.includes(alarmaSan + etSan);
          
          if (existe === true) {
            setLoading(false);
            setExistente(true);
          } else {
            // eslint-disable-next-line
            const addAlarm = await agregarAlarma(alarmaSan,descripcionSan,etSan,nivelTension,user);
            setRegistrada(true);
            setLoading(false);
            setValues(initialStateValue);
          }
        } catch (e) {
          console.log(e);
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
        value={values.alarma}
      />
      <Message
        error
        list={[
          'Ingresar exactamente como se lee el Nombre Del Punto de la alarma en Scada respetando espacios.',
        ]}
      />
      
      <Form.Group widths="equal">
        <Form.Field
          label="Nivel de Tensión"
          control="select"
          onChange={handleInputChange}
          name="nivelTension"
          value={values.nivelTension}
        >
          {nivelesTension()}
        </Form.Field>
        <Form.Field
          control={Input}
          label="Nombre Abreviado de ET "
          onChange={handleInputChange}
          name="et"
          value={values.et}
        />
      </Form.Group>
      <Message
        warning
        list={[
          'Alarmas donde intervienen dos ET, escribir ET emisora de la misma.',
        ]}
      />
      <Form.Field
        control={TextArea}
        label="Agrege una descripción"
        onChange={handleInputChange}
        name="descripcion"
        value={values.descripcion}
      />
      <Message
        warning
        list={[
          'Ingresar fecha y hora de los eventos.',
          'Incluir informacion del personal informado.',
        ]}
      />
      <Form.Field>
        <button className='botonAdd' onSubmit={handleInputChange}>Agregar</button>
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


