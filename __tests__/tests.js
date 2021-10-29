'use strict';
// const { beforeAll, afterEach } = require('@jest/globals');
const faker = require('faker');

let driverLogEvent = require('../modules/driver.js');
let { logEvent, vendorLogEvent } = require('../modules/vendor.js');
let consoleSpy;
let sampleSpyLog;

beforeEach(() => {
  consoleSpy = jest.spyOn(console, 'log').mockImplementation();
  sampleSpyLog = {
    store: 'Best Store',
    orderID: faker.datatype.uuid(),
    customer: `${faker.name.firstName()} ${faker.name.lastName()}`,
    addreess: `${faker.address.city()}, ${faker.address.state()}`,
  }
})

afterEach(() => {
  consoleSpy.mockRestore()
})

describe('if store is the same', () => {
  it('should match console log from Vender Log', () => {
    let vendorDelivered = `VENDOR: Thank you for delivering ${sampleSpyLog.orderID}`
    vendorLogEvent(vendorDelivered)
    expect(consoleSpy).toHaveBeenCalledWith(`VENDOR: Thank you for delivering ${sampleSpyLog.orderID}`)
  })
  it('should match console log from Driver Log', () => {
    let driverDelivered = `DRIVER: delivered ${sampleSpyLog.orderID}`
    driverLogEvent(driverDelivered)
    expect(consoleSpy).toHaveBeenCalledWith(`DRIVER: delivered ${sampleSpyLog.orderID}`)
  })
  it('should test logEvent to see if payload matches', () => {
    expect(logEvent('EVENT',sampleSpyLog)).toEqual(sampleSpyLog);
  })
})
