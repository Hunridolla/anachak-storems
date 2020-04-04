$(document).ready(function () {

    /* GET ITEM INTO FORM */
    $(document).on("click", "#tbl_items .btn-primary", function (event) {
        event.preventDefault();
        var href = $(this).attr('href');
        $.get(href, function (data) {
            $('#frm-create-item #stock_type').val(data.stock_type);
            $('#frm-create-item #item_id').val(data.item_id);
            $('#frm-create-item #item_name').val(data.item_name);
            $('#frm-create-item #category_id').val(data.category_id);
            $('#frm-create-item #um').val(data.um);
            $('#frm-create-item #cost_method').val(data.cost_method);
            $('#frm-create-item #cost').val(data.cost);
            $('#frm-create-item #sale_price').val(data.sale_price);
            $('#frm-create-item #prefered_supplier').val(data.prefered_supplier);
            $('#frm-create-item #min_balance').val(data.min_balance);
            $('#frm-create-item #max_balance').val(data.max_balance);
            $('#frm-create-item #barcode').val(data.barcode);
            $('#frm-create-item #remark').val(data.remark);
            if (data.inactive == true)
                $('#frm-create-item #inactive').prop('checked', true);
            else
                $('#frm-create-item #inactive').prop('checked', false);
        });
        $("#tab-create-item").click();
        $("#btn-save-item").prop('disabled', false);
        $("#btn-new-item").prop('disabled', false);
    });

    /* SAVE ITEM */
    $(document).on('submit', "#frm-create-item", function (event) {
        event.preventDefault();
        var item_id = $('#item_id').val();
        var item_name = $('#item_name').val();
        var stock_type = $('#stock_type').val();
        var category_id = $('#category_id').val();
        var um = $('#um').val();
        var cost_method = $('#cost_method').val();
        var cost = $('#cost').val();
        var sale_price = $('#sale_price').val();
        var prefered_supplier = $('#prefered_supplier').val();
        var min_balance = $('#min_balance').val();
        var max_balance = $('#max_balance').val();
        var barcode = $('#barcode').val();
        var remark = $('#remark').val();
        var inactive = false;
        if ($('#inactive').is(":checked")) {
            inactive = $('#inactive').val();
        }

        $.ajax({
            async: false,
            dataType: "json",
            type: "POST",
            url: "/save-item",
            data: {item_id: item_id, item_name: item_name,stock_type: stock_type,category_id: category_id,um: um,cost_method: cost_method,
                cost: cost, sale_price: sale_price,prefered_supplier: prefered_supplier,min_balance: min_balance,max_balance: max_balance,
                barcode: barcode,remark: remark, inactive: inactive},
            success: function () {
                alert_message("You have committed successfully!");
                clear_frm_save_item();
            },
            error: function (e) {
                alert('Error: ' + e);
            }
        });
    });

    /* EVENT FOR BUTTON NEW CUSTOMER */
    /* ADDED BY DOLLA 29-MAR-2020 */
    $('#btn-new-item').on('click', function () {
        clear_frm_save_item();
        $("#btn-save-item").prop('disabled', false);
    });

    /* DISABLE BUTTON SAVE AND NEW */
    $('#tab-create-item').on('click', function (event) {
        event.preventDefault();
        $("#btn-save-item").prop('disabled', false);
        $("#btn-new-item").prop('disabled', false);
    });

    $('#tab-item-list').on('click', function (event) {
        event.preventDefault();
        var href = "/items/get/all";
        $.get(href, function (data) {
            SpreadData(data);
        });
        $("#btn-save-item").prop('disabled', true);
        $("#btn-new-item").prop('disabled', true);
    });

    /* LOAD ITEMS INTO TABLE */
    function SpreadData(data) {
        $("#tbl_items > tbody").html("");
        $.each(data, function (key) {
           var itemStatus = getStatus(data[key].inactive);
           var items = "<tr>" +
               "<td>"+ data[key].item_id + "</td>" +
               "<td>"+ data[key].item_name + "</td>" +
               "<td>"+ data[key].category_id + "</td>" +
               "<td>"+ data[key].um + "</td>" +
               "<td>"+ data[key].cost_method + "</td>" +
               "<td>"+ data[key].cost.toFixed(2) + "</td>" +
               "<td>"+ data[key].sale_price.toFixed(2) + "</td>" +
               "<td>"+ data[key].barcode + "</td>" +
               "<td>"+ itemStatus + "</td>" +
               "<td align=\"center\">" + "<a href=\"/items/view/" + data[key].item_id + "\" class=\"btn btn-xs btn-primary\">\n" +
               "<i class=\"fa fa-edit\"></i></a>" +
               "</td>"
               + "</tr>";
           $("#tbl_items").append(items);
        });
    }

    /* CLEAR FORM CREATE ITEM */
    function clear_frm_save_item() {
        $('input:text, input:password, input:file, select, textarea', '#create-item').val('');
        $('input:checkbox, input:radio', '#create-item').removeAttr('checked').removeAttr('selected');
        $('#inactive').prop('checked', false);
        $(function(){
            $("#item_id").focus();
        });
    }

    /* VALIDATIONS */
    /* ADDED BY DOLLA 29-MAR-2020 */
    var $frm_create_item = $('#frm-create-item').validate({
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
            stock_type: {
                required: true
            },
            item_name: {
                required: true
            },
            category_id: {
                required: true
            },
            um: {
                required: true
            },
            cost_method: {
                required: true
            },
            cost: {
                required: true
            },
            sale_price: {
                required: true
            }
        },

        /* MESSAGE INVALID FOR EACH  FIELDS ABOVE */
        messages: {
            stock_type: {
                required: 'Required*'
            },
            item_name:{
                required: 'Required*'
            },
            category_id: {
                required: 'Required*'
            },
            um: {
                required: 'Required*'
            },
            cost_method: {
                required: 'Required*'
            },
            cost: {
                required: 'Required*'
            },
            sale_price: {
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

