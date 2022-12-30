import { useState } from "react";
import { useAuth } from "../../../context/authContext";
import { useNavigate } from "react-router-dom";

function Register() {
    const [user,setUser]= useState({
        email:'',
        password:'',
    });
    const[error,setError]=useState()

    const {signup/* ,loginWithGoogle */} = useAuth();
    const navigate= useNavigate();

    const handleChange = ({target:{name,value}})=>{
        setUser({...user,[name]:value})

    }
    
    /* const handleGoogleSignin =async()=>{
        try {
            await loginWithGoogle();
            navigate("/");
        } catch (error) {
            setError(error.message);
            if(error.message==="Firebase: Error (auth/unauthorized-domain)."){
                setError("No tiene acceso desde este dominio.")
            }
            
        }
        
    } */
    
    const handleSubmit = async(e)=>{
        e.preventDefault();
        setError("");
        try {
            await signup( user.email,user.password);
            navigate('/');
        } catch (error) {
            if(error.code==="auth/weak-password"){
                setError("La contraseña debe contener mas de 6 caracteres")
            }
            if(error.code==="auth/invalid-email"){
                setError("El correo debe tener un formato válido")
            }
            if(error.code==="auth/email-already-in-use"){
                setError("El correo electronico ingresado ya se encuentra registrado")
            }
            if(error.code==="auth/network-request-failed"){
                setError("No tienes acceso a internet")
            }
            
        }
        
    }

    return ( 
        <div className="conternedorFormAcces">
            
            <form  className="formAcces" onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input type="text" name="email" onChange={handleChange}/>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" onChange={handleChange} />
                
            </form>
            <div className="contenedor-btn">
                <button className="btn-primary" onClick={handleSubmit}>Registrar</button>
                {/* <button className="btn-primary" onClick={handleGoogleSignin}>Registro con Google</button> */}
                <button className="btn-primary" onClick={()=>{navigate('/')}}>Volver</button>      
            </div>
            {error && <p className="errorForm">{error}</p>}
        </div>
        
    );
}

export default Register;