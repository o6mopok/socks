var assert = require('assert');

describe('JungleSocks page', function() {
    it('should have the right title - JungleSocks', function () {
        browser.url('https://jungle-socks.herokuapp.com/');
        var title = browser.getTitle();
        assert.equal(title, 'JungleSocks');
    });
});