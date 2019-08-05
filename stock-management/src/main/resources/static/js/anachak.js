

function alert_message() {
    $.smallBox({
        title: "Anachak",
        content: "You have committed successfully!",
        color: "#739E73",
        iconSmall: "fa fa-bell-o",
        timeout: 5000
    });
}
function alert_error() {
    $.smallBox({
        title: "Anachak",
        content: "Unsuccessfully! Please verify data again!",
        color: "#E2504A",
        iconSmall: "fa fa-bell-o",
        timeout: 5000
    });
}