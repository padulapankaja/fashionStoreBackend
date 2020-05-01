


// test functions
exports.test = function (req, res) {
   
    console.log(req.body);



    res.status(200).json({
        message: 'You are admin'
    })
    
};
