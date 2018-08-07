module.exports = function () {
    //sms and call totals init 
    var smsSetTotal = 0;
    var callSetTotal = 0;

    //the bill object which will store the settings from the client side
    var bill = {
        'call': 0,
        'sms': 0,
        'warning': 0,
        'critical': 0
    };
    //Array of all call logs
    let fullLog = [];

    //get values from the HTML form and set them into the bill object
    var getCall = function (callSetting) {
        bill.call = parseFloat(callSetting);
    }

    function getSms(smsSetting) {
        bill.sms = parseFloat(smsSetting);
    }

    function getWarning(warnSetting) {
        bill.warning = parseFloat(warnSetting);
    }

    function getCritical(criticalSetting) {

        bill.critical = parseFloat(criticalSetting);
    }

    function getLog(billType) {
        if (billType) {
            return fullLog.filter(action => action.type === billType);
        } else {
            return fullLog;
        };
    };


    //compute call or sms bill given the settings above and add a timestemp on the record

    function computeSettings(checkedRadioBtn) {
        let tmpLog = {
            time: new Date(),
            type: checkedRadioBtn
        };


        if (checkedRadioBtn === 'call') {

            (getTotal() < bill.critical) ? callSetTotal += parseFloat(bill.call): console.log('over the line mark Zero!');
            tmpLog.cost = bill.call.toFixed(2);

        }

        if (checkedRadioBtn === 'sms') {

            (getTotal() < bill.critical) ? smsSetTotal += parseFloat(bill.sms): console.log('over the line mark Zero!');
            tmpLog.cost = bill.sms.toFixed(2);
        }

        fullLog.unshift(tmpLog);
    }

    //get the totals and return them
    let getSetWarning = function () {
        return bill.warning;
    };
    let getSetCritical = function () {
        return bill.critical;
    }

    var getSmsTotal = function () {
        return smsSetTotal.toFixed(2);
    }
    var getCallTotal = function () {
        return callSetTotal.toFixed(2);
    }
    var getTotal = function () {
        let sms = parseFloat(getSmsTotal());
        let call = parseFloat(getCallTotal());
        return (sms + call).toFixed(2);
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
        bill: bill,
        log: getLog

    }


}