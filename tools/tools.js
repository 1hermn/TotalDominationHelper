module.exports = {
	convertTimestamp: function (timestamp) {
        var d = new Date(timestamp)
        yyyy = d.getFullYear()
        mm = ('0' + (d.getMonth() + 1)).slice(-2) // Months are zero based. Add leading 0.
        dd = ('0' + d.getDate()).slice(-2)         // Add leading 0.
        hh = d.getHours()
        h = hh
        min = ('0' + d.getMinutes()).slice(-2)     // Add leading 0.
        ampm = 'AM'

    if (hh > 12) {
        h = hh - 12
        ampm = 'PM'
    } else if (hh === 12) {
        h = 12
        ampm = 'PM'
    } else if (hh == 0) {
        h = 12
    }

    time = yyyy + '-' + mm + '-' + dd + ', ' + h + ':' + min + ' ' + ampm
    return time
},
    log: function(message, params){
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        today = mm + '/' + dd + '/' + yyyy;
        console.log(`[Log ${today}] ${message}`, params)
    }
}