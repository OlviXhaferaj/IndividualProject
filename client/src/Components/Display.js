import React, {useState, useEffect} from 'react';
import { NavLink, useParams } from 'react-router-dom';
import axios from 'axios';
import DeleteButton from './DeleteButton';


const Display = () => {
    const {id} = useParams();

    const [instrument, setInstrument] = useState('');
    const [type, setType] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [brand, setBrand] = useState('');
    const [description, setDescription] = useState('');
    
    const [productId, setProductId] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8000/api/store/'+id)
        .then((res) => {
            console.log(res.data.instrument, 'thisis the instriment');
            setInstrument(res.data.instrument);
            setType(res.data.type);
            setQuantity(res.data.quantity);
            setPrice(res.data.price);
            setImage(res.data.image);
            setBrand(res.data.brand);
            setDescription(res.data.description);
            setProductId(res.data._id);
        })
        .catch((err) => {
            console.log(err);
        })
    }, [])

    return (
        <div className='div-display'>
            
            <h2>Details about: {instrument}</h2>
            <div className='galery'>
                <div className='content1'>
                    {
                        image?
                        <div  >
                            <img src={image}/>
                        </div>
                        : <p>You havent uploaded an image for this product</p>
                    }
                    <h3>{instrument}</h3>
                    <p>{description}</p>
                    <p>Brand: {brand}</p>
                    <p>Type: {type}</p>
                    <h6>Price: ${price}</h6>
                    <DeleteButton instrument={instrument} productId={productId} />

                </div>
            </div>
            
            <NavLink className={'btn btn-dark'} to={'/products'}>Back to the list of products</NavLink>

        </div>
    )
}

export default Display