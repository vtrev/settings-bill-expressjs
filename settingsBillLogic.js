module.exports = function () {
    //sms and call totals init 
    var smsSetTotal = 0;
    var callSetTotal = 0;

    //the bill object which will store the settings from the dom
    var bill = {
        'call': 0,
        'sms': 0,
        'warning': 0,
        'critical': 0

    }

    //get values from the HTML form and set them into the bill object
    var getCall = function (callSetting) {
        bill['call'] = parseFloat(callSetting);
    }

    function getSms(smsSetting) {
        bill['sms'] = parseFloat(smsSetting);
    }

    function getWarning(warnSetting) {
        bill['warning'] = parseFloat(warnSetting);
    }

    function getCritical(criticalSetting) {

        bill['critical'] = parseFloat(criticalSetting);
    }


    //compute call or sms bill given the settings above

    function computeSettings(checkedRadioBtn1) {

        if (checkedRadioBtn1 === 'call') {

            (getTotal() < bill.critical) ? callSetTotal += bill.call: console.log('over the line mark Zero!');

        }

        if (checkedRadioBtn1 === 'sms') {

            (getTotal() < bill.critical) ? smsSetTotal += bill.sms: console.log('over the line mark Zero!');
        }
        console.log('sms total : ' + smsSetTotal);

    }

    //get the totals and return them
    let getSetWarning = function () {
        return bill.warning;
    };
    let getSetCritical = function () {
        return bill.critical;
    }

    var getSmsTotal = function () {
        return smsSetTotal;
    }
    var getCallTotal = function () {
        return callSetTotal;
    }
    var getTotal = function () {
        return getSmsTotal() + getCallTotal()
    }

    return {

        setCall: getCall,
        setSms: getSms,
        getWarning: getSetWarning,
        getCritical: getSetCritical,
        setWarning: getWarning,
        setCritical: getCritical,
        compute: computeSettings,
        total: getTotal,
        getSms: getSmsTotal,
        getCall: getCallTotal,
        bill: bill

    }


}