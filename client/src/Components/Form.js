import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {NavLink, useNavigate} from 'react-router-dom'

import FileBase64 from 'react-file-base64';
import 'bootstrap/dist/css/bootstrap.min.css';

const Form = () => {
    const [instrument, setInstrument] = useState('');
    const [type, setType] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [brand, setBrand] = useState('');
    const [description, setDescription] = useState('');


    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();


    const onSubmitHandler = (e) => {
        e.preventDefault();

        axios.post('http://localhost:8000/api/store',{
            instrument,
            type,
            quantity,
            price,
            image,
            brand,
            description
        },
        {
            withCredentials:true
        })
        .then((res) => {
            console.log(res);
            navigate('/products')
        })
        .catch((err) => {
            console.log(err.response)
            if(err.response.status === 401){
                navigate('/login')
            }
            const errorResponse = err.response.data.errors
            const errorArr = [];


            for (const key of Object.keys(errorResponse)){
                errorArr.push(errorResponse[key].message)
            }
            
            setErrors(errorArr)
            console.log(err)
        })
    }

    const cancelHandle = () => {
        navigate('/products')
    }
    return (
        <div >
            <form onSubmit={onSubmitHandler}>

                <div>
                    {errors.map((err, index) => <p style={{color:'red'}} key={index}>This is an error: {err}</p>)}
                </div>


                <div>
                        {
                            image?
                            <div  className='col-6 mx-auto'>
                                <img src={image}/>
                            </div>
                            : null
                        }
                    <label className="sr-only">Choose an image</label><br/>
                    <FileBase64 
                        multiple={false}
                        onDone={({base64}) => setImage(base64)} 
                    /><br/>
                    

                    <div className='form'>

                        <div className='content2' >
                            <label className="sr-only  input64">Name of the instrument</label><br/>
                            <input className="form-control mx-sm-3  input64" type={'text'} onChange={(e) => setInstrument(e.target.value)}/><br/>
                            <label className="sr-only">Intrument Type</label><br/>
                            {/* <input className="form-control mx-sm-3" type={'text'} onChange={(e) => setType(e.target.value)}/><br/> */}
                            <select className='form-select' onChange={(e) => setType(e.target.value)}>
                                <option></option>
                                <option value="String">String</option>
                                <option value="Percussion">Percussion</option>
                                <option value="Woodwinds">Woodwinds</option>
                                <option value="Brass">Brass</option>
                                <option value="Keyboards">Keyboards</option>
                            </select><br/>
                            <label className="sr-only">Quantity</label><br/>
                            <input className="form-control mx-sm-3" type={'number'} onChange={(e) => setQuantity(e.target.value)}/><br/>
                            <input className="btn btn-success" type={'submit'} value={'Add Product'}/>
                        </div>
                        <div className='content2'>
                            <label className="sr-only">Set Price</label><br/>
                            <input className="form-control mx-sm-3" type={'number'} onChange={(e) => setPrice(e.target.value)} placeholder={'Price in Dollars $'}/><br/>
                            <label className="sr-only">Brand</label><br/>
                            <input className="form-control mx-sm-3" type={'text'} onChange={(e) => setBrand(e.target.value)}/><br/>
                            <label className="sr-only">Product Description</label><br/>
                            <textarea className="form-control mx-sm-3" type={'text'} onChange={(e) => setDescription(e.target.value)}/>
                            <button className="btn btn-dark" onClick={(e) => cancelHandle()}>Cancel</button>
                        </div>
                    </div>
                </div>

            </form>
        </div>
    )
}

export default Form