const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/store', {
    useNewUrlParser:true,
    useUnifiedTopology: true
})
.then( () => console.log('The server has been connected to the database'))
.catch((err) => console.log('There was somekind of a problem when connecting to the database',err))