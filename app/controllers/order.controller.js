const Order = require('../models/order.model');

exports.Insert = (req, res, next) => {

    let newOrder = Order ({
        date: new Date(),
        amount: req.body.amount,
        userId: req.body.userId,
        deliveryAddress: req.body.deliveryAddress
    });

    console.log("New Order: ", newOrder);

    newOrder.save( (err ,result ) => {
        if (err) { return next(err)}
        
        data = {
            status : 'success',
            code : 200,
            data : result,
            message : 'Order Added Successfully'
        }
        
        res.json(data)
    })
}

exports.GetAll = (req, res, next) => {
    
    Order.find({}, (err, result) => {
        if (err) { return next(err) }

        data = {
            status : 'success',
            code : 200,
            data : result
        }

        res.json(data);
    });
}

exports.Delete = (req, res, next) => {
    
    const id = req.params.id

    Order.findOne({ _id : id } , (err, found_order ) => {
        if(err){ return next(err) }

        //if object not found
        if(!found_order){
            res.status(404).send();
        }else{
            found_order.remove( (err, result) => {
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

exports.GetOrdersByUserId = (req, res, next) => {

    let query = { userId :  req.params.userId }

    Order.find( query , (err, result) => {
        if(err){ return next(err) }

        data = {
            status : 'success',
            code : 200,
            data : result
        }
    
        res.json(data);
    });
}