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


let summary = response.reduce((acc, curr) => {
        if (!acc[curr.zone]) {
            acc[curr.zone] = {
                activeTIV: 0,
                active_locations: 0,
                prospectTIV: 0,
                prospect_locations: 0
            };
        }
        acc[curr.zone].activeTIV += curr.activeTIV;
        acc[curr.zone].active_locations += curr.active_locations;
        acc[curr.zone].prospectTIV += curr.prospectTIV;
        acc[curr.zone].prospect_locations += curr.prospect_locations;
        return acc;
    }, {});
