$(document).ready(function () {
    $('#sale-order-date').datepicker({
        dateFormat: 'dd-mm-yy',
        prevText: '<i class="fa fa-chevron-left"></i>',
        nextText: '<i class="fa fa-chevron-right"></i>'
    });
    $("#btn-add-sale-order-item").on('click', function (event) {
        clear_modal_add_item();
        $("#status").html("[new]");
        $("#status").attr("aria-valuetext", "[new]");
        $("#status").removeClass("label-primary");
        $("#status").addClass("label-success");
        global_variables.gbl_item_table_name = 'tbl-sale-order-item';
        global_variables.gbl_rate_type = 'sale-price';
        $("#add-item-modal").modal();
    });

    /* SAVE SALE ORDER */
    $(document).on('submit', '#frm-create-sale-order', function (event) {
        event.preventDefault();
        let sale_order_id = $('#sale-order-id').val();
        if(sale_order_id !== ""){
            alert_message("This data is already exist!");
            return;
        }
        let sale_order_date = toDate($("#sale-order-date").val());
        let customer_id = $("#customers").val();
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
            url: "/save-sale-order",
            data: {
                sale_order_id: sale_order_id, sale_order_date: sale_order_date, customer_id: customer_id, ref_no: ref_no,
                remark: remark, address: address, sub_amt: sub_amt, disc_amt: disc_amt, total_amt: total_amt
            },
            success: function (data) {
                let sale_order_id = data.sale_order_id;
                /* SAVE DETAIL HERE */
                saveSaleOrderDetail(sale_order_id);
                alert_message("You have committed successfully!");
                $("#sale-order-id").val(sale_order_id);
            },
            error: function (event) {
                alert_message("Error: " + event);
            }
        });
    });

    /* SAVE PURCHASE ORDER ITEM INTO DB */
    function saveSaleOrderDetail(sale_order_id){
        $('#tbl-sale-order-item> tbody > tr').each(function () {
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
                url: "/save-sale-order-detail",
                data: {
                    sale_order_id: sale_order_id, item_code: item_code, item_desc: item_desc, item_qty: item_qty,
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
    $("#btn-new-sale-order").on("click", function () {
        clear_frm_create_sale_order();
    });
    $("#btn-print-sale-order").on("click", function () {

    });

    /* CLEAR FORM CREATE SALE ORDER */
    function clear_frm_create_sale_order(){
        $('input:text, input:password, input:file, select, textarea', '#frm-create-sale-order').val('');
        $("#tbl-sale-order-item > tbody").html("");
    }

    /* VALIDATIONS */
    /* ADDED BY DOLLA 29-MAR-2020 */
    let $frm_create_sale_order = $('#frm-create-sale-order').validate({
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
            sale_order_date: {
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
            sale_order_date: {
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