import React from "react";




export default function Impresion(){
    const fecha= new Date();
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      };
    const fechaEntrega = fecha.toLocaleDateString('es-ES', options).toString();
      
    return(
        <div>
            <div>
                <h1 >Novedades de Alarmas</h1>
            </div>          
            <div className="mainImpresion">
                <p> {fechaEntrega}</p>
            </div>         
        </div>
    )
}