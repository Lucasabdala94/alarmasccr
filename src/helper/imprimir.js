//configuramos margenes y tipo de pagina. Evitar salto de pagina en medio de alarma
export const getPageMargins = () => {
    return (
      `@page { margin: 25mm 15mm 10mm 15mm !important;
      size: A4 ;
      }
      .table{
        page-break-inside: avoid;
      }
      `  
    );
};