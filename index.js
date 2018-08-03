// DECLARATIONS
let bodyParser = require('body-parser')
let settingsBillFactory = require('./settingsBillLogic')
let express = require('express');
let app = express();

let exphbs = require('express-handlebars');


app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));

// SETTINGS

app.set('view engine', 'handlebars');
app.use('/', express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

// ROUTES & FUNCTIONS
// GET ROUTES

app.get('/', function (req, res) {
    res.render('home')
    // settingsBillFactory('sometext');
});
app.get('/actions', function (res, req) {


});

app.get('actions/:type', function (res, req) {

});


// POST ROUTES
<<<<<<< HEAD
app.post('/settings', function (req, res) {
    let settings = {
        callTotalSettings: 0.00,
        smsTotalSettings: 0.00,
        totalSettings: 0.00
    };
=======
let settings = {};
app.post('/settings', function (req, res) {

>>>>>>> a2f34163987141f4f80adac8be3d9d7a49de3a37
    settings.smsCost = req.body.smsCost;
    settings.callCost = req.body.callCost;
    settings.warningLevel = req.body.warningLevel;
    settings.criticalLevel = req.body.criticalLevel;
<<<<<<< HEAD
    //let the post requests do what the dom did
=======

>>>>>>> a2f34163987141f4f80adac8be3d9d7a49de3a37
    // var settings = {
    //     smsCost,
    //     callCost,
    //     warningLevel,
    //     criticalLevel
    // };
    res.render('home', {
        settings
    });
});

app.post('/action', function (req, res) {
    let billType = req.body.billItemType;
<<<<<<< HEAD

=======
>>>>>>> a2f34163987141f4f80adac8be3d9d7a49de3a37
    let setBill = settingsBillFactory(settings);
    setBill.compute(billType);
    // console.log(settings);
});












<<<<<<< HEAD
=======










>>>>>>> a2f34163987141f4f80adac8be3d9d7a49de3a37
// SERVER START

let PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
    console.log('starting bill-settings on port : ', PORT)
});