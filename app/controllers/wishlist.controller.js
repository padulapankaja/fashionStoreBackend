const wishlist = require("../models/wishlist.model");

exports.Insert = (req, res, next) => {
  let newWishlistItem = wishlist({
    userid: req.body.userid,
    product_id: req.body.product_id,
    pruduct_name: req.body.pruduct_name,
    product_price: req.body.product_price,
    description: req.body.description,
    size: req.body.size,
    color: req.body.color,
    image: req.body.image,
    is_active: req.body.is_active,
    discount: req.body.discount,
    view_count: req.body.view_count,
    created_at: req.body.created_at,
  });

  console.log("New WishList Item: ", newWishlistItem);

  newWishlistItem.save((err, result) => {
    if (err) {
      return next(err);
    }

    data = {
      status: "success",
      code: 200,
      data: result,
      message: "Order Added Successfully",
    };

    res.json(data);
  });
};

exports.GetAll = (req, res, next) => {
  wishlist.find({}, (err, result) => {
    if (err) {
      return next(err);
    }

    data = {
      status: "success",
      code: 200,
      data: result,
    };

    res.json(data);
  });
};

exports.Delete = (req, res, next) => {
  const id = req.params.id;

  wishlist.findOne({ _id: id }, (err, found_wishlist_item) => {
    if (err) {
      return next(err);
    }

    //if object not found
    if (!found_wishlist_item) {
      res.status(404).send();
    } else {
      found_wishlist_item.remove((err, result) => {
        if (err) {
          return next(err);
        }

        data = {
          status: "success",
          code: 200,
          data: result,
          message: "Successfully Removed",
        };
        res.json(data);
      });
    }
  });
};
