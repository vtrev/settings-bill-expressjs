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

    let smsSetTotal = 0;
    let callSetTotal = 0;
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
    //compute call or sms bill given the settings above

    function compute(billType) {


        if (billType === 'call') {

            (getTotal() < billSet.criticalLevel) ? totals.call += callSet: console.log('over the line mark Zero!');
            if (billType === 'call') {

                (getTotal() < billSet.criticalLevel) ? callSetTotal += billSet.callCost: console.log('over the line mark Zero!');
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
        console.log(smsSetTotal);
    }


}
console.log('SMS TOTAL : ' + smsSetTotal, 'CALL TOTAL : ' + callSetTotal);



return {
    compute
}


}