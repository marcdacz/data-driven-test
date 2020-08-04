const utils = require("../../utils");
const baseData = require("./base.json");

baseData.customer.customerId = "customer01";

let orderItem01 = baseData.orderedItem[0];
orderItem01.productId = "product01";
orderItem01.orderQuantity = 2;

let orderItem02 = utils.copyObject(orderItem01);
orderItem02.productId = "product02";
orderItem02.orderQuantity = 3;

baseData.orderedItem = [orderItem01, orderItem02];

module.exports = baseData;
