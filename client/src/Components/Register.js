import React, {useState} from 'react';
import axios from 'axios';

const Register = () => {
    const [confirmReg, setConfirmReg] = useState("");
    const [errs, setErrs] = useState([]);

    const [user, setUser] = useState({
        name:"",
        email:"",
        password:"",
        confirmPassword:""
    })

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        })
    }

    const register = e =>{
        e.preventDefault();
        axios.post("http://localhost:8000/api/users/register",
        user,
        {
            withCredentials:true
        })
        .then(res => {
            console.log(res.data);

            setUser({
                name:"",
                email:"",
                password:"",
                confirmPassword:""
            })

            setConfirmReg("Thank you for registering, you can now log in!");
            setErrs({});
        })
        .catch((err) =>{
            console.log(err);
            console.log(err.response.data);
            setErrs(err.response.data.errors);
        })
    };

    return (
        <div className='header'>

            {
                confirmReg ?
                <h4>{confirmReg}</h4>
                : null
            }
            <div className='content1'>
                <form  onSubmit={register}>
                    <h2>Fill in the form to Register</h2>

                    <div>
                        <div>
                            <label>User Name</label><br/>
                            {
                                errs.name ?
                                <span className='error-text'>{errs.name.message}</span>
                                : null
                            }
                            <input className='form-control' type={'text'} name="name" value={user.name} onChange={(e) => handleChange(e)}/>
                        </div>
                        <div>
                            <label>Email</label><br/>
                            {
                                errs.email ?
                                <span className='error-text'>{errs.email.message}</span>
                                :null
                            }
                            <input className='form-control' type={'email'} name="email" value={user.email} onChange={(e) => handleChange(e)}/>
                        </div>
                    </div>
                    <div>
                        <div>
                            <label>Password</label><br/>
                            {
                                errs.password ?
                                <span className='error-text'>{errs.password.message}</span>
                                :null
                            }
                            <input className='form-control' type={'password'} name="password" value={user.password} onChange={(e) => handleChange(e)}/>
                        </div>
                        <div>
                            <label>Confirm Password</label><br/>
                            {
                                errs.passwordPassword ?
                                <span className='error-text'>{errs.confirmPassword.message}</span>
                                :null
                            }
                            <input className='form-control' type={'password'} name="confirmPassword" value={user.confirmPassword} onChange={(e) => handleChange(e)}/>
                        </div>
                    </div>
                    <input className='btn btn-dark' type={"submit"} value={"Register me"}/>
                </form>
            </div>
        </div>
    )
}

export default Register