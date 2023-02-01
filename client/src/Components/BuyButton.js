import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BuyButton = (props) => {
    const { productQuantity, productId, isLoggedinn } = props;
    const navigate = useNavigate();



    const deletehandle = (e) => {
        
        axios.put('http://localhost:8000/api/store/buy/'+ productId,{
            quantity: productQuantity -1
        },{withCredentials:true})
        .then((res) => {
            console.log(isLoggedinn)
            navigate('/home')
        })
        .catch((err) => {
            console.log(err);
            console.log(productId, 'this is the product id');
            console.log(productQuantity);
        })
    }
    return (
        <div>
            { isLoggedinn && productQuantity>0?
            <button className='btn btn-primary' onClick={deletehandle}> Buy Product</button>
            : isLoggedinn &&productQuantity<=0 ? <p>This product is currently out of stock</p>
            :<p>Log in to buy products</p>
            }
        </div>
    )
}

export default BuyButton