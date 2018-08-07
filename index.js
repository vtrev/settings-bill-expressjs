// DECLARATIONS
let bodyParser = require('body-parser');
let settingsBillFactory = require('./settingsBillLogic');
let settingsBill = settingsBillFactory();
let express = require('express');
let app = express();
let fullPage = {
    totals: {
        call: 0.00,
        sms: 0.00,
        billTotal: 0.00

    }
};
let exphbs = require('express-handlebars');
let moment = require('moment');


// SETTINGS
app.engine('handlebars', exphbs({
    defaultLayout: 'main',
    helpers: {
        'logTime': function () {
            return moment(this.time).fromNow()
        }
    }
}));

app.set('view engine', 'handlebars');
app.use('/', express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));


// GET ROUTES

app.get('/', function (req, res) {
    res.render('home', fullPage);
});
app.get('/actions', function (req, res) {
    let log = settingsBill.log();
    res.render('actions', {
        log
    });



});

app.get('/actions/:type', function (req, res) {
    let billType = req.params.type;
    let log = settingsBill.log(billType);
    res.render('actions', {
        log
    });

});






// POST ROUTES
app.post('/settings', function (req, res) {
    //get the settings from the form && parse the settings into the logic
    settingsBill.setCall(req.body.callCost);
    settingsBill.setSms(req.body.smsCost);
    settingsBill.setCritical(req.body.criticalLevel);
    settingsBill.setWarning(req.body.warningLevel);
    let settings = settingsBill.bill;
    fullPage.settings = settings;
    res.redirect('/');
    // res.render('home', fullPage);
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

    if (totals.billTotal >= settingsBill.getWarning()) {
        totals.class = 'warning';
    }
    if (totals.billTotal >= settingsBill.getCritical()) {
        totals.class = 'danger';
    }

    fullPage.totals = totals;
    res.redirect('/');
    // res.render('home', fullPage);
});





// SERVER START

let PORT = process.env.PORT || 3001;
app.listen(PORT, function () {
    console.log('starting bill-settings on port : ', PORT)
});