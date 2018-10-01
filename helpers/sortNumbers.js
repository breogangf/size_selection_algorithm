exports.sortNumber = (number) => {
    const digits = (number.toString()).split('');
    return digits.sort((a, b) => a - b).join('');
};
