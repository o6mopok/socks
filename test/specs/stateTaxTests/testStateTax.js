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
});

after(function(){
    console.log('==== DONE!')
});