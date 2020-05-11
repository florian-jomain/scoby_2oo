const express = require("express");
const router = express.Router();
const User = require("../models/User");
const requireAuth = require("../middlewares/requireAuth");

router.patch("/me", requireAuth, (req, res, next) => {
  const id = req.session.currentUser._id;
  User.findByIdAndUpdate(id, req.body, {
      new: true
    })
    .then(apiResponse => {
      res.status(200).json(apiResponse);
    })
    .catch(apiError => {
      res.status(500).json(apiError);
    })
});

module.exports = router;