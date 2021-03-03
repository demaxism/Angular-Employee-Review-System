const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    controller.signup
  );

  app.post("/api/auth/signin", controller.signin);

  app.post("/api/auth/edituser", controller.editUser);

  app.post("/api/auth/deleteuser", controller.deleteUser);

  app.get("/api/auth/listusers", controller.listUsers);

  app.post("/api/auth/getuser", controller.getUser);

  app.post("/api/auth/assignreview", controller.assignReview);

  app.post("/api/auth/reviewfrom", controller.reviewFrom);

  app.post("/api/auth/submitreview", controller.submitReview);
};
