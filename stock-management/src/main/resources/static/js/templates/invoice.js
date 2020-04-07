$(document).ready(function () {
    $('#invoice-date').datepicker({
        dateFormat: 'dd-mm-yy',
        prevText: '<i class="fa fa-chevron-left"></i>',
        nextText: '<i class="fa fa-chevron-right"></i>'
    });
    $('#ship-date').datepicker({
        dateFormat: 'dd-mm-yy',
        prevText: '<i class="fa fa-chevron-left"></i>',
        nextText: '<i class="fa fa-chevron-right"></i>'
    });
    $("#btn-add-invoice-item").on('click', function (event) {
        clear_modal_add_item();
        $("#status").html("[new]");
        $("#status").attr("aria-valuetext", "[new]");
        $("#status").removeClass("label-primary");
        $("#status").addClass("label-success");
        global_variables.gbl_item_table_name = 'tbl-invoice-item';
        global_variables.gbl_rate_type = 'sale-price';
        $("#add-item-modal").modal();
    });

    /* SAVE INVOICE */
    $(document).on('submit', '#frm-create-invoice', function (event) {
        event.preventDefault();
        let invoice_id = $('#invoice-id').val();
        if (invoice_id !== "") {
            alert_message("This data is already exist!");
            return;
        }

    });

    /* EVENTS FOR BUTTON NEW, PRINT */
    $("#btn-new-invoice").on("click", function () {
        clear_frm_create_invoice();
    });
    $("#btn-print-invoice").on("click", function () {

    });

    /* CLEAR FORM CREATE INVOICE */
    function clear_frm_create_invoice(){
        $('input:text, input:password, input:file, select, textarea', '#frm-create-invoice').val('');
        $("#tbl-invoice-item > tbody").html("");
    }

    /* VALIDATIONS */
    /* ADDED BY DOLLA 29-MAR-2020 */
    let $frm_create_invoice = $('#frm-create-invoice').validate({
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
            invoice_date: {
                required: true
            },
            customers: {
                required: true
            },
            seller:{
                required: true
            },
            total_amt: {
                required: true
            }
        },

        /* MESSAGE INVALID FOR EACH  FIELDS ABOVE */
        messages: {
            invoice_date: {
                required: 'Required*'
            },
            customers: {
                required: 'Required*'
            },
            seller:{
                required: 'Required*'
            },
            total_amt: {
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