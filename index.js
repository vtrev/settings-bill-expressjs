// DECLARATIONS
let bodyParser = require('body-parser');
let settingsBillFactory = require('./settingsBillLogic');
let settingsBill = settingsBillFactory();
let express = require('express');
let app = express();
let fullPage = {};
let exphbs = require('express-handlebars');


// SETTINGS
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));

app.set('view engine', 'handlebars');
app.use('/', express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));


// GET ROUTES

app.get('/', function (req, res) {
    res.render('home');
});


app.get('/actions', function (res, req) {


});

app.get('actions/:type', function (res, req) {

});


// POST ROUTES
app.post('/settings', function (req, res) {
    //get the settings from the form && parse the settings into the logic
    settingsBill.setCall(req.body.smsCost);
    settingsBill.setSms(req.body.callCost);
    settingsBill.setCritical(req.body.criticalLevel);
    settingsBill.setWarning(req.body.warningLevel);
    let settings = settingsBill.bill;
    fullPage.settings = settings;
    res.render('home', fullPage);
});



app.post('/action', function (req, res) {
    let billType = req.body.billItemType;
    let totals = {
        class: ''
    };
    settingsBill.compute(billType);
    totals.call = settingsBill.getCall();
    totals.sms = settingsBill.getSms();
    totals.billTotal = settingsBill.total();
    // console.log('bill total : ' + typeof (totals.billTotal));
    console.log('warning level : ' + typeof (totals.class));

    if (totals.billTotal >= settingsBill.getWarning()) {
        totals.class = 'warning';
    }
    if (totals.billTotal >= settingsBill.getCritical()) {
        totals.class = 'danger';
    }

    fullPage.totals = totals;
    res.render('home', fullPage);
});


// SERVER START

let PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
    console.log('starting bill-settings on port : ', PORT)
});