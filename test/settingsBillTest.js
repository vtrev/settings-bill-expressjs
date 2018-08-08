let assert = require('assert');
let settingsBillModule = require('../settingsBillLogic');
let chai = require('chai');
let chaiAssert = chai.assert;

describe('Totals functions', function () {


    it('Should calculate all computed sms\'s with respect to the set cost', function () {
        let settingsBill = settingsBillModule();
        settingsBill.setCall('3');
        settingsBill.setSms('1');
        settingsBill.setCritical('15');
        settingsBill.compute('sms');
        settingsBill.compute('sms');
        settingsBill.compute('sms');
        settingsBill.compute('sms');
        settingsBill.compute('sms');
        settingsBill.compute('sms');
        settingsBill.compute('sms');
        assert.equal(settingsBill.getSms(), 7);
    });
    it('Should calculate all computed calls with respect to the set cost', function () {
        let settingsBill = settingsBillModule();
        settingsBill.setCall('3');
        settingsBill.setSms('1');
        settingsBill.setCritical('15');
        settingsBill.compute('call');
        settingsBill.compute('call');
        settingsBill.compute('call');
        settingsBill.compute('call');
        settingsBill.compute('call');
        assert.equal(settingsBill.getCall(), 15);
    });


    it('Should return the correct total cost of the computed bill with respect to the set costs and quantity of each bill type computed', function () {
        let settingsBill = settingsBillModule();
        settingsBill.setCall('3');
        settingsBill.setSms('2');
        settingsBill.setCritical('10');
        settingsBill.compute('call');
        settingsBill.compute('call');
        settingsBill.compute('sms');
        assert.equal(settingsBill.total(), 8);
    });



});

describe('Critical level function', function () {
    it('Should only compute bill items until the critical level is reached, the total must always be equal to the critical level', function () {
        let settingsBill = settingsBillModule();
        settingsBill.setCall('3');
        settingsBill.setSms('2');
        settingsBill.setCritical('15');
        settingsBill.compute('call');
        settingsBill.compute('call');
        settingsBill.compute('call');
        settingsBill.compute('call');
        settingsBill.compute('call');
        settingsBill.compute('sms');
        settingsBill.compute('sms');
        settingsBill.compute('sms');
        assert.equal(settingsBill.total(), 15);
    });
})