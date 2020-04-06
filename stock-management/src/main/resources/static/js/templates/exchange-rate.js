$(document).ready(function () {
    $('#effective-date').datepicker({
        dateFormat: 'dd-mm-yy',
        prevText: '<i class="fa fa-chevron-left"></i>',
        nextText: '<i class="fa fa-chevron-right"></i>',
        onSelect: function (selectedDate) {
            $('#effective-date').datepicker('option', 'minDate', new Date());
        }
    });

    /* SAVE EXCHANGE RATE */
    $(document).on('submit', '#frm-create-exchange-rate', function (event) {
        event.preventDefault();
        let ex_id = $('#exchange-rate-id').val();
        if(ex_id !== ""){
            alert_message("This data is already exist!")
            return;
        }
        let ex_type = $('#ex-type').val();
        let buy_rate = toNumber($('#buy-rate').val());
        let sell_rate = toNumber($('#sell-rate').val());
        let mid_rate = toNumber($('#mid-rate').val());
        let effective_date = toDate($("#effective-date").val());
        $.ajax({
            async: false,
            dataType: "json",
            type: "POST",
            url: "/save-exchange-rate",
            data: {ex_id: ex_id, ex_type: ex_type, buy_rate: buy_rate, sell_rate: sell_rate, mid_rate: mid_rate, effective_date: effective_date},
            success: function (data) {
                let ex_id = data.ex_id;
                alert_message("You have committed successfully!");
                $("#exchange-rate-id").val(ex_id);
            },
            error: function (error) {
                alert_message("Error: " + error);
            }
        });
    });

    /* EVENTS FOR BUTTON NEW */
    $("#btn-new-exchange-rate").on("click", function () {
        clear_frm_create_exchange_rate();

    });

    /* CLEAR FORM CREATE EXCHANGE RATE */
    function clear_frm_create_exchange_rate() {
        $('input:text, input:number, input:password, input:file, select, textarea', '#frm-create-exchange-rate').val('');
        $(function(){
            $("#effective-date").focus();
        });
    }

    /* VALIDATIONS */
    /* ADDED BY DOLLA 29-MAR-2020 */
    let $frm_create_exchange_rate = $('#frm-create-exchange-rate').validate({
        errorClass: global_variables.gbl_errorClass,
        errorElement: global_variables.gbl_errorElement,
        highlight: function (element) {
            $(element).parent().removeClass('state-success').addClass("state-error");
            $(element).removeClass('valid');
        },
        unhighlight: function (element) {
            $(element).parent().removeClass("state-error").addClass('state-success');
            $(element).addClass('valid');
        },

        /* FIELDS THAT WILL CHECK VALIDATE */
        /* BY NAME OF ATTRIBUTE */
        rules: {
            ex_type: {
                required: true
            },
            effective_date: {
                required: true
            },
            buy_rate: {
                required: true
            },
            sell_rate: {
                required: true
            },
            mid_rate: {
                required: true
            }
        },

        /* MESSAGE INVALID FOR EACH  FIELDS ABOVE */
        messages: {
            ex_type: {
                required: 'Required*'
            },
            effective_date: {
                required: 'Required*'
            },
            buy_rate: {
                required: 'Required*'
            },
            sell_rate: {
                required: 'Required*'
            },
            mid_rate: {
                required: 'Required*'
            }
        },

        /* DEFAULT OF SMARTADMIN */
        /* DON'T CHANGE */
        errorPlacement: function (error, element) {
            error.insertAfter(element.parent());
        }
    });
});