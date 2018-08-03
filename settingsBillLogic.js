module.exports = function (billSet) {

    let callSet = parseFloat(billSet.callCost);
    let smsSet = parseFloat(billSet.smsCost);
    let warnSet = parseFloat(billSet.warningLevel);
    let criticSet = parseFloat(billSet.criticalLevel);


    let totals = {
        call: 0,
        sms: 0
    }


    let smsSetTotal = totals.sms;
    let callSetTotal = totals.call;

    //compute call or sms bill given the settings above

    function compute(billType) {


        if (billType === 'call') {

            (getTotal() < billSet.criticalLevel) ? totals.call += callSet: console.log('over the line mark Zero!');
        }

        if (billType === 'sms') {

            (getTotal() < billSet.criticalLevel) ? smsSetTotal += smsSet: console.log('over the line mark Zero!');
        }

    }

    //get the totals and return them

    let getSmsTotal = function () {
        return smsSetTotal
    }
    let getCallTotal = function () {
        return callSetTotal
    }
    let getTotal = function () {
        return getSmsTotal() + getCallTotal()
    }


    console.log(callSetTotal, smsSetTotal);


    return {
        compute
    }


}