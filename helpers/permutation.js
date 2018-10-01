exports.isPermutation = (a, b) => {
    if (a.toString().length !== b.toString().length) {
        return false;
    }
    return a.toString().split('').sort().join() === b.toString().split('').sort().join();
};
