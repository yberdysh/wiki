const express = require('express');
const router = express.Router();

//get all users, do not change db
router.get("/", (req, res, next) => {

});

// get user 123, do not change db
router.get("/:id", (req, res, next) => {

});

// create a user in the db
router.post("/", (req, res, next) => {

});

// update user 123 in the db
router.put("/:id", (req, res, next) => {

});

// delete user 123 from the db
router.delete("/:id", (req, res, next) => {

});

module.exports = router;