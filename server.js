const express = require('express');
const mongodb = require('mongodb');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const MongoDB_URI = require('./path');
const imageRouter = require('./routes/image');
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views')
app.set(bodyParser.urlencoded({extended:true}))
app.get('/', (req,res,next)=>{
    res.json({name:'Ambika'})
})
app.use('/image', imageRouter);

mongoose.connect(encodeURI(MongoDB_URI)).then(result => {   
    app.listen(3000, ()=>{
        console.log(`Server Start in port 3000`);
    })
}).catch(err =>console.log(err))
