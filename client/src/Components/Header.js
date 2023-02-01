import React, {useState} from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Header = ({isLoggedin, setIsLoggedin, role, setRole}) => {
    const [active, setActive] = useState("nav__menu")

    const [toggleIcon, setToggleIcon] = useState('nav__toggler')
    const navigate = useNavigate();
    const navToggle = () =>{
        active === 'nav__menu' 
        ? setActive('nav__menu nav__active') 
        : setActive ('nav__menu')

        toggleIcon === 'nav__toggler' 
        ? setToggleIcon('nav__toggler toggle')
        : setToggleIcon('nav__toggler')
    }

    const logout = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/users/logout",{}, {
            withCredentials:true
        })
        .then((res) => {
            setIsLoggedin(false)
        })
        .then((res) =>{
            console.log(isLoggedin);
            setIsLoggedin(false);
            setRole('');
            navigate("/login")
        })
        .catch(err => {
            console.log(err)
        })
    }

    return (
            <nav className={'nav'}>
                <NavLink className={'nav__brand'}>Store name</NavLink>
                <ul className={active}>
                    <li className='nav__item'><NavLink to={'/home'} className={'brand'}>Home</NavLink></li>
                    {   
                        role === 'Admin' ?
                        <li className='nav__item'><NavLink to={'/products'} className={'brand'}>Products</NavLink></li>
                        : <li className='nav__item'><NavLink to={'/all/products'} className={'brand'}>All Products</NavLink></li>
                    }   
                    {   
                        role === 'Admin' ?
                        <li className='nav__item'><NavLink to={'/store/new'} className={'brand'}>Add product</NavLink></li>
                        : <li  className='nav__item'><NavLink to={'/about'} className={'brand'}>About</NavLink></li>
                    }   
                    <li className='nav__item'><NavLink to={'/about'} className={'brand'}>About</NavLink></li>
                    {
                        isLoggedin ?
                        <li className='nav__item'><button className='btn btn-warning' onClick={(e) => logout(e)}>Logout</button></li>
                        : 
                        <li>
                            <NavLink className={'btn btn-warning'} to={'/login'}>Login</NavLink> 
                            <NavLink className={'btn btn-warning'} to={'/register'}>Register</NavLink>
                        </li>
                    }

                </ul>

                <div onClick={navToggle} className={toggleIcon}>
                    <div className='line1'></div>
                    <div className='line2'></div>
                    <div className='line3'></div>
                </div>
                
            </nav>
    )
}

export default Header