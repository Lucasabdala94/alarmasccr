import React from 'react';
import { Input } from 'semantic-ui-react';

export default function Alarms() {
  return (
    <div>
      <h1>Buscador de Alarmas</h1>
      <div className="containerInput">
        <Input className="inputBuscar"  icon='list'  placeholder='Buscar Alarmas...' />
      </div>

    </div>
  )
}
