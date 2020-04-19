$(document).ready(function () {
    /* EVENT CLICK ON CATEGORY */
    $('.category').on('click', function (event) {
        event.preventDefault();
        let cat_id = this.id;
        let href = "/pos/" + cat_id;
        $.get(href, function (data) {
            getItemByCategory(data);
        });
    });
    /* GET ITEMS BY CATEGORY */
    function getItemByCategory(data) {
        $(".group-item").html("");
        $.each(data, function (key) {
            let items = " <div class=\"col-md-3 col-sm-6\" style=\"margin-top: 10px;\">" +
                "<div class=\"product-grid\" id=\"" + data[key].item_id + "\"> " +
                "<div class=\"product-image\">" +
                "<img class=\"pic-1 img-fluid m-100\" src=\"img/caramel-frappe-100x80.jpg\" id=\"" + data[key].item_id + "\">" +
                "</div>" +
                "<div class=\"product-content\">" +
                "<h5 class=\"title\"> " + data[key].item_name + "</h5>" +
                "</div>" +
                "</div>" +
                "</div>";
            $(".group-item").append(items);
        });
    }
    /* CLICK ON ITEM */
    $(document).on("click", '.product-grid', function (event) {
        event.preventDefault();
        let item_id = this.id;
        let href = "/items/view/" + item_id;
        $.get(href, function (data) {
            spreadPOSItem(data);
            POSCalculateGrandAmt();
        });
    });

    /* FUNCTION CAL GRAND TOTAL */
    function POSCalculateGrandAmt() {
        let total_subAmt = POSCalculateColumn(5).toFixed(2);
        let total_disc = POSCalculateColumn(4).toFixed(2);
        let total_amt = (POSCalculateColumn(5) - POSCalculateColumn(4)).toFixed(2);
        $("#tbl_grand_total tr:nth-child(1) td:nth-child(2)").text(total_subAmt);
        $("#tbl_grand_total tr:nth-child(2) td:nth-child(2)").text(total_disc);
        $("#tbl_grand_total tr:nth-child(3) td:nth-child(2)").text(total_amt);
    }

    function POSCalculateColumn(index) {
        let total = 0;
        $("#tbl-pos-item tr").each(function () {
            let value = parseFloat($('td', this).eq(index).text());
            if (!isNaN(value)) {
                total += value;
            }
        });
        return total;
    }
    /* EVENT FOR NEW BUTTON */
    $(document).on("click", "#btn-pos-new", function (event) {
        event.preventDefault();
        $("#tbl-pos-item > tbody").html("");
        $("#tbl_grand_total tr:nth-child(1) td:nth-child(2)").text('0.00');
        $("#tbl_grand_total tr:nth-child(2) td:nth-child(2)").text('0.00');
        $("#tbl_grand_total tr:nth-child(3) td:nth-child(2)").text('0.00');
        $("#barcode").val("");
        $(function(){
            $("#barcode").focus();
        });
    });
    /* EVENT FOR BARCODE READER */
    $('#barcode').on('input', function (event) {
        event.preventDefault();
        let barcode = $(this).val();
        if (barcode !== ""){
            let href = "/getItemByBarcode/" + barcode;
            $.get(href, function (data) {
                if (barcode == data.barcode) {
                    spreadPOSItem(data);
                    POSCalculateGrandAmt();
                    $("#barcode").val("");
                }
                else {
                    return false;
                }
            });
        }
    });

    function spreadPOSItem(data) {
        let item = "<tr>" +
            "<td style=\"vertical-align:middle\">" + data.item_id + "</td>" +
            "<td style=\"vertical-align:middle\">" + data.item_name + "</td>" +
            "<td style=\"vertical-align:middle\">1</td>" +
            "<td style=\"vertical-align:middle\">" + data.sale_price.toFixed(2) + "</td>" +
            "<td style=\"vertical-align:middle\">" + "0.00" + "</td>" +
            "<td style=\"vertical-align:middle\">" + data.sale_price.toFixed(2) + "</td>" +
            "<td style=\"vertical-align:middle\">" + data.sale_price.toFixed(2) + "</td>" +
            "<td align=\'center\'> <a class=\"btn btn-sm btn-primary gb-edit-item\"> <i class=\"fa fa-edit\"></i></a> <a class=\"btn btn-sm btn-danger gb-remove-item\"> <i class=\"fa fa-trash-o\"></i></a></td>" +
            "</tr>";
        $('#tbl-pos-item > tbody:last-child').append(item);
    }

    /* SAVE POS */
    $(document).on("click","#btn-pos-print", function (event) {
        event.preventDefault();
        let invoice_id = "";
        let invoice_date = new Date();
        let customer_id = $("#customers").val();
        let seller = "";
        let ship_date = new Date();
        let ship_to = "";
        let remark = "POS";
        let sub_amt = toNumber($("#tbl_grand_total tr:nth-child(1) td:nth-child(2)").text());
        let disc_amt = toNumber($("#tbl_grand_total tr:nth-child(2) td:nth-child(2)").text());
        let total_amt = toNumber($("#tbl_grand_total tr:nth-child(3) td:nth-child(2)").text());
        /* INVOICE */
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
                invoice_id = data.inv_id;
                savePOSInvDetail(invoice_id);
            },
            error: function (e) {
                alert_message("Error:" + e);
            }
        });
        /* RECEIPT */
        let receipt_id = "";
        $.ajax({
            async: false,
            dataType: "json",
            type: "POST",
            url: "/save-receipt",
            data: {
                receipt_id: receipt_id, receipt_date: invoice_date, customer_id: customer_id, ref_no: invoice_id,
                remark: remark,sub_amt: sub_amt, disc_amt: disc_amt, total_amt: total_amt
            },
            success: function (data) {
                let receipt_id  = data.receipt_id;
                savePOSReceiptDetail(receipt_id, invoice_id);
                alert_message("You have committed successfully!");
            },
            error: function (event) {
                alert_message("Error: " + event);
            }
        });

    });

    /* LOAD INVOICE DETAIL INTO DB */
    function savePOSInvDetail(invoice_id) {
        $('#tbl-pos-item > tbody  > tr').each(function () {
            let item_code = $(this).closest("tr").find("td:eq(0)").text();
            let item_desc = $(this).closest("tr").find("td:eq(1)").text();
            let item_qty = toNumber($(this).closest("tr").find("td:eq(2)").text());
            let item_rate = toNumber($(this).closest("tr").find("td:eq(3)").text());
            let item_disc = toNumber($(this).closest("tr").find("td:eq(4)").text());
            let item_sub_amt = toNumber($(this).closest("tr").find("td:eq(5)").text());
            let item_total_amt = toNumber($(this).closest("tr").find("td:eq(6)").text());
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

    /* SAVE RECEIPT DETAIL INTO DB */
    function savePOSReceiptDetail(receipt_id, inv_id){
        let disc_amt = toNumber($("#tbl_grand_total tr:nth-child(2) td:nth-child(2)").text());
        let total_amt = toNumber($("#tbl_grand_total tr:nth-child(3) td:nth-child(2)").text());
        $.ajax({
            async: false,
            dataType: "json",
            type: "POST",
            url: "/save-receipt-detail",
            data: {
                receipt_id: receipt_id, inv_id: inv_id, disc_amt: disc_amt, receive_amt: total_amt
            },
            success: function () {
            },
            error: function () {
            }
        });
    }
});
