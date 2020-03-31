/* GLOBAL FUNCTIONS */
/* ALERT MESSAGE */
function alert_message(msg) {
    $.smallBox({
        title: "Anachak Store",
        content: msg,
        color: "#739E73",
        iconSmall: "fa fa-bell-o",
        timeout: 5000
    });
}
/* GET LABEL FOR INACTIVE AND ACTIVE */
function getStatus(Status) {
    return {
        true: "<span class=\"label label-danger\">inactive</span>",
        false: "<span class=\"label label-success\">active</span>"
    }[Status];
}
/* CONVERT TO NUMBER */
function toNumber(string){
    const result = isNaN(parseFloat(string)) ? 0 : parseFloat(string);
    return result;
}

/* CONVERT TO DATE */
function toDate(dateStr) {
    var parts = dateStr.split("-")
    return new Date(parts[2], parts[1] - 1, parts[0])
}