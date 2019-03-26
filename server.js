const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const MongoDB_URI = require('./path');
const path = require('path');
const imageRouter = require('./routes/image');
const imageController = require('./controllers/image');
const multer = require('multer')
const app = express();

var fileStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images');
    },
    filename: function (req, file, cb) {
        const now = new Date().toISOString(); 
        const date = now.replace(/:/g, '-'); 
        cb(null, date +'-'+file.originalname); 
    }
  })
const fileFilter = (req, file, cb) =>{
    if(file.mimetype ==='image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg'){
        cb(null, true)
    }else{
        cb(null, false)
    }
}
app.set('view engine', 'ejs');
app.set('views', 'views')
app.use(bodyParser.urlencoded({extended:true}));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(multer({storage:fileStorage, fileFilter:fileFilter}).single('image'))
app.get('/', imageController.getImages);
app.use('/image', imageRouter);

mongoose.connect(encodeURI(MongoDB_URI)).then(result => {   
    app.listen(3000, ()=>{
        console.log(`Server Start in port 3000`);
    })
}).catch(err =>console.log(err))
