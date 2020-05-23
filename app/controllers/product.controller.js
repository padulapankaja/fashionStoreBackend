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
        discount : (req.body.discount) ? req.body.discount : 0 ,
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

exports.update = (req, res ,next ) => {
    const id = req.params.id
    Product.findOne({ _id : id } , (err, found_product ) => {
        if(err){ return next(err) }

        //if object not found
        if(!found_product){
            res.status(404).send();
        }else{

            //if name changed
            if( req.body.name){ found_product.name = req.body.name }

            //if price changed
            if( req.body.price){ found_product.price = req.body.price }

            //if description changed
            if( req.body.description){ found_product.description = req.body.description }

            //if brand changed
            if( req.body.brand){ found_product.brand = req.body.brand }

            //if discount changed
            if( req.body.discount){ found_product.discount = req.body.discount }

            //if cateogry changed
            if( req.body.category){ 
                let c = JSON.parse(req.body.category);
                found_product.category_id = c.id
                found_product.category_name = c.name
            }

            //if sizes changed
            if( req.body.sizes){ found_product.sizes = JSON.parse(req.body.sizes) }

            //if sizes changed
            if( req.body.tags){ found_product.tags = JSON.parse(req.body.tags) }

            //if colors changed
            if( req.body.colors){ found_product.colors = JSON.parse(req.body.colors) }

            found_product.updated_at = new Date();

            let images = JSON.parse(req.body.prev_images);
            console.log(req.files)
            console.log(images)
            for (var i = 0; i < req.files.length; i++) {
                images.push( req.files[i].path )
            }

            found_product.images = images;

            found_product.save( (err , updated_object) => {
                if(err){ return next(err) }
                
                data = {
                    status : 'success',
                    code : 200,
                    data : updated_object,
                    message : 'Successfully Updated'
                }
                res.json(data);

            })

        }
    });
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

exports.searchProducts = (req, res ,next ) => {
    let search = req.params.search;
    let query = { name : new RegExp(search , 'i') }
    console.log(query)
    Product.find(query , (err, result) => {
        if(err){ return next(err) }

        data = {
            status : 'success',
            code : 200,
            data : result
        }
        res.json(data);
    });
}

exports.getByCategoryName = (req, res ,next ) => {
    let query = { category_name :  req.params.categoryname }
   
    Product.find( query , (err, result) => {
        if(err){ return next(err) }

        data = {
            status : 'success',
            code : 200,
            data : result
        }
    
        res.json(data);
    });
}

exports.getProductById = (req, res ,next ) => {
    Product.findOne({_id: req.params.id}, (err, result) => {
        if(err){ 
            data = {
                status : 'failed',
                code : 404,
                data : null
            } 
         }else{
            data = {
                status : 'success',
                code : 200,
                data : result
            }    
         }   
        res.json(data);
    });
}

exports.delete = (req,res,next) => {
    const id = req.params.id
    Product.findOne({ _id : id } , (err, found_product ) => {
        if(err){ return next(err) }

        //if object not found
        if(!found_product){
            res.status(404).send();
        }else{
            found_product.remove( (err, result) => {
                if(err){ return next(err) }

                data = {
                    status : 'success',
                    code : 200,
                    data : result,
                    message : 'Successfully Removed'
                }
                res.json(data);

            })
        }
    }) 
}

exports.getAllLessDetails = (req, res ,next ) => {
    
    Product.find({} , {
        _id : 1 ,
        name: 1 ,
        images : { $slice: -1 } ,
    } , (err, result) => {
        if(err){ return next(err) }

        data = {
            status : 'success',
            code : 200,
            data : result
        }
    
        res.json(data);
    });
}