import React,{useState} from 'react';
import { collection, addDoc} from "firebase/firestore"; 
import {db} from './../firebase';
import { v4 as uuidv4 } from 'uuid';

import {
  Button,
  Form,
  Input,
  Message,
  TextArea,
  Modal,
  Header,
  Icon
} from 'semantic-ui-react';



export default function AlarmsForms() {
  const [loading, setLoading] = useState(false);
  const initialStateValue={
    alarma:"",
    et:"",
    descripcion:"",
    nivelTension:"-"
  }

  const[values,setValues]=useState(initialStateValue);
  const[error,setError]=useState(false);

  const handleInputChange=(e)=>{
    
    const {name,value}=e.target;
    setValues({
      ...values,[name]:value
    })
    
  }

  const handleSubmit = (e)=>{
    e.preventDefault();
    const {alarma,et,descripcion, nivelTension}=values;
    if(alarma.length!==0 && et.length!==0 && descripcion.length!==0 && nivelTension.length!==1 ){
      console.log("pasa el form");
      setLoading(true);
      
      /*============================= */
      
      
        (async()=>{
          try {
          const agregarAlarma=   collection(db,"/alarmas");
          


          const docRef = await addDoc(agregarAlarma, {
            alarma: values.alarma.toLocaleLowerCase(),
            descripcion: values.descripcion.toLocaleLowerCase(),
            et: values.et.toLocaleLowerCase(),
            nivelTension: values.nivelTension.toLocaleLowerCase(),
            id:uuidv4()
          });
          console.log("Document written with ID: ", docRef.id);
          setLoading(false);
        } catch (e) {
          console.error("Error adding document: ", e);
          setLoading(false)
        }
        })()
        
      /*============================= */
    }else{
      console.log("falto llenar alguinos campos");
      setError(true);
      
    }
  }

  return (
    <Form warning loading={loading} onSubmit={handleSubmit}>
      <Form.Field
        control={Input}
        label='Señalizacion Scada'
        placeholder='Texto en sistema Scada'
        onChange={handleInputChange}
        name="alarma"
      />
      <Form.Group widths='equal'>
      
      <Form.Field label='Nivel de Tensión' control='select' onChange={handleInputChange} name="nivelTension">
        <option value='-'>---</option>
        <option value='500 Kv'>500 Kv</option>
        <option value='345 Kv'>345 Kv</option>
        <option value='132 Kv'>132 Kv</option>
        <option value='66 Kv'>66 Kv</option>
        <option value='33 Kv'>33 Kv</option>
        <option value='13.2 Kv'>13.2 Kv</option>
        <option value='380v AC'>380 v AC</option>
        <option value='110 DC'>110 DC</option>
        <option value='48 DC'>48 V DC</option>
        <option value='Otra'>Otra</option>
      </Form.Field>
        <Form.Field
          control={Input}
          label='Nombre Abreviado de ET'
          placeholder='Ej SCO'
          onChange={handleInputChange}
          name="et"
        />
        
      </Form.Group>
      <Message
          warning
          list={[
            'Para alarmas donde intervienen dos ET, escribir ET emisora de la alarma',
          ]}
        />
      <Form.Field
        control={TextArea}
        label='Agrege una descripción'
        placeholder='Sea breve'
        onChange={handleInputChange}
        name="descripcion"
      />
      <Message
        warning
        list={[
          'Incluir informacion del operador',
        ]}
      />
      
      <Form.Field control={Button} onSubmit={handleInputChange} >Agregar </Form.Field>
      <Modal
      onClose={() => setError(false)}
      onOpen={() => setError(true)}
      open={error}
      size='small'
      blurring="true"
      >
        <Header >
          <Icon name='tasks'  />
          Error al Cargar la Alarma
        </Header>
        <Modal.Content>
          <h3>
            Todos los campos son obligatorios...
          </h3>
          <p>et = {values.et}</p>
          <p>descripcion = {values.descripcion}</p>
          <p>nivel de tension={values.nivelTension}</p>
          <p>alarma={values.alarma}</p>
        </Modal.Content>
        <Modal.Actions>
          <Button basic color='red' onClick={() => setError(false)}>
            <Icon name='remove' /> cerrar
          </Button>
        </Modal.Actions>
      </Modal>
  </Form>
  
  )
}
