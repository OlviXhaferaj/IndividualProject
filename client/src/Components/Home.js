import React from 'react';
import { NavLink } from 'react-router-dom';

const Home = ({role}) => {
    return (
        <div className='header'>
            <div className='container'>
                <div className='banner-text'>
                    <div className='text-area'>
                        <span>M</span>
                        <span>u</span>
                        <span>s</span>
                        <span>i</span>
                        <span>c</span>&nbsp;
                        <span>S</span>
                        <span>t</span>
                        <span>o</span>
                        <span>r</span>
                        <span>e</span>
                    </div>
                </div>
                <p>The best instruments in the market brought by Music Store</p>
                {
                    role === "Admin"?
                    <NavLink className={'btn btn-warning'} to={'/products'}>View your inventory... </NavLink>
                    :
                    <NavLink className={'btn btn-warning'} to={'/all/products'}>Buy products... </NavLink>
                }
            </div>
        </div>
    )
}

export default Home