import React, {useState, useEffect} from 'react';
import {NavLink} from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import BuyButton from './BuyButton'

    const getFilteredItems = (query, products, select) => {
        if(!query){
            return products
        }
        else if (select==="Type"){
            return products.filter((products) => products.type.includes(query));
        }
        else if (select==="Brand"){
            
            return products.filter((products) => products.brand.includes(query));

            
        }
        return products.filter((products) => products.instrument.includes(query));
    };

const Products = ({isLoggedin}) => {
    const [products, setProducts] = useState([]);
    const [query, setQuery] = useState(''); 
    const [select, setSelect] = useState('');
    const navigate = useNavigate();

    const filteredItems = getFilteredItems(query, products, select);


    useEffect(() => {
        axios.get('http://localhost:8000/api/store')
        .then((res) => {
            setProducts(res.data);
            console.log(res.data)
        })
        .catch((err) => {
            console.log(err);
        })
    }, [])
    
    
        let sorted = [...products].sort((a,b) => a.instrument > b.instrument ? 1 : -1)

    return (
        <div className='div-list'>
            <h2>Welcome to our store</h2>
            <h2>This are all of the products you can choose from</h2>
            
            <label>Search for your product</label>
            <select onChange={(e) => setSelect(e.target.value)}>
                <option value={"Instrument"}>Instrument name</option>
                <option value={"Type"}>Type</option>
                <option value={"Brand"}>Brand</option>
            </select>
            <input type={'text'} onChange={(e)=> setQuery(e.target.value)} placeholder={'Search...'}/>
            
        <div className='galery' >
        
        { !query ?
        
            sorted.map((item, index) => {
                
                
                return (
                    <div className='content1' key={index}>
                        <img src={item.image}/>
                        <h3>{item.instrument}</h3>
                        <p>{item.description}</p>
                        <p>Quantity: {item.quantity}</p>
                        <h6>${item.price}</h6>
                        <BuyButton isLoggedinn={isLoggedin} productQuantity={item.quantity} productId={item._id}/>
                    </div>
                )
            })
        :
        
            
            filteredItems.map((item, index) => {
                return (
                    <div className='content1' key={index}>
                        <img src={item.image}/>
                        <h3>{item.instrument}</h3>
                        <p>{item.description}</p>
                        <p>Quantity: {item.quantity}</p>
                        <h6>${item.price}</h6>
                        <BuyButton isLoggedinn={isLoggedin} productQuantity={item.quantity} productId={item._id}/>
                    </div>
                )
            })
        }
        </div>

        </div>
    )
}

export default Products