var assert = require('assert');
var WAIT_TIME = 10000
var TEST_PAGE_URL = 'https://jungle-socks.herokuapp.com';
var EXPECTED_PAGE_TITLE = 'JungleSocks'
var EXPECTED_PAGE_HEADER = 'Welcome To Jungle Socks!'

var STATES_TO_TEST = ['CA','NY','MN']

var ITEMS = [
    {   
        name:'zebra',
        price:13
    },
    {   
        name:'lion',
        price:20
    },
    {   
        name:'elephant',
        price:35
    },
    {   
        name:'giraffe',
        price:17
    }
]


function getSubtotal(items) {
    var subtotal = 0
    items.forEach(function(item) {
        subtotal += parseFloat(item.price)
    })
    return subtotal
}

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
    describe('JungleSocks Prices', function() {
        it('should calculate the right tax for state - '+state, function () {

            browser.url(TEST_PAGE_URL);
            ITEMS.forEach(function(item){
                browser.setValue('#line_item_quantity_'+item.name,1)        
            })
            browser.selectByValue('select[name="state"]',state)
            browser.submitForm('form[action="/checkout/create"]');
            browser.waitUntil(function () {
                return (browser.getUrl().indexOf('/checkout/create')>0)
            },WAIT_TIME)
            assert.equal(getFloatFromCurrency(browser.getText("#subtotal")), subtotal);  
            var calculatedExpectedTaxAmount = calculateExpectedTax(subtotal,state)
            assert.equal(getFloatFromCurrency(browser.getText("#taxes")), calculatedExpectedTaxAmount);
            var calculatedExpectedTotal = calculateExpectedTotal(subtotal,state)
            assert.equal(getFloatFromCurrency(browser.getText("#total")), calculatedExpectedTotal);

        });
    });
}

before(function(){
    console.log('==== BEFORE')
});

describe('JungleSocks Prices for various states', function() {
    var subtotal = getSubtotal(ITEMS)
    STATES_TO_TEST.forEach(function(state){
        testTotalPriceByState(subtotal,state)            
    })
})

after(function(){
    console.log('==== DONE!')
});