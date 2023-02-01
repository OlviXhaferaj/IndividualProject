import React, {useEffect, useState} from 'react'
import axios from 'axios';
import {  NavLink,useNavigate, useParams } from 'react-router-dom';
import FileBase64 from 'react-file-base64';


const Update = () => {
    const {id} = useParams();

    const [products, setProducts] = useState([]);
    const [staticInstrument, setStaticInstrument] = useState('');
    const [instrument, setInstrument] = useState('');
    const [type, setType] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [price, setPrice] = useState(0);
    const [brand, setBrand] = useState('');
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');

    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8000/api/store')
        .then((res) => {
            setProducts(res.data);
        })
        .catch((err) => {
            console.log(err);
        })
    }, [])

    useEffect(() => {
        axios.get('http://localhost:8000/api/store/'+ id)
        .then(res => {
            setStaticInstrument(res.data.instrument);
            setInstrument(res.data.instrument);
            setType(res.data.type);
            setQuantity(res.data.quantity);
            setPrice(res.data.price);
            setBrand(res.data.brand);
            setImage(res.data.image);
            setDescription(res.data.description);
        })
        .catch(err => {
            console.log(err)
        })
    }, [])

    const updateInstrument = (e) => {
        e.preventDefault();
        axios.put('http://localhost:8000/api/store/' +id, {
            instrument:instrument,
            type:type,
            quantity:quantity,
            price:price,
            brand:brand,
            image:image,
            description:description
        },
        {
            withCredentials:true
        })
        .then(res => {
            console.log(res);
            navigate('/products')
        })
        .catch((err) => {
            console.log(err)
            const errorResponse = err.response.data.errors
            const errorArr = [];

            for (const key of Object.keys(errorResponse)){
                errorArr.push(errorResponse[key].message)
            }
            
            setErrors(errorArr)
        })
    }
    const cancelHandle = () => {
        navigate('/products')
    }
        const foundItem = products.find((item) => {
            return item._id === id
        })
    return (
        <div className='div-display'>

            {
                foundItem ?
                <div className='col-6 mx-auto'>
                    <h2>Edit {staticInstrument}</h2>
                    {errors.map((err, index) => <p style={{color:'red'}} key={index}>This is an error: {err}</p>)}

                <form onSubmit={updateInstrument}>

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
                        <label className="sr-only">Image</label><br/>
                        <input value={image}  className="form-control mx-sm-3" type={'text'} onChange={(e) => setImage(e.target.value)}/><br/>
                        <FileBase64
                            multiple={false}
                            onDone={({base64}) => setImage(base64)}
                        />
                        <label className="sr-only">Name of the instrument</label><br/>
                        <input value={instrument}  className="form-control mx-sm-3" type={'text'} onChange={(e) => setInstrument(e.target.value)}/><br/>
                        <label className="sr-only">Intrument Type</label><br/>
                        <select value={type}  className='form-select' onChange={(e) => setType(e.target.value)}>
                            <option></option>
                            <option value="String">String</option>
                            <option value="Percussion">Percussion</option>
                            <option value="Woodwinds">Woodwinds</option>
                            <option value="Brass">Brass</option>
                            <option value="Keyboards">Keyboards</option>
                        </select><br/>
                        <label className="sr-only">Quantity</label><br/>
                        <input value={quantity}  className="form-control mx-sm-3" type={'number'} onChange={(e) => setQuantity(e.target.value)}/><br/>
                        <label className="sr-only">Price</label><br/>
                        <input value={price}  className="form-control mx-sm-3" type={'number'} onChange={(e) => setPrice(e.target.value)}/><br/>
                        <label className="sr-only">Brand</label><br/>
                        <input value={brand}  className="form-control mx-sm-3" type={'text'} onChange={(e) => setBrand(e.target.value)}/><br/>
                        
                        <label className="sr-only">Product Description</label><br/>
                        <input value={description}  className="form-control mx-sm-3" type={'text'} onChange={(e) => setDescription(e.target.value)}/><br/>
                        <input className="btn btn-success" type={'submit'} value={'Update Product'}/>
                        <button className="btn btn-dark" onClick={(e) => cancelHandle()}>Cancel</button>
                    </div>

                </form>
                </div>
                :
                <div>
                    <p>"We're sorry, but the product you are looking for, couldn't be found. If you want to add another one to the store, you can click down below.</p>
                    <NavLink to={'/store/new'}>New</NavLink>
                </div>
            }
            <NavLink className={'btn btn-dark'} to={'/products'}>Back to list of products</NavLink>

        </div>
    ) 
}

export default Update