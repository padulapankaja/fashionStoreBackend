const mongoose = require('mongoose')
const Cart = require('../models/shoppingcart.model');
const ObjectId = mongoose.Types.ObjectId;

exports.insert = ( req , res , next ) => {

    console.log(req.body.userid);
    console.log(req.body.productid);

    let new_cart_item = Cart({
        users : req.body.userid,
        product : req.body.productid,
        quantity : req.body.quantity,
        selected_color : req.body.selected_color ? req.body.selected_color : '',
        selected_size : req.body.selected_size,
        created_at: new Date() ,
        updated_at: new Date()
    })

    console.log(new_cart_item);

    new_cart_item.save( (err ,result ) => {
        if (err) { return next(err)}
        
        data = {
            status : 'success',
            code : 200,
            data : result,
            message : 'Cart Item Added Successfully'
        }
        
        res.json(data)
    })

}

exports.getall = ( req , res , next ) => {

    let userid = req.params.userid;
    console.log(userid);

    Cart.aggregate([
        { $match : { users : ObjectId(userid) } },
        {
        $lookup: {
            from: "products", // collection name in db
            localField: "product",
            foreignField: "_id",
            as: "product"
        }},
        { $project : { 
            selected_color : 1 ,
            selected_size : 1 ,
            users : 1 ,
            quantity : 1 ,
            product : { $arrayElemAt : [ "$product" , 0 ] } 
        }}
    
    ]).exec(function(err, result) {
        if (err) { return next(err)}
        
        data = {
            status : 'success',
            code : 200,
            data : result,
        }
        
        res.json(data)
    });

}

exports.update = (req, res ,next ) => {
    const id = req.params.id
    Cart.findOne({ _id : id } , (err, found_item ) => {
        if(err){ return next(err) }

        //if object not found
        if(!found_item){
            res.status(404).send();
        }else{

            //if quantity changed
            if( req.body.quantity){ found_item.quantity = req.body.quantity }

            found_item.updated_at = new Date();

            found_item.save( (err , updated_object) => {
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

exports.delete = (req, res ,next ) => {

    const id = req.params.id
    Cart.findOne({ _id : id } , (err, found_product ) => {
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

exports.clear = (req, res ,next ) => {

    const userid = req.params.userid
    Cart.deleteMany({users : userid} , (err ,result) => {
        if (err) { return next(err)}
        
        data = {
            status : 'success',
            code : 200,
            data : result,
        }
        
        res.json(data);
    })

}