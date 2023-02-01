const mongoose = require('mongoose');

const StoreSchema = new mongoose.Schema({
    instrument:{
        type:String,
        required: [true, 'The name of the instrument is required']
    },
    type:{
        type:String,
        enum: ['String', 'Percussion', 'Woodwinds', 'Brass', 'Keyboards'],
        required: [true, 'The type of the instrument is required']
    },
    quantity:{
        type:Number,
        required:[true, 'The quantity of the product is required']
    },
    price:{
        type:Number,
        required: true
    },
    image:{
        type:String
    },
    brand:{
        type:String
    },
    description:{
        type:String
    }
}, {timestamps: true})

module.exports = mongoose.model('Store', StoreSchema)

