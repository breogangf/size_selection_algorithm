const assert = require('assert');
const permutationHelper = require('../helpers/permutation');

describe('Permutations', () => {
    it('should return false when the value is not a permutation', () => {
        assert.equal(permutationHelper.isPermutation(44, 24), false);
    });
    it('should return true when the value is a permutation', () => {
        assert.equal(permutationHelper.isPermutation(42, 24), true);
    });
});
