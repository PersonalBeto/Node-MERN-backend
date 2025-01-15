const moment = require('moment');

const diffDate = ( rest ) => {

    const { start, end } = rest;

    const dateStart = moment(start);
    const dateEnd = moment(end);
    const diff = dateStart.diff(dateEnd);
    
    if ( dateStart.isBefore(dateEnd) ) {
        return false;
    } else {
        return true;
    }
}

module.exports = { diffDate };
