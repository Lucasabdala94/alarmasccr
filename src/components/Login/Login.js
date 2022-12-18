import { useState } from "react";
import {useAuth} from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import "./loginregister.css";


function Login() {
    const [user,setUser]= useState({
        email:'',
        password:'',
    });
    const[error,setError]=useState()

    const {login,loginWithGoogle,resetPassword} = useAuth();
    const navigate= useNavigate();

    const handleGoogleSignin =async()=>{
        try {
            await loginWithGoogle();
            navigate("/");
        } catch (error) {
            setError(error.message);
        }
        
    }
    const handleResetPassword = async()=>{
        if(!user.email) return setError("Ingresá el correo"); 
        try {
            await resetPassword(user.email);
            setError("Se envio un correo para realizar el cambio de contraseña")
        } catch (error) {
            setError(error.message)
        }
        
    }

    const handleChange = ({target:{name,value}})=>{
        setUser({...user,[name]:value})

    }
    const handleSubmit = async(e)=>{
        e.preventDefault();
        setError("");
        try {
            await login( user.email,user.password);
            navigate('/');
        } catch (error) {
            if(error.code==="auth/wrong-password"){
                setError("correo o contraseña incorrectos")
            }
            if(error.code==="auth/invalid-email"){
                setError("El correo debe tener un formato válido")
            }
            if(error.code==="auth/email-already-in-use"){
                setError("El correo electronico ingresado ya se encuentra registrado")
            }
            if(error.code==="auth/user-not-found"){
                setError("correo o contraseña incorrectos")
            }
           
           
        }
        
    }

    return ( 
        <div className="conternedorFormAcces">
            <form className="formAcces" onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input type="text" name="email" onChange={handleChange}/>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" onChange={handleChange} />
                
            </form>   
            <div className="contenedor-btn">
                <button className="btn-primary" onClick={handleSubmit} 
 >Login</button>
                <button className="btn-primary" onClick={handleGoogleSignin}>Login con Google</button>
            </div>
            {error && <p className="errorForm">{error}</p>}
            
            <div>
                <p>Aun no tienes Cuenta...</p>
                <div className="contenedor-btn-secundary">
                <button className="btn-secundary" onClick={()=>{navigate('/register')}}>Ir al Registro</button>
                </div>
            </div>
            <div>
                <p>Olvidaste tu contraseña...</p>
                <div className="contenedor-btn-secundary">
                <button className="btn-secundary" onClick={handleResetPassword}>Cambiar Contraseña</button>
                </div>
            </div>
        </div>
        
    );
}

export default Login;