////Defining modules
//Built-in modules
const path = require('path');

//Third-party modules
const express = require('express');
const bodyParser = require('body-parser');


//Internal modules
const userRoutes = require('./routes/user');

////Create express app
const app = express();

//Set static folder
app.use(express.static(path.join(__dirname, 'public')));

//Template engine
app.set('view engine', 'ejs');
app.set('views', 'views');
////Middleware
app.use(bodyParser.urlencoded({
    extended: false
}));

//Router
app.use(userRoutes);
app.use((req, res, next) => {
    res.status(404).render('404', {
        errorMsg: 'Page not found!'
    });
})
////Setting up a PORT and starting a server
const PORT = process.env.PORT || 8000;
app.listen(PORT);