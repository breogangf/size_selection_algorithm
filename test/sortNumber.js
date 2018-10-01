const assert = require('assert');
const sortNumbersHelper = require('../helpers/sortNumbers');

describe('Sorting digits', () => {
    it('should return sorted digits for a given number', () => {
        assert.equal(sortNumbersHelper.sortNumber(325764), 234567);
    });
});
