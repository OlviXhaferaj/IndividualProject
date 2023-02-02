import React, {useState, useEffect} from 'react';
import {NavLink} from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import DeleteButton from './DeleteButton';
import { useNavigate } from 'react-router-dom';

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
    

const List = () => {
    const [products, setProducts] = useState([]);
    const [query, setQuery] = useState(''); 
    const [select, setSelect] = useState('');
    let [count, setCount] = useState(0);
    const navigate = useNavigate();

    const filteredItems = getFilteredItems(query, products, select);

    const updateHandle = (id) => {
        navigate(`instrument/${id}/edit`)
    }
    const detailsHandle = (id) => {
        navigate(`instrument/${id}`)
    }
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
            <h2 >These are all of your products</h2>
            {/* <NavLink to={'/store/new'}>Add a new product to the store</NavLink> */}
            
            
                <label >Search for your product</label>
                <select  onChange={(e) => setSelect(e.target.value)}>
                    <option value={"Instrument"}>Instrument name</option>
                    <option value={"Type"}>Type</option>
                    <option value={"Brand"}>Brand</option>
                </select>
                <input type={'text'} onChange={(e)=> setQuery(e.target.value)} placeholder={'Search...'}/>
                
        <table className="table table-striped table-dark">
            <thead>
                <tr>
                    <th scope="col">Instrument</th>
                    <th scope="col">Type</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Price</th>
                    <th scope="col">Brand</th>
                    <th scope="col" >Actions avaible</th>
                </tr>
            </thead>
        { !query ?
        
            sorted.map((item, index) => {
                return (
                    <tbody key={index}>
                        <tr>
                                <td>{item.instrument}</td>
                                <td>{item.type}</td>
                                <td>{item.quantity}</td>
                                <td>{item.price}</td>
                                <td>{item.brand}</td>
                                <td>
                                        <button onClick={()=>detailsHandle(item._id)} className="btn btn-dark">Details</button>
                                        <button onClick={()=>updateHandle(item._id)} className="btn btn-warning">Edit</button>
                                </td>
                        </tr>
                    </tbody>
                )
            })
        :
        
            filteredItems.map((item, index) => {
                return (
                    <tbody key={index}>
                        <tr>
                                <td >{item.instrument}</td>
                                <td>{item.type}</td>
                                <td>{item.quantity}</td>
                                
                                <td>{item.price}</td>

                                <td>{item.brand}</td>
                                <td >
                                        <button onClick={()=>detailsHandle(item._id)} className="btn btn-primary">Details</button>
                                        <button onClick={()=>updateHandle(item._id)} className="btn btn-primary">Edit</button>
                                </td>
                        </tr>
                    </tbody>
                )
            })
        }
        </table>
        </div>
    )
}

export default List