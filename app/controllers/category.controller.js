const Category = require('../models/category.model');

exports.insert = (req, res ,next ) => {
    
    let new_category = Category({
        name: req.body.name,
        banner_title: req.body.banner_title,
        banne_subtitle: req.body.banne_subtitle,
        banner_image: req.file.path,
        created_at: new Date() ,
        updated_at: new Date()
    });

    new_category.save( (err ,result ) => {
        if (err) { return next(err)}
        console.log("hello");
        
        data = {
            status : 'success',
            code : 200,
            data : result,
            message : 'Category Added Successfully'
        }
        
        res.json(data)
    })
}

exports.getAll = (req, res ,next ) => {
    
    Category.find({} , (err, result) => {
        if(err){ return next(err) }

        data = {
            status : 'success',
            code : 200,
            data : result
        }
    
        res.json(data);
    });
}

exports.update = (req, res ,next ) => {
    const id = req.params.id
    Category.findOne({ _id : id } , (err, found_category ) => {
        if(err){ return next(err) }

        //if object not found
        if(!found_category){
            res.status(404).send();
        }else{

            //if name changed
            if( req.body.name){ found_category.name = req.body.name }

            //if title changed
            if( req.body.banner_title){ found_category.banner_title = req.body.banner_title }

            //if subtitle changed
            if( req.body.banne_subtitle){ found_category.banne_subtitle = req.body.banne_subtitle }

            //if image changed
            if(req.file ){ found_category.banner_image = req.file.path }

            found_category.updated_at = new Date();

            found_category.save( (err , updated_object) => {
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

exports.delete = (req,res,next) => {
    console.log(req.body);
    
    const id = req.params.id
    Category.findOne({ _id : id } , (err, found_category ) => {
        if(err){ return next(err) }

        //if object not found
        if(!found_category){
            res.status(404).send();
        }else{
            found_category.remove( (err, result) => {
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