const express = require("express");
const router = express.Router();
const models = require("../models");
const Page = models.Page;
const User = models.User;

// retrieve all wiki pages
router.get("/", (req, res, next) => {
    Page.findAll();
    //this part we didn't finish
    res.redirect("/");
});

// submit a new page to the database
router.post("/", (req, res, next) => {
    const page = Page.build({
        title: req.body.title,
        content: req.body.content
    });
    page.save()
    .then(savedPage => {
      res.redirect(savedPage.urlTitle);
    })
    .catch(next);
});


// page.save().then(function(savedPage){
//   res.redirect(savedPage.route); // route virtual FTW
// }).catch(next);

// retrieve the "add a page" form
router.get("/add", (req, res, next) => {
    res.render("addpage");
});

router.get('/:urlTitle', (req, res, next) => {
  var urltitle = req.params.urlTitle;
  Page.findOne({where: {urlTitle: urltitle}})
  .then(data => res.render('wikipage')) /*err => res.json({error: err})*/
  .catch(next);
  // res.json(urlTitle);
})


// We're so close now. Our client has requested a specific page by urlTitle, we've
// routed their request to the correct handler, we've queried the database and gotten
// back a page… what's left? …Rendering that page as HTML/CSS, of course! Render the wikipage
// template, passing the retrieved page as the page property of the locals object of the render
// function. You'll also need to go to the wikipage template in your views folder and use Nunjucks
// tags to show the actual page title and content (replace PLACEHOLDER PAGE TITLE & PLACEHOLDER
//   PAGE CONTENT with Nunjucks interpolations).
module.exports = router;
