let express = require('express');
let app = express();
let bodyParser = require('body-parser')
app.use(express.static('public'));

let exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');



app.get('/', function (req, res) {
    res.render('home', {
        test: 'this is some testing text'
    });
});

let PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
    console.log('starting bill-settings on port : ', PORT)
});