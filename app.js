const express = require('express');
const bodyParser = require('body-parser');

const app = express();

<<<<<<< HEAD
var port=Number(process.env.PORT || 3000);

//access to static assets in public folder. css/images
app.use('/static', express.static('public'));
=======
const port = process.env.PORT || '3000'
>>>>>>> db311d7d3eb08a19d09b247ce42e1fafb4484730

//for pug
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.set('view engine', 'pug');


//import routes
const mainRoutes = (require('./routes'))
app.use(mainRoutes);


///input error app.us catchers
app.use((err, req, res, next) => {
    res.locals.error = err;
    res.status(err.status);
    res.render('error')
});

app.listen(port)
