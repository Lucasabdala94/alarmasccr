import React, { useState, useEffect,useRef } from 'react';
import { Input,Icon,Loader,Dimmer} from 'semantic-ui-react';
import './alarms.css';
import "./impresion/impresion.css";
import { db } from '../../../firebase';
import { getDocs, collection, query, orderBy} from 'firebase/firestore';
import ListAlarma from './ListAlarma';
import {filtroBusqueda} from "../../../helper/filtroBusqueda";
import { useReactToPrint } from 'react-to-print';
import Impresion from './impresion/Impresion';

export default function BuscadorAlarms(props) {
  //estado que contiene todas las alarmas (datos  e id);
  const [alarm, setAlarm] = useState([]);

  //Almacena la busqueda.
  const [busqueda, setBusqueda] = useState(null);

  //Estado para impresion.
  const [imprimir,setImprimir]=useState(false);

  //almacena si ya se cargaron las alarmas.
  const [cargaAlarm,setCargaAlarm]= useState(false)

  //Almacena alarma que coincide con busqueda.
  const [filtro, setFiltro] = useState(null);
  
  const {reload,setReload}= props;

  //variables que Almacena los objetos con idFirebase y datos.
  let alarmsAll = [];
  //Trae de firebase todas las alarmas y la asigna al estado alarm
  useEffect(() => {
    (async () => {
      try {
        //Extraigo todas las alarmas.
        const getAlarm = await getDocs(
          query(collection(db, '/alarmas'), orderBy('fecha','desc'))
        );
        getAlarm.forEach((doc) => {
          alarmsAll.push({data:doc.data(),
            idDoc:doc.id
          });
          
        });
        setAlarm(alarmsAll);
        setCargaAlarm(true);
      } catch (e) {
        console.log(e);
      }
    })();
    // eslint-disable-next-line
  }, [reload]);

  //registra lo que escribe en el buscador y lo asigna a busqueda.
  const handleInputChange = (e) => {
    let buscar = e.target.value;
    setBusqueda(buscar.toLocaleLowerCase().trim());
  };
  // Asigna al estado filtro las alarmas que coinciden con la busqueda.
  useEffect(() => {
    (async () => {
      setFiltro(await filtroBusqueda(alarm, busqueda));
    })();
  }, [busqueda,reload,alarm]);
  


  let impresion = useRef();
  

  //configuramos margenes y tipo de pagina.
  const getPageMargins = () => {
    return (`@page { margin: 25mm 15mm 10mm 30mm !important;
      size: A4 ;
      page-break-after:auto;
    }
    @media print {
      .page-break {
        margin-top: 1rem;
        display: block;
        page-break-before: left;
      }
    }
    
    `);
  };

  //Funcion de imprimir
  const handlePrint = useReactToPrint({
    content: () => impresion.current,
    documentTitle: "Alarmas CCR",
    pageStyle:getPageMargins(),
  });

  

  return (
    <div className="buscador">
      <h1>Buscador de Alarmas</h1>
      <div className="containerInput containerAlarmAll">
        <Input
          className="inputBuscar"
          icon="list"
          placeholder="Buscar Alarmas..."
          onChange={handleInputChange}
        />
      </div>
      {cargaAlarm===false ? (
          <Dimmer active>
            <Loader size='huge'>Cargando...</Loader>
          </Dimmer>
        ) 
        : null
      }
      {alarm.length!==0 &&
        <div className="impresion" >
          <button onClick={async()=>{
            await setImprimir(true);
            handlePrint()
            setImprimir(false)
          }
            } className="btn-primary"><Icon className="print" name="edit" /></button>
        </div>
      }
      <div className="containerAlarmAll" ref={impresion} >
        {imprimir ? <Impresion createRef={impresion}/>: null}
        {busqueda ? 
          filtro.map((alarma) => {
            return (<ListAlarma createRef={impresion} key={alarma?.data?.id} alarma={alarma} setReload={setReload} reload={reload} imprimir={imprimir} />)
            
          }) : alarm.map((alarma) => {
            return <ListAlarma createRef={impresion} key={alarma?.data?.id} alarma={alarma} setReload={setReload} reload={reload} imprimir={imprimir} />
          }) }
      </div>
    </div>
  );
}


