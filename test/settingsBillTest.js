let assert = require('assert');
let settingsBillModule = require('../settingsBillLogic');
let chai = require('chai');
let chaiAssert = chai.assert;

describe('totals functions', function () {


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

describe('critical level function', function () {
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
});

describe('get log function for all billtypes (call and sms\'s)', function () {
    it('should return an array of objects with correct log details for computed sms\'s and calls', function () {
        let settingsBill = settingsBillModule();
        settingsBill.setCall('3');
        settingsBill.setSms('2');
        settingsBill.setCritical('15');
        settingsBill.compute('call');
        settingsBill.compute('sms');

        assert.equal(settingsBill.log()[0].type, 'sms');
        assert.equal(settingsBill.log()[0].cost, 2);
        assert.equal(settingsBill.log()[1].type, 'call');
        assert.equal(settingsBill.log()[1].cost, 3);

    });
});
describe('get log function with specific billtype', function () {
    it('should return an object with correct log details for a computed call', function () {
        let settingsBill = settingsBillModule();
        settingsBill.setCall('6.50');
        settingsBill.setSms('2');
        settingsBill.setCritical('15');
        settingsBill.compute('call');
        settingsBill.compute('sms');


        assert.equal(settingsBill.log('call')[0].type, 'call');
        assert.equal(settingsBill.log('call')[0].cost, 6.50);

    });
    it('should return an object with correct log details for a computed sms', function () {
        let settingsBill = settingsBillModule();
        settingsBill.setCall('6.50');
        settingsBill.setSms('2.50');
        settingsBill.setCritical('15');
        settingsBill.compute('call');
        settingsBill.compute('sms');

        assert.equal(settingsBill.log('sms')[0].type, 'sms');
        assert.equal(settingsBill.log('sms')[0].cost, 2.50);

    });
});