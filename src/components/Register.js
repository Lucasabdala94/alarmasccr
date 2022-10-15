import { useState } from "react";
import {useAuth} from "../context/authContext";
import { useNavigate } from "react-router-dom";

function Register() {
    const [user,setUser]= useState({
        email:'',
        password:'',
    });
    const[error,setError]=useState()

    const {signup,loginWithGoogle} = useAuth();
    const navigate= useNavigate();

    const handleChange = ({target:{name,value}})=>{
        setUser({...user,[name]:value})

    }
    const handleGoogleSignin =async()=>{
        try {
            await loginWithGoogle();
            navigate("/");
        } catch (error) {
            setError(error.message);
        }
        
    }
    
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
           
           console.log(error.code)
        }
        
    }

    return ( 
        <div className="conternedorFormAcces">
            
            <form  className="formAcces" onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input type="text" name="email" placeholder="email@gmail.com" onChange={handleChange}/>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" onChange={handleChange} />
                <button>Register</button>
            </form>
            <div>
                <button onClick={handleGoogleSignin}>Registro con Google</button>
            </div>
            {error && <p className="errorForm">{error}</p>}
            <div>
                <p>Ya se encuentra registrado...Acceder a <span onClick={()=>{navigate('/login')}}>Cuenta</span>.</p>
            </div>
        </div>
        
    );
}

export default Register;