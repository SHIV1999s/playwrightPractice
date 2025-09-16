// @ts-check
const { test, expect } = require('@playwright/test');
const workingWithMidtrans = require('../../../pomClass/stock/workingWithMidtrans')
test('has title', {tag:'@workingWithMidtrans'},async ({ page }) => {
  const workingwithmidtrans = new workingWithMidtrans(page, expect);
  await workingwithmidtrans.goTourl()
  await workingwithmidtrans.goToPaymentPage()
  await workingwithmidtrans.fillCardDetails()
  await workingwithmidtrans.goToOtpPageSubmit()
  await workingwithmidtrans.verfiyPayementDont() 
});
