

describe('Data-driven Tests', () => {
    const chai = require('chai')
    chai.use(require('chai-asserttype'))
    chai.use(require('deep-equal-in-any-order'))
    const expect = chai.expect

    const orders = require('../functions/orders')
    const utils = require('../functions/utils')
    let actualOrdersPath
    let expectedOrdersPath

    const orderIdPrefixes = [
        'order01'
    ]

    before(() => {
        actualOrdersPath = `../tests/data/orders/actual/${utils.timestamp()}`
        utils.ensureDirPath(actualOrdersPath)

        expectedOrdersPath = '../tests/data/orders/expected'
        utils.ensureDirPath(expectedOrdersPath)
    });

    for (const orderIdPrefix of orderIdPrefixes) {
        it(`Should be able to retrieve order: ${orderIdPrefix}`, async () => {
            const getOrderResponse = await orders.getOrderById(orderIdPrefix)
            const actualOrder = getOrderResponse.body
            utils.writeJson(actualOrder, `${actualOrdersPath}/${orderIdPrefix}_actual.json`)

            const expectedOrder = require(`../data/orders/expected/${orderIdPrefix}`)
            utils.writeJson(actualOrder, `${actualOrdersPath}/${orderIdPrefix}_expected.json`)

            expect(actualOrder).to.deep.equalInAnyOrder(expectedOrder)
        });
    }
  
});