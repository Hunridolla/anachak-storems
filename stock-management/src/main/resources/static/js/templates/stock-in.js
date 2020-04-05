$(document).ready(function () {

    jQuery.extend(jQuery.expr[':'], {
        focusable: function (el, index, selector) {
            return $(el).is('a, button, :input, [tabindex]');
        }
    });

    $(document).on('keypress', 'input,select', function (e) {
        if (e.which == 13) {
            e.preventDefault();
            var $canfocus = $(':focusable');
            var index = $canfocus.index(document.activeElement) + 1;
            if (index >= $canfocus.length) index = 0;
            $canfocus.eq(index).focus();
        }
    });

    /* SAVE BILL */
    $(document).on('submit', "#frm-stock-in", function (event) {
        event.preventDefault();
        let bill_id = $("#bill_id").val();
        if (bill_id !== "") {
            alert_message("This data is already exist!")
            return;
        }
        let bill_date = toDate($("#bill_date").val());
        let bill_due = toDate($("#bill_due").val());
        let vendor_id = $("#vendors").val();
        let ref_no = $("#ref_no").val();
        let remark = $("#remark").val();
        let address = $("#address").val();
        let sub_amt = toNumber($("#total-subAmt").val());
        let disc_amt = toNumber($("#total-disc").val());
        let total_amt = toNumber($("#total-amt").val());
        $.ajax({
            async: false,
            dataType: "json",
            type: "POST",
            url: "/save-bill",
            data: {
                bill_id: bill_id, bill_date: bill_date, bill_due: bill_due, vendor_id: vendor_id,
                ref_no: ref_no, remark: remark, address: address, sub_amt: sub_amt, disc_amt: disc_amt, total_amt: total_amt
            },
            success: function (data) {
                let bill_id = data.bill_id;
                saveItemDetail(bill_id);
                alert_message("You have committed successfully!");
                $("#bill_id").val(bill_id);
            },
            error: function (e) {
                alert_message("Error:" + e);
            }
        });
    });

    /* LOAD BILL DETAIL INTO DB */
    function saveItemDetail(bill_id) {
        $('#tbl-item-stock-in > tbody  > tr').each(function () {
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
                url: "/save-bill-detail",
                data: {
                    bill_id: bill_id, item_code: item_code, item_desc: item_desc, item_qty: item_qty,
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
    $("#btn-new-bill").on("click", function () {
        clear_frm_stock_in();
    });
    $("#btn-print-bill").on("click", function () {

    });

    /* EVENT ADD STOCK IN ITEM */
    $("#btn-add-stock-in-item").on('click', function (event) {
        clear_modal_add_item();
        $("#status").html("[new]");
        $("#status").attr("aria-valuetext", "[new]");
        $("#status").removeClass("label-primary");
        $("#status").addClass("label-success");
        global_variables.gbl_item_table_name = 'tbl-item-stock-in';
        global_variables.gbl_rate_type = 'cost';
        $("#add-item-modal").modal();
    });

    /* CLEAR FORM CREATE BILL */
    function clear_frm_stock_in() {
        $('input:text, input:password, input:file, select, textarea', '#frm-stock-in').val('');
        $("#tbl-item-stock-in > tbody").html("");
    }


    /* SET EVENT ON DATE CONTROL */
    $('#bill_date').datepicker({
        dateFormat: 'dd-mm-yy',
        prevText: '<i class="fa fa-chevron-left"></i>',
        nextText: '<i class="fa fa-chevron-right"></i>'
    });

    $('#bill_due').datepicker({
        dateFormat: 'dd-mm-yy',
        prevText: '<i class="fa fa-chevron-left"></i>',
        nextText: '<i class="fa fa-chevron-right"></i>'
    });

    /* VALIDATIONS */
    /* ADDED BY DOLLA 29-MAR-2020 */
    var $frm_stock_in = $('#frm-stock-in').validate({
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
            date: {
                required: true
            },
            vendors: {
                required: true
            },
            total_amt: {
                required: true
            }
        },

        /* MESSAGE INVALID FOR EACH  FIELDS ABOVE */
        messages: {
            date: {
                required: 'Required*'
            },
            vendors: {
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