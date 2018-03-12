const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');
const fs = require('fs');
const path = require('path');
const models = require('./models');
const router = require("./routes")

const app = express();

app.use(morgan('dev'));
//body parser for submitting forms
app.use(bodyParser.urlencoded({extended: true}));
//body parser for ajax requests
app.use(bodyParser.json());

app.use(express.static(__dirname + '/views'))
// both work
// app.use(express.static(path.join(__dirname, '/views')))

const env = nunjucks.configure('views', {noCache: true});
// have res.render work with html files
app.set('view engine', 'html');
// when res.render works with html files, have it use nunjucks to do so
app.engine('html', nunjucks.render);

app.use("/", router);

// app.use((err, req, res, next) => {
//   // console.error(err);
//   // res.status(500).send("There is an error");
//   res.status(err.status || 500);
//   res.render('error', {
//     message: err.message,
//     error: err
//   });
// });

models.db.sync({force: true})
.then(function () {
    console.log('All tables created!');
    app.listen(3000, function () {
        console.log('Server is listening on port 3000!');
    });
})
.catch(console.error.bind(console));
