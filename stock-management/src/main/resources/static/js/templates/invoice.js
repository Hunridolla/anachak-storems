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
        let invoice_date = toDate($("#invoice-date").val());
        let customer_id = $("#customers").val();
        let seller = $("#seller").val();
        let ship_date = toDate($("#ship-date").val());
        /*
        if ($("#ship-date").val() == ""){
            ship_date = null;
        }else{
            ship_date = toDate($("#ship-date").val());
        }*/
        let ship_to= $("#ship-to").val();
        let remark = $("#remark").val();
        let sub_amt = toNumber($("#total-subAmt").val());
        let disc_amt = toNumber($("#total-disc").val());
        let total_amt = toNumber($("#total-amt").val());
        $.ajax({
            async: false,
            dataType: "json",
            type: "POST",
            url: "/save-invoice",
            data: {
                inv_id: invoice_id, inv_date: invoice_date, customer_id: customer_id, seller: seller,
                ship_date: ship_date, ship_to: ship_to, remark: remark, sub_amt: sub_amt, disc_amt: disc_amt,
                total_amt: total_amt
            },
            success: function (data) {
                let invoice_id = data.inv_id;
                /* SAVE INVOICE DETAIL HERE */
                saveInvoiceDetail(invoice_id);
                alert_message("You have committed successfully!");
                $("#invoice-id").val(invoice_id);
            },
            error: function (e) {
                alert_message("Error:" + e);
            }
        });
    });

    /* LOAD BILL DETAIL INTO DB */
    function saveInvoiceDetail(invoice_id) {
        $('#tbl-invoice-item > tbody  > tr').each(function () {
            let item_code = $(this).closest("tr").find("td:eq(1)").text();
            let item_desc = $(this).closest("tr").find("td:eq(2)").text();
            let item_qty = toNumber($(this).closest("tr").find("td:eq(3)").text());
            let item_rate = toNumber($(this).closest("tr").find("td:eq(4)").text());
            let item_disc = toNumber($(this).closest("tr").find("td:eq(5)").text());
            let item_sub_amt = toNumber($(this).closest("tr").find("td:eq(6)").text());
            let item_total_amt = toNumber($(this).closest("tr").find("td:eq(7)").text());

            $.ajax({
                async: false,
                dataType: "json",
                type: "POST",
                url: "/save-invoice-detail",
                data: {
                    inv_id: invoice_id, item_code: item_code, item_desc: item_desc, item_qty: item_qty,
                    item_rate: item_rate, item_disc: item_disc, item_sub_amt: item_sub_amt, item_total_amt: item_total_amt
                },
                success: function () {
                },
                error: function () {
                }
            });
        });
    }

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
        $(function(){
            $("#invoice-date").focus();
        });
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
            },
            ship_date: {
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
            },
            ship_date: {
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