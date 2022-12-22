import React, { useState } from 'react';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from './../../firebase';
import { v4 as uuidv4 } from 'uuid';
import ModalError from './../modal/ModalError';
import Modalsucces from './../modal/Modalsucces';
import Modalincompleto from './../modal/Modalincompleto';
import { Form, Input, Message, TextArea } from 'semantic-ui-react';
import { useAuth } from '../../context/authContext';

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
      alarma.length !== 0 &&
      et.length !== 0 &&
      descripcion.length !== 0 &&
      nivelTension.length !== 1
    ) {
      setLoading(true);
      
      (async () => {
        try {
          let descriptionAll = [];
          const getAlarm = await getDocs(collection(db, '/alarmas'));
          getAlarm.forEach((doc) => {
            descriptionAll.push(doc.data().alarma + doc.data().et);
          });

          let existe = descriptionAll.includes(alarmaSan + etSan);
          
          if (existe === true) {
            setLoading(false);
            setExistente(true);
          } else {
            // eslint-disable-next-line
            const docRef = await addDoc(collection(db, '/alarmas'), {
              alarma: alarmaSan,
              descripcion: descripcionSan,
              et: etSan,
              nivelTension: nivelTension,
              id: uuidv4(),
              fecha:new Date(),
              creado: user?.displayName || user?.email,
            });
            setRegistrada(true);
            setLoading(false);
            setValues(initialStateValue);
          }
        } catch (e) {
          setLoading(false);
        }
      })();
    } else {
      setError(true);
      setLoading(false);
      console.log(user);
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
          'Ingresar exactamente como se lee el Nombre Del Punto de la alarma en Scada respetando espacios',
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
          value={values.et}
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
        value={values.descripcion}
      />
      <Message
        warning
        list={[
          'Ingresar fecha y hora de los eventos ',
          'Incluir informacion del personal informado',
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


