const Offer = require('../models/offer.model');
const Product = require('../models/product.model');

exports.insert = (req, res ,next ) => {
    
    let offer_product = JSON.parse(req.body.product_list);

    let new_offer = Offer({
        title: req.body.title,
        subtitle: req.body.subtitle,
        discount : req.body.discount,
        banner_image: req.file.path,
        size : req.body.size,
        product_list : offer_product,
        created_at: new Date() ,
        updated_at: new Date()
    });
    
    new_offer.save( (err ,result ) => {
        if (err) { return next(err)}
        
        Product.updateMany(
            {'_id': {$in: offer_product}},
            {discount : req.body.discount},
            {multi: true},
            (err,result) => {
                data = {
                    status : 'success',
                    code : 200,
                    data : result,
                    message : 'Offer Added Successfully'
                }
                res.json(data)
            });
    })
}

exports.getAll = (req, res ,next ) => {
    
    Offer.find({} , (err, result) => {
        if(err){ return next(err) }

        data = {
            status : 'success',
            code : 200,
            data : result
        }
    
        res.json(data);
    });
}

exports.delete = (req,res,next) => {
    const id = req.params.id
   
    Offer.findOne({ _id : id } , (err, found_offer ) => {
        if(err){ return next(err) }

        //if object not found
        if(!found_offer){
            res.status(404).send();
        }else{

            found_offer.remove( (err, result) => {
                if(err){ return next(err) }

                Product.updateMany(
                    {'_id': {$in: req.body.product_list}},
                    {discount : 0 },
                    {multi: true},
                    (err,result) => {
                        
                        data = {
                            status : 'success',
                            code : 200,
                            data : result,
                            message : 'Offer Added Successfully'
                        }
                        res.json(data)
                    });

            })
        }
    }) 
}