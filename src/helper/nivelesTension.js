import React,{Fragment} from "react";

export function nivelesTension(){
    return(
        <Fragment>
            <option value="-">---</option>
            <option value="500 Kv">500 Kv</option>
            <option value="345 Kv">345 Kv</option>
            <option value="132 Kv">132 Kv</option>
            <option value="66 Kv">66 Kv</option>
            <option value="33 Kv">33 Kv</option>
            <option value="13.2 Kv">13.2 Kv</option>
            <option value="380v AC">380V AC</option>
            <option value="110 DC">110 DC</option>
            <option value="48 DC">48 V DC</option>
            <option value="Otros">Otra</option>
        </Fragment>
    )
} 