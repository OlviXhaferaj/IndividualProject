import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DeleteButton = (props) => {
    const { instrument,productId} = props;
    const navigate = useNavigate();
    const deletehandle = (e) => {
        axios.delete('http://localhost:8000/api/store/'+ productId,{withCredentials:true})
        .then((res) => {
            navigate('/products')
        })
        .catch((err) => {
            console.log(err);
        })
    }
    return (
        <div>
            <button className='btn btn-warning' onClick={deletehandle}> Remove product</button>
        </div>
    )
}

export default DeleteButton