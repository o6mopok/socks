var assert = require('assert');
var TEST_PAGE_URL = 'https://jungle-socks.herokuapp.com/';
var EXPECTED_PAGE_TITLE = 'JungleSocks'
var EXPECTED_PAGE_HEADER = 'Welcome To Jungle Socks!'


function getStateTax(state) {
    switch (state) {
        case 'CA':
            return 0.08
        case 'NY':
            return 0.06
        case 'NM':
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
    it('should have the right title - '+EXPECTED_PAGE_TITLE, function () {
        var title = browser.getTitle();
        assert.equal(title, EXPECTED_PAGE_TITLE);
    });
    it('should have the right title - '+EXPECTED_PAGE_HEADER, function () {
        var h1 = browser.getText('h1');
        assert.equal(h1, EXPECTED_PAGE_HEADER);
    });

    describe('JungleSocks input form', function() {
        browser.url(TEST_PAGE_URL);
        it('should calculate the right tax - ', function () {

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
        })

    });

}

before(function(){
    console.log('==== BEFORE')
});

describe('JungleSocks page', function() {
    testTotalPriceByState(13.00,'CA')
});



after(function(){
    console.log('==== DONE!')
});