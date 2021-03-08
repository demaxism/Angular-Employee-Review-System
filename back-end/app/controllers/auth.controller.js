const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;
const Review = db.review;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    age: req.body.age,
    disc: req.body.disc,
    password: bcrypt.hashSync(req.body.password, 8)
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (req.body.roles) {
      Role.find(
        {
          name: { $in: req.body.roles }
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          user.roles = roles.map(role => role._id);
          user.save(err => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }

            res.send({ message: "User was registered successfully!" });
          });
        }
      );
    } else {
      Role.findOne({ name: "user" }, (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        user.roles = [role._id];
        user.save(err => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          res.send({ message: "User was registered successfully!" });
        });
      });
    }
  });
};

exports.signin = (req, res) => {
  User.findOne({
    username: req.body.username
  })
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      var authorities = [];

      for (let i = 0; i < user.roles.length; i++) {
        authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      }
      res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        roles: authorities,
        accessToken: token
      });
    });
};

exports.editUser = (req, res) => {
  let condition = { username : req.body.username };
  let operation = {
    $set : { 
      email : req.body.fullname,
      age : req.body.rank,
      disc : req.body.disc 
    }
  };
  User.updateOne(condition, operation, function(err, data) {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.status(200).send({
      result: data
    });
  });
};

exports.deleteUser = (req, res) => {
  let condition = { username : req.body.username };

  User.deleteOne(condition, function(err, data) {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.status(200).send({
      result: data
    });
  });
};

exports.listUsers = (req, res) => {
  User.find((err, data) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.status(200).send({
      users: data
    });
  });
};

exports.getUser = (req, res) => {
  User.findById(req.body.userid, (err, data) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.status(200).send({
      user: data
    });
  });
};

exports.assignReview = (req, res) => {
  const review = new Review({
    from_user: req.body.from_user,
    to_user: req.body.to_user
  });

  review.save((err, data) => {
    if (err) {
      res.status(500).send({message: err});
      return;
    }
    res.send({ message: "Review assigned" });
  });
};

exports.reviewFrom = (req, res) => {
  Review.find({from_user : req.body.from_user}, (err, data) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.status(200).send({
      reviews: data
    });
  });
};

exports.submitReview = (req, res) => {
  let condition = { from_user : req.body.from_user, to_user : req.body.to_user };
  let operation = {
    $set : { content : req.body.content }
  };
  Review.updateOne(condition, operation, function(err, data) {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.status(200).send({
      result: data
    });
  });
}
