$(document).ready(function () {

    $("#item_received").on('click', ".remove-item", function () {
        var row = this;
        bootbox.confirm("Do you really want to delete record?", function (result) {
            if (result) {
                $(row).closest('tr').remove();
                calculateGrandAmt();
            }
        })
    });
    $("#item_received").on('click', ".add-item", function () {
        clear_modal_add_item();
        $("#status").html("[new]");
        $("#status").attr("aria-valuetext", "[new]");
        $("#status").removeClass("label-primary");
        $("#status").addClass("label-success");
        $("#add-item-modal").modal();
    });

    var rowIndex;
    $("#item_received").on('click', ".edit-item", function () {
        rowIndex = $(this).closest('td').parent()[0].sectionRowIndex + 1;
        $("#status").html("[edit]");
        $("#status").attr("aria-valuetext", "[edit]");
        $("status").attr("data-loading-text", "");
        $("#status").removeClass("label-success");
        $("#status").addClass("label-primary");
        var item_code = $(this).closest("tr").find("td:eq(1)").text();
        var decs = $(this).closest("tr").find("td:eq(2)").text();
        var qty = $(this).closest("tr").find("td:eq(3)").text();
        var cost = $(this).closest("tr").find("td:eq(4)").text();
        var disc = $(this).closest("tr").find("td:eq(5)").text();
        var subAmt = $(this).closest("tr").find("td:eq(6)").text();
        var totalAmt = $(this).closest("tr").find("td:eq(7)").text();
        $("#item-code").val(item_code);
        $("#item-name").val(decs);
        $("#item-cost").val(cost);
        $("#item-qty").val(qty);
        $("#item-disc").val(disc);
        $("#item-subAmt").val(subAmt);
        $("#item-totalAmt").val(totalAmt);
        $("#add-item-modal").modal();
    });

    $("#btn-add-item").on('click', function () {
        var item_code = $("#item-code").val();
        var decs = $("#item-name").val();
        var qty = $("#item-qty").val();
        var cost = toNumber($("#item-cost").val());
        var disc = toNumber($("#item-disc").val());
        var subAmt = toNumber($("#item-subAmt").val());
        var totalAmt = toNumber($("#item-totalAmt").val());
        var status = $("#status").attr("aria-valuetext");
        if (status === "[new]") {
            var row = "<tr>" +
                "<td><a class=\"btn btn-xs btn-success add-item\"> <i class=\"fa fa-plus-square-o\"></i></a> <a class=\"btn btn-xs btn-primary edit-item\"> <i class=\"fa fa-edit\"></i></a> <a class=\"btn btn-xs btn-danger remove-item\"> <i class=\"fa fa-trash-o\"></i></a></td>" +
                "<td>" + item_code + "</td>" +
                "<td>" + decs + "</td>" +
                "<td>" + qty + "</td>" +
                "<td>" + cost.toFixed(2) + "</td>" +
                "<td>" + disc.toFixed(2) + "</td>" +
                "<td>" + subAmt.toFixed(2) + "</td>" +
                "<td>" + totalAmt.toFixed(2) + "</td>" +
                "</tr>";
            $('#item_received > tbody:last-child').append(row);
        } else {
            $("#item_received tr:nth-child(" + rowIndex + ") td:nth-child(2)").text(item_code);
            $("#item_received tr:nth-child(" + rowIndex + ") td:nth-child(3)").text(decs);
            $("#item_received tr:nth-child(" + rowIndex + ") td:nth-child(4)").text(qty);
            $("#item_received tr:nth-child(" + rowIndex + ") td:nth-child(5)").text(cost.toFixed(2));
            $("#item_received tr:nth-child(" + rowIndex + ") td:nth-child(6)").text(disc.toFixed(2));
            $("#item_received tr:nth-child(" + rowIndex + ") td:nth-child(7)").text(subAmt.toFixed(2));
            $("#item_received tr:nth-child(" + rowIndex + ") td:nth-child(8)").text(totalAmt.toFixed(2));
            $('#add-item-modal').modal('toggle');
        }
        calculateGrandAmt();
        clear_modal_add_item();
    });
    $('#item-code').keypress(function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            var href = "/items/view/" + $("#item-code").val();
            $.get(href, function (data) {
                $("#item-name").val(data.item_name);
                $("#item-cost").val(data.cost);
            });
            $("#item-cost").focus();
        }
    });

    $('#item-cost, #item-qty, #item-disc').keyup(function (event) {
        calculateSubAmt();
    });

    function calculateSubAmt() {
        var cost = toNumber($("#item-cost").val());
        var qty = toNumber($("#item-qty").val());
        var disc = toNumber($("#item-disc").val());
        var subAmt = (cost * qty);
        var total = subAmt - disc;
        $("#item-subAmt").val(subAmt.toFixed(2));
        $("#item-totalAmt").val(total.toFixed(2));
    }
    function calculateGrandAmt() {
        $("#total_subAmt").val(calculateColumn(6).toFixed(2));
        $("#total_disc").val(calculateColumn(5).toFixed(2));
        $("#total_amt").val((calculateColumn(6) - calculateColumn(5)).toFixed(2));
    }

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

    function calculateColumn(index) {
        var total = 0;
        $('#item_received tr').each(function () {
            var value = parseInt($('td', this).eq(index).text());
            if (!isNaN(value)) {
                total += value;
            }
        });
        return total;
    }

    /* SAVE BILL */
    $(document).on('submit', "#frm-stock-in", function (event) {
        event.preventDefault();
        var bill_id = $("#bill_id").val();
        if (bill_id !== "") {
            alert_message("this bill id is already exist!")
            return;
        }
        var bill_date = toDate($("#bill_date").val());
        var bill_due = toDate($("#bill_due").val());
        var vendor_id = $("#vendors").val();
        var ref_no = $("#ref_no").val();
        var remark = $("#remark").val();
        var address = $("#address").val();
        var sub_amt = toNumber($("#total_subAmt").val());
        var disc_amt = toNumber($("#total_disc").val());
        var total_amt = toNumber($("#total_amt").val());
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
                var bill_id = data.bill_id;
                saveItemDetail(bill_id);
                alert_message("You have committed successfully!");
                $("#bill_id").val(bill_id);
            },
            error: function (e) {
                alert_message("Error:" + e);
            }
        });

    });

    /* LOAD BILL DETAIL INTO TABLE */
    function saveItemDetail(bill_id) {
        $('#item_received > tbody  > tr').each(function () {
            var item_code = $(this).closest("tr").find("td:eq(1)").text();
            var item_desc = $(this).closest("tr").find("td:eq(2)").text();
            var item_qty = toNumber($(this).closest("tr").find("td:eq(3)").text());
            var item_rate = toNumber($(this).closest("tr").find("td:eq(4)").text());
            var item_disc = toNumber($(this).closest("tr").find("td:eq(5)").text());
            var item_sub_amt = toNumber($(this).closest("tr").find("td:eq(6)").text());
            var item_total_amt = toNumber($(this).closest("tr").find("td:eq(7)").text());

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

    /* CLEAR FORM CREATE BILL */
    function clear_frm_stock_in() {
        $('input:text, input:password, input:file, select, textarea', '#frm-stock-in').val('');
        $("#item_received > tbody").html("");
        var row = "<tr>" +
            "<td>" +
            "<a class=\"btn btn-xs btn-success add-item\">" +
            "<i class=\"fa fa-plus-square-o\"></i></a>" +
            " <a class=\"btn btn-xs btn-primary edit-item\">" +
            "<i class=\"fa fa-edit\"></i></a>" +
            " <a class=\"btn btn-xs btn-danger remove-item\">" +
            "<i class=\"fa fa-trash-o\"></i></a>" +
            "</td>" +
            "<td></td>" +
            "<td></td>" +
            "<td></td>" +
            "<td></td>" +
            "<td></td>" +
            "<td></td>" +
            "<td></td>" +
            "</tr>";
        $("#item_received").append(row);
    }

    /* CLEAR MODAL ADD ITEM */
    function clear_modal_add_item() {
        $('input:text, input:password, input:file, select, textarea', '#add-item-modal').val('');
        $('#item-cost, #item-qty, #item-disc').val("");
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