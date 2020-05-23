//import User model
const NewsLetter = require('../models/newsletters.model');
const moment = require('moment')
const UtilObj = require('../util/util')

const Admin = require('../models/admin.model');
const Manager = require('../models/manager.model');
const User = require('../models/user.model');
const Products = require('../models/product.model');
const Categories = require('../models/category.model');
const Orders = require('../models/order.model');
const Offers = require('../models/offer.model');
const Comments = require('../models/comment.model')

//======================================================================================================
//===================================  ADD SUBSCRIBE      ==============================================
//====================================================================================================== 
exports.subscribe = function (req, res, next) {
    console.log(req.body.email);
    
    let new_user = NewsLetter({
        email: req.body.email,
    });
    new_user.save(function (err) {
        if (err) {
            return next(err);
        }
        UtilObj.sentEmailforSuscribe(new_user.email)
        console.log("New user register");
        // UtilObj.sentEmailforRegisterUsers(new_user.email)
        res.status(200).send('Added Successfully');
    })


}


//======================================================================================================
//===================================  PASSWORD RESET     ==============================================
//====================================================================================================== 
exports.forgotPassword = function (req, res, next) {
    console.log(req.body.email);
    console.log(req.body.type);
    
    var email = req.body.email
    var type =  req.body.type

    if(type == "admin"){
        console.log("ADMIN");
        
    }else if(type == "user"){
        console.log("USER");
        
    }else if(type == "manager"){
        console.log("MANAGER");
        
    }else{
        console.log("Invalid");
        
    }

    
    return res.send(type)


}

exports.counts = async function (req, res, next) {
    
    const User_count = await User.count({});
    const Manager_count = await Manager.count({});
    const Products_count = await Products.count({});
    const Categories_count = await Categories.count({});
    const Orders_count = await Orders.count({});
    const Offers_count = await Offers.count({});
   
    let result = [];
    result.push({ name : "Users" , value : User_count });
    result.push({ name : "Managers" , value : Manager_count });
    result.push({ name : "Products" , value : Products_count });
    result.push({ name : "Categories" , value : Categories_count });
    result.push({ name : "Orders" , value : Orders_count });
    result.push({ name : "Offers" , value : Offers_count });
   
    data = {
        status : 'success',
        code : 200,
        data : result
    }

    res.json(data);
   
}

exports.latest_comments = function (req, res, next) {
   
    Comments.aggregate([
        { $sort : { created_at : -1 } },
        { $limit : parseInt(req.params.limit) }
    ])
    .exec(function(err, result) {
        if (err) { return next(err)}
   
    data = {
        status : 'success',
        code : 200,
        data : result
    }

    res.json(data);
    });
   
}

exports.revenue = function (req, res, next) {
    
    var today = new Date(moment( new Date() ).format("YYYY-MM-DD") ); 
    var prev =  new Date(today - 12096e5 );
    let dataset = []
    
    Orders.aggregate([
        {
            $project: {
                  xx : { $toDouble : "$amount" },
                  orderdate : { $dateToString: { format: "%Y-%m-%d", date: "$date" } }
            }
        },
        {
            $group : { _id : "$orderdate"  , total  : { $sum :  '$xx'}  }
        }
    ]).exec(function(err, result) {
        if (err) { return next(err)}
        

        let revenue = result.map( item => {
            return{
                date : new Date(item._id),
                total : item.total
            }
        })

        for(var arr=[],dt= prev ; dt<= today; dt.setDate(dt.getDate()+1)){ 
            
            let c = new Date(dt);
            let total = 0;
            let find = revenue.findIndex( item => item.date.getTime() == c.getTime() )
            if(find >= 0 ){
                total = revenue[find].total;
            }

            dataset.push({
               date : c,
               total : total   
            })

          }
        
          data = {
            status : 'success',
            code : 200,
            data : dataset,
        }
        res.json(data)
    });

}


