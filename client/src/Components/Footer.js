import React from 'react'
import { NavLink } from 'react-router-dom'
const Footer = () => {
    return (
        <footer  className="bg-dark text-white pt-5 pb-4">
            <div className='container text-center text-md-left'>
            
                <div className='row text-center text-md-left'>
                    <div className='col-md-3 col-lg-3 col-xl-3 mx-auto mt-3'>
                        <h5 className='text-uppercase mb-4 font-weight-bold text-warning'>Music Store</h5>
                        <blockquote>
                            <p> “I should be sorry if I only entertained them. I wish to make them better.”</p>
                            <p>-<b>Georg Frideric Handel</b></p>
                        </blockquote>
                    </div>
                    <div className='col-md-2 col-lg-2 col-xl-2 mx-auto mt-3'>
                        <h5 className='text-uppercase mb-4 font-weight-bold text-warning'>The Product Brands</h5>
                        <p>Yamaha</p>
                        <p>Gibson</p>
                    </div>
                    <div className='col-md-4 col-lg-3 col-xl3 mx-auto mt-3'>
                    <h5 className='text-uppercase mb-4 font-weight-bold text-warning'>Address and contact info</h5>
                        <p>
                            <i className='fas fa-home mr-3'></i> Tirane, 1251235
                        </p>
                        <p>
                            <i className='fas fa-envelope mr-3'></i> store@gmail.com
                        </p>
                        <p>
                            <i className='fas fa-phone mr-3'></i> +000 00 00 000
                        </p>
                        <p>
                            <i className='fas fa-print mr-3'></i> +222 22 22 222
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer