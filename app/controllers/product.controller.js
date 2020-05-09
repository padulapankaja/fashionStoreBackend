const Product = require('../models/product.model');

exports.insert = (req, res ,next ) => {
    
    let images = [];
    for (var i = 0; i < req.files.length; i++) {
        images.push( req.files[i].path )
    }
    let c = JSON.parse(req.body.category);

    let new_product = Product({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        brand: req.body.brand,
        category_id : c.id,
        category_name : c.name,
        sizes: JSON.parse(req.body.sizes),
        tags: JSON.parse(req.body.tags),
        colors: JSON.parse(req.body.colors),
        images: images,
        added_by : req.body.added_by,
        is_active : true, 
        view_count : 0 ,
        created_at: new Date() ,
        updated_at: new Date()
    });

    console.log(new_product);

    new_product.save( (err ,result ) => {
        if (err) { return next(err)}
        
        data = {
            status : 'success',
            code : 200,
            data : result,
            message : 'Product Added Successfully'
        }
        
        res.json(data)
    })
}

exports.getAll = (req, res ,next ) => {
    
    Product.find({} , (err, result) => {
        if(err){ return next(err) }

        data = {
            status : 'success',
            code : 200,
            data : result
        }
    
        res.json(data);
    });
}