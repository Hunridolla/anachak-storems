$(document).ready(function () {

    $('#btn-save-exRate').on('click', function (event) {
        event.preventDefault();
        var ex_id = $('#ex-id').val();
        ex_id = '';
        var ex_type = $('#ex-type').val();
        var buy_rate = toNumber($('#buy-rate').val());
        var sell_rate = toNumber($('#sell-rate').val());
        var mid_rate = toNumber($('#mid-rate').val());
        var effective_date = toDate($("#effective-date").val());
        alert(mid_rate);
        $.ajax({
            async: false,
            dataType: "json",
            type: "POST",
            url: "/save-exchange-rate",
            data: {ex_id: ex_id, ex_type: ex_type, buy_rate: buy_rate, sell_rate: sell_rate, mid_rate: mid_rate, effective_date: effective_date},
            success: function () {
                alert_message();
                // clear_ctrl();
            },
            error: function (e) {
                alert('Error: ' + e);
            }
        });
    });

    function alert_message() {
        $.smallBox({
            title: "Fiplus Khmer",
            content: "You have committed successfully!",
            color: "#739E73",
            iconSmall: "fa fa-bell-o",
            timeout: 5000
        });
    }
    function toDate(dateStr) {
        var parts = dateStr.split("-")
        return new Date(parts[2], parts[1] - 1, parts[0])
    }
});