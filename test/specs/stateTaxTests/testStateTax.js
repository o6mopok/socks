var assert = require('assert');
var TEST_PAGE_URL = 'https://jungle-socks.herokuapp.com/';
var EXPECTED_PAGE_TITLE = 'JungleSocks'
var EXPECTED_PAGE_HEADER = 'Welcome To Jungle Socks!'

var STATES_TO_TEST = ['CA','NY','MN']

function getStateTax(state) {
    switch (state) {
        case 'CA':
            return 0.08
        case 'NY':
            return 0.06
        case 'MN':
            return 0.00
        default:
            return 0.05
    }
}

function getExpectedSubtotal(subtotal) {
    return Math.round((subtotal)*100)/100
}

function calculateExpectedTax(subtotal, state) {
    var tax = getStateTax(state)
    return Math.round((subtotal * tax)*100)/100
}

function calculateExpectedTotal(subtotal, state) {
    var taxAmount = calculateExpectedTax(subtotal, state)
    return Math.round((subtotal + taxAmount)*100)/100
}

function getFloatFromCurrency(str){
    return parseFloat(str.replace("$",""))
}

function testTotalPriceByState(subtotal,state) {
    browser.url(TEST_PAGE_URL);
    browser.waitUntil(function () {
        return (browser.getUrl().indexOf(TEST_PAGE_URL)>-1)
    },3000)

    var input = browser.element('[name="line_items[][quantity]"]');
    input.setValue('1')
    browser.selectByValue('select[name="state"]',state)
    browser.submitForm('form[action="/checkout/create"]');
    browser.waitUntil(function () {
        return (browser.getUrl().indexOf('/checkout/create')>0)
    },3000)
    var expectedSubtotal = getExpectedSubtotal(subtotal)
    console.log("expectedSubtotal: ",expectedSubtotal)
    assert.equal(getFloatFromCurrency(browser.getText("#subtotal")), expectedSubtotal);  
    var calculatedExpectedTaxAmount = calculateExpectedTax(subtotal,state)
    console.log('calculatedExpectedTaxAmount: '+calculatedExpectedTaxAmount)
    assert.equal(getFloatFromCurrency(browser.getText("#taxes")), calculatedExpectedTaxAmount);
    var calculatedExpectedTotal = calculateExpectedTotal(subtotal,state)
    assert.equal(getFloatFromCurrency(browser.getText("#total")), calculatedExpectedTotal);

}

before(function(){
    console.log('==== BEFORE')
});

describe('JungleSocks Prices', function() {
    it('should calculate the right tax for states - ', function () {
        STATES_TO_TEST.forEach(function(state){
            testTotalPriceByState(13.00,state)
        })
    });
});

after(function(){
    console.log('==== DONE!')
});