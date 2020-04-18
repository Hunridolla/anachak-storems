$(document).ready(function () {
    $('#receipt-date').datepicker({
        dateFormat: 'dd-mm-yy',
        prevText: '<i class="fa fa-chevron-left"></i>',
        nextText: '<i class="fa fa-chevron-right"></i>'
    });

    /* SHOW RECEIVABLE INVOICES */
    $("#btn-show-receivable").on("click", function (event) {
        event.preventDefault();
        let customer_id = $("#customers").val();
        let href = "/get-receivable-invoice/" + customer_id;
        $.get(href, function (data) {
            if(data != null && data != ""){
                SpreadInvoice(data);
                calculateInvoiceGrandAmt();
            }else{
                $("#NoReceivable").dialog("open");
                $("#tbl-receivable-invoice > tbody").html('');
                $("#total-subAmt").val('0.00');
                $("#total-disc").val('0.00');
                $("#total-amt").val('0.00');
                return false;
            }
        });
    });

    /* LOAD INVOICES INTO TABLE */
    function SpreadInvoice(data) {
        $("#tbl-receivable-invoice > tbody").html('');
        $.each(data, function (key) {
            let orig_amt = data[key].nfield1;
            let disc_amt = data[key].nfield2;
            let receive_amt = data[key].nfield3;
            let vInvoice = "<tr>" +
                "<td style=\"width:10px\" align=\'center\'><label class=\'checkbox\'> <input class='checked' type=\'checkbox\' checked=\'checked\'><i></i></label></td>" +
                "<td align=\'center\'><a class=\"btn btn-xs btn-primary gb-edit-invoice\"> <i class=\"fa fa-edit\"></i></a></td>"  +
                "<td>" + data[key].tfield1 + "</td>" +
                "<td>" + data[key].tfield2 + "</td>" +
                "<td>" + data[key].tfield3 + "</td>" +
                "<td>" + orig_amt.toFixed(2) + "</td>" +
                "<td>" + disc_amt.toFixed(2) + "</td>" +
                "<td>" + receive_amt.toFixed(2) + "</td>" +
                "</tr>";
            $("#tbl-receivable-invoice > tbody:last-child").append(vInvoice);
        });
    }

    /* FUNCTION CAL GRAND TOTAL */
    function calculateInvoiceGrandAmt() {
        $("#total-subAmt").val(calculateInvoiceColumn(7).toFixed(2));
        $("#total-disc").val(calculateInvoiceColumn(6).toFixed(2));
        $("#total-amt").val((calculateInvoiceColumn(7) - calculateInvoiceColumn(6)).toFixed(2));
    }
    /* FUNCTION CAL TOTAL BY COLUMN */
    function calculateInvoiceColumn(index) {
        let total = 0;
        $("#tbl-receivable-invoice input[type=checkbox]:checked").each(function () {
            let row = $(this).closest("tr")[0];
            let value = parseFloat(row.cells[index].innerHTML);
            if (!isNaN(value)) {
                total += value;
            }
        });
        return total;
    }
    /* EVENT FOR CHECK BOX CHANGE */
    $(document).on('change', "#tbl-receivable-invoice .checked", function (event) {
        calculateInvoiceGrandAmt();
    });

    /* SAVE RECEIPT */
    $(document).on("submit", "#frm-create-invoice-payment", function (event) {
        event.preventDefault();
        let receipt_id = $("#receipt-id").val();
        if(receipt_id !== ""){
            alert_message("This data is already exist!");
            return;
        }
        let receipt_date = toDate($("#receipt-date").val());
        let customer_id = $("#customers").val();
        let ref_no = $("#ref-no").val();
        let remark = $("#remark").val();
        let sub_amt = toNumber($("#total-subAmt").val());
        let disc_amt = toNumber($("#total-disc").val());
        let total_amt = toNumber($("#total-amt").val());
        $.ajax({
            async: false,
            dataType: "json",
            type: "POST",
            url: "/save-receipt",
            data: {
                receipt_id: receipt_id, receipt_date: receipt_date, customer_id: customer_id, ref_no: ref_no,
                remark: remark,sub_amt: sub_amt, disc_amt: disc_amt, total_amt: total_amt
            },
            success: function (data) {
                let receipt_id  = data.receipt_id;
                /* SAVE DETAIL HERE */
                saveReceiptDetail(receipt_id);
                alert_message("You have committed successfully!");
                $("#receipt-id").val(receipt_id);
            },
            error: function (event) {
                alert_message("Error: " + event);
            }
        });
    });

    /* SAVE RECEIPT DETAIL INTO DB */
    function saveReceiptDetail(receipt_id){
        $("#tbl-receivable-invoice > tbody > tr input[type=checkbox]:checked").each(function () {
            let inv_id = $(this).closest("tr").find("td:eq(2)").text();
            let disc_amt = toNumber($(this).closest("tr").find("td:eq(6)").text());
            let receive_amt = toNumber($(this).closest("tr").find("td:eq(7)").text());
            $.ajax({
                async: false,
                dataType: "json",
                type: "POST",
                url: "/save-receipt-detail",
                data: {
                    receipt_id: receipt_id, inv_id: inv_id, disc_amt: disc_amt, receive_amt: receive_amt
                },
                success: function () {
                },
                error: function () {
                }
            });
        });
    }

    /* EVENTS FOR BUTTON NEW, PRINT */
    $("#btn-new-invoice-payment").on("click", function () {
        clear_frm_create_invoice_payment();
    });
    $("#btn-print-invoice-payment").on("click", function () {

    });

    /* JS DIALOG */
    $.widget("ui.dialog", $.extend({}, $.ui.dialog.prototype, {
        _title: function (title) {
            if (!this.options.title) {
                title.html("&#160;");
            } else {
                title.html(this.options.title);
            }
        }
    }));

    $('#NoReceivable').dialog({
        autoOpen: false,
        width: 600,
        resizable: false,
        modal: true,
        title: "<div class='widget-header'><h5><i class='fa fa-info-circle'></i> Information</h5></div>",
        buttons: [{
            html: "<i class='fa fa-check-circle'></i>&nbsp; OK",
            "class": "btn btn-default",
            click: function () {
                $(this).dialog("close");
            }
        }]
    });

    /* CLEAR FORM CREATE PAYMENT */
    function clear_frm_create_invoice_payment(){
        $('input:text, input:password, input:file, select, textarea', '#frm-create-invoice-payment').val('');
        $("#tbl-receivable-invoice  > tbody").html("");
        $(function(){
            $("#receipt-date").focus();
        });
    }

    /* EVENT FOR BUTTON CHECK & UNCHECK */
    $("#btn-check-invoices").on("click", function () {
        $("#tbl-receivable-invoice .checked").prop("checked", true);
        calculateInvoiceGrandAmt();
    });

    $("#btn-uncheck-invoices").on("click", function () {
        $("#tbl-receivable-invoice .checked").prop("checked", false);
        calculateInvoiceGrandAmt();
    });

    /* VALIDATIONS */
    /* ADDED BY DOLLA 29-MAR-2020 */
    let $frm_create_pay_bill = $('#frm-create-invoice-payment').validate({
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
            receipt_date: {
                required: true
            },
            customers: {
                required: true
            },
            total_amt: {
                required: true
            }
        },

        /* MESSAGE INVALID FOR EACH  FIELDS ABOVE */
        messages: {
            receipt_date: {
                required: 'Required*'
            },
            customers: {
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