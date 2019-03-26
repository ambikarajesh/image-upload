const Image = require('../models/image');
exports.addImage = (rq, res, next)=>{
    res.render('form',{
        title:'Image Upload'
    })
}
exports.postImage = (req, res, next)=>{
    console.log(req.file.path)

    const image = new Image({title:req.body.title, image:req.file.path});
    image.save((err, result)=>{ 
        if(err){
            console.log(err)
        }
        res.redirect('/');
    });
}
exports.getImages = (req, res, next)=>{
    Image.find().then(products => {
        console.log(products)
        res.render('images', {
            title : 'Images',
            products:products,
        })
    }).catch(err => console.log(err));
}