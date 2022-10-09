import React, { useState } from 'react';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from './../firebase';
import { v4 as uuidv4 } from 'uuid';
import ModalError from './ModalError';
import Modalsucces from './Modalsucces';

import {
  Button,
  Form,
  Input,
  Message,
  TextArea,
  Modal,
  Header,
  Icon,
} from 'semantic-ui-react';

export default function AlarmsForms() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [existente, setExistente] = useState(false);
  const [registrada, setRegistrada] = useState(false);

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
    if (
      alarma.length !== 0 &&
      et.length !== 0 &&
      descripcion.length !== 0 &&
      nivelTension.length !== 1
    ) {
      setLoading(true);

      (async () => {
        try {
          const agregarAlarma = collection(db, '/alarmas');
          let descriptionAll = [];
          const getAlarm = await getDocs(agregarAlarma);
          getAlarm.forEach((doc) => {
            descriptionAll.push(doc.data().alarma + doc.data().et);
          });

          let existe = descriptionAll.includes(
            (alarma + et).toLocaleLowerCase()
          );
          console.log(alarma);
          if (existe === true) {
            setLoading(false);
            setExistente(true);
          } else {
            const docRef = await addDoc(agregarAlarma, {
              alarma: alarma.toLocaleLowerCase().trim(),
              descripcion: descripcion.toLocaleLowerCase().trim(),
              et: et.toLocaleLowerCase().trim(),
              nivelTension: nivelTension.toLocaleLowerCase().trim(),
              id: uuidv4(),
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
    }
  };

  return (
    <Form warning error loading={loading} onSubmit={handleSubmit}>
      <Form.Field
        control={Input}
        label="Señalizacion Scada"
        placeholder="Texto en sistema Scada"
        onChange={handleInputChange}
        name="alarma"
        value={values.alarma}
      />
      <Message
        error
        list={[
          'Ingresar exactamente como se lee el Nombre Del Punto en Scada respetando espacios',
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
          <option value="Otra">Otra</option>
        </Form.Field>
        <Form.Field
          control={Input}
          label="Nombre Abreviado de ET"
          placeholder="Ej SCO"
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
        placeholder="Sea breve"
        onChange={handleInputChange}
        name="descripcion"
        value={values.descripcion}
      />
      <Message warning list={['Incluir informacion del personal informado']} />
      <Form.Field control={Button} onSubmit={handleInputChange}>
        Agregar
      </Form.Field>
      <Modal
        onClose={() => setError(false)}
        onOpen={() => setError(true)}
        open={error}
        size="small"
        blurring="true"
      >
        <Header>
          <Icon name="tasks" />
          Error al Cargar la Alarma
        </Header>
        <Modal.Content>
          <h3>Todos los campos son obligatorios...</h3>
          <p>et = {values.et}</p>
          <p>descripcion = {values.descripcion}</p>
          <p>nivel de tension={values.nivelTension}</p>
          <p>alarma={values.alarma}</p>
        </Modal.Content>
        <Modal.Actions>
          <Button basic color="red" onClick={() => setError(false)}>
            <Icon name="remove" /> cerrar
          </Button>
        </Modal.Actions>
      </Modal>
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
