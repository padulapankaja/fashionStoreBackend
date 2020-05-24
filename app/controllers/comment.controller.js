const Comment = require("../models/comment.model");

exports.Insert = (req, res, next) => {
  let newComment = Comment({
    userid: req.body.userid,
    username: req.body.username,
    produtid: req.body.produtid,
    produt_name: req.body.produt_name,
    comment: req.body.comment,
    rating: req.body.rating,
    created_at: new Date(),
  });

  console.log("New Comment: ", newComment);

  newComment.save((err, result) => {
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
  Comment.find({}, (err, result) => {
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

exports.GetComByProId = (req, res, next) => {
  Comment.find({ produtid: req.params.id }, (err, result) => {
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
  

  Comment.findOne({ _id: id }, (err, found_comment) => {
    if (err) {
      return next(err);
    }

    //if object not found
    if (!found_comment) {
      res.status(404).send();
    } else {
      found_comment.remove((err, result) => {
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

// exports.GetCommetByUserId = (req, res, next) => {
//   let query = { userId: req.params.userid };

//   Comment.find(query, (err, result) => {
//     if (err) {
//       return next(err);
//     }

//     data = {
//       status: "success",
//       code: 200,
//       data: result,
//     };

//     res.json(data);
//   });
// };

exports.GetCommentById = (req, res, next) => {
  Comment.findOne({ _id: req.params.id }, (err, result) => {
    if (err) {
      data = {
        status: "failed",
        code: 404,
        data: null,
      };
    } else {
      data = {
        status: "success",
        code: 200,
        data: result,
      };
    }
    res.json(data);
  });
};
