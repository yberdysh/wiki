const express = require("express");
const router = express.Router();
const models = require("../models");
const Page = models.Page;
const User = models.User;

// retrieve all wiki pages
router.get("/", (req, res, next) => {
    res.redirect("/");
});

// submit a new page to the database
router.post("/", (req, res, next) => {
    const page = Page.build({
        title: req.body.title,
        content: req.body.content
    });
    page.save();
    res.redirect("/");
});

// retrieve the "add a page" form
router.get("/add", (req, res, next) => {
    res.render("addpage");
});

module.exports = router;