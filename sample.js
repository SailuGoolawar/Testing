function formatCurrency(number) {
    if (number >= 1000 && number < 1000000) {
        return Math.floor(number / 100) / 10 + 'K';
    } else if (number >= 1000000 && number < 1000000000) {
        return Math.floor(number / 100000) / 10 + 'M';
    } else if (number >= 1000000000 && number < 1000000000000) {
        return Math.floor(number / 100000000) / 10 + 'B';
    } else if (number >= 1000000000000) {
        return (number / 1000000000000).toFixed(1) + 'T';
    } else {
        return number.toString();
    }
}
