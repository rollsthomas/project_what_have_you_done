const express = require('express');
const bodyParser = require('body-parser');

const app = express();

//for pug
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.set('view engine', 'pug');

//access to static assets in public folder. css/images
app.use('/static', express.static('public'));

//import routes
const mainRoutes = (require('./routes'))
app.use(mainRoutes);


///input error app.us catchers
app.use((err, req, res, next) => {
    res.locals.error = err;
    res.status(err.status);
    res.render('error')
});

app.listen(3000, function(){
  console.log('listening at port 3000');
})
