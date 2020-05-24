const mongoose = require("mongoose");
const wishlist = require("../models/wishlist.model");
const ObjectId = mongoose.Types.ObjectId;

exports.Insert = (req, res, next) => {
  let newWishlistItem = wishlist({
    userid: req.body.userid,
    product_id: req.body.product_id,
    created_at: new Date(),
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
      message: "Item Added Successfully",
    };

    res.json(data);
  });
};

exports.GetAll = (req, res, next) => {
  let userid = req.params.userid;
  console.log(userid);

  wishlist
    .aggregate([
      { $match: { userid: userid } },
      {
        $lookup: {
          from: "products", // collection name in db
          localField: "product_id",
          foreignField: "_id",
          as: "product",
        },
      },
      {
        $project: {
          userid: 1,
          created_at: 1,
          product: { $arrayElemAt: ["$product", 0] },
        },
      },
    ])
    .exec(function (err, result) {
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

exports.clear = (req, res, next) => {
  const userid = req.params.userid;
  wishlist.deleteMany({ userid : userid }, (err, result) => {
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
