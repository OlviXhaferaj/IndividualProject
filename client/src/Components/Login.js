import React, {useState} from 'react';
import axios from "axios";
import {useNavigate} from 'react-router-dom';

const Login = ({setIsLoggedin, setRole, setUserName}) => {
    const [email,setEmail] =useState("");
    const [password,setPassword] =useState("");
    const [user, setUser] = useState([]);
    const [errorMessage,setErrorMessage] =useState("");
    
    const navigate=useNavigate();

    const login = e =>{
        e.preventDefault();

        axios.post("http://localhost:8000/api/users/login",{
            email:email,
            password:password
        },
        {
            withCredentials:true
        })
        .then((res) =>{
            console.log(res, 'this is the res.cookie');
            setRole(res.data.userRole);
            setIsLoggedin(true);
            setUserName(res.data.userLoggedIn);
            navigate('/home');
        })
        .catch(err =>{
            console.log(err.response);
            setErrorMessage(err.response.data.message);
        })
    }

    return (
        <div className='header'>
            <div className='content1'>
                <p className='error-text'>{errorMessage ? errorMessage : ""}</p>
            
            
                <form className="px-4 py-3" onSubmit={login}>
                    <h3>Login Form</h3>
                    <div className='form-group'>
                        <label>Email address</label>
                        <input className='form-control' type={'text'} name={"email"} value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className='form-group'>
                        <label>Password</label>
                        <input className='form-control' type={'password'} name={"password"} value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <input className='btn btn-dark' type={"submit"} value={"Log in"}/>
                </form>
            </div>
        </div>
    )
}

export default Login