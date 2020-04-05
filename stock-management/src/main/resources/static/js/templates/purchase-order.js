$(document).ready(function () {
    $('#purchase-date').datepicker({
        dateFormat: 'dd-mm-yy',
        prevText: '<i class="fa fa-chevron-left"></i>',
        nextText: '<i class="fa fa-chevron-right"></i>'
    });
    $("#btn-add-purchase-item").on('click', function (e) {
        clear_modal_add_item();
        $("#status").html("[new]");
        $("#status").attr("aria-valuetext", "[new]");
        $("#status").removeClass("label-primary");
        $("#status").addClass("label-success");
        global_variables.gbl_item_table_name = 'tbl-purchase-item';
        global_variables.gbl_rate_type = 'cost';
        $("#add-item-modal").modal();
    });

    /* SAVE PURCHASE ORDER */
    $(document).on('submit', '#frm-create-purchase-order', function (event) {
        event.preventDefault();
        let purchase_id = $('#purchase-id').val();
        if(purchase_id !== "") {
            alert_message("This data is already exist!")
            return;
        }
        let purchase_date = toDate($("#purchase-date").val());
        let vendor_id = $("#vendors").val();
        let ref_no = $("#ref-no").val();
        let remark = $("#remark").val();
        let address = $("#address").val();
        let sub_amt = toNumber($("#total-subAmt").val());
        let disc_amt = toNumber($("#total-disc").val());
        let total_amt = toNumber($("#total-amt").val());
        $.ajax({
            async: false,
            dataType: "json",
            type: "POST",
            url: "/save-purchase-order",
            data: {
                purchase_id: purchase_id, purchase_date: purchase_date, vendor_id: vendor_id, ref_no: ref_no,
                remark: remark, address: address, sub_amt: sub_amt, disc_amt: disc_amt, total_amt: total_amt
            },
            success: function (data) {
                let purchase_id = data.purchase_id;
                /* SAVE DETAIL HERE */
                savePurchaseOrderDetail(purchase_id);
                alert_message("You have committed successfully!");
                $("#purchase-id").val(purchase_id);
            },
            error: function (event) {
                alert_message("Error: " + event);
            }
        });
    });

    /* SAVE PURCHASE ORDER ITEM INTO DB */
    function savePurchaseOrderDetail(purchase_id){
        $('#tbl-purchase-item > tbody > tr').each(function () {
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
                url: "/save-purchase-order-detail",
                data: {
                    purchase_id: purchase_id, item_code: item_code, item_desc: item_desc, item_qty: item_qty,
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
    $("#btn-new-purchase-order").on("click", function () {
        clear_frm_create_purchase_order();
    });
    $("#btn-print-purchase-order").on("click", function () {

    });

    /* CLEAR FORM CREATE PURCHASE ORDER */
    function clear_frm_create_purchase_order(){
        $('input:text, input:password, input:file, select, textarea', '#frm-create-purchase-order').val('');
        $("#tbl-purchase-item > tbody").html("");
    }

    /* VALIDATIONS */
    /* ADDED BY DOLLA 29-MAR-2020 */
    let $frm_create_purchase_order = $('#frm-create-purchase-order').validate({
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
            purchase_date: {
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
            purchase_date: {
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