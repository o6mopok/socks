var assert = require('assert');
var TEST_PAGE_URL = 'https://jungle-socks.herokuapp.com/';
var EXPECTED_PAGE_TITLE = 'JungleSocks'
var EXPECTED_PAGE_HEADER = 'Welcome To Jungle Socks!'

before(function(){
    console.log('==== BEFORE')
});

describe('JungleSocks page', function() {
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
        it('should calculate the right total - ', function () {
            var input = browser.element('[name="line_items[][quantity]"]');
            input.setValue('1')
            console.log('input', input)
            assert.equal(input.getValue(), '1');
            browser.selectByValue('select[name="state"]',"CA")
            browser.submitForm('form[action="/checkout/create"]');
            browser.waitUntil(function () {
                return (browser.getUrl().indexOf('/checkout/create')>0)
            },3000)
            assert.equal(browser.getText("#subtotal"), '$13.00');            
            assert.equal(browser.getText("#taxes"), '$1.04');            
            assert.equal(browser.getText("#total"), '$14.04');            
        });
    });

});



after(function(){
    console.log('==== DONE!')
});