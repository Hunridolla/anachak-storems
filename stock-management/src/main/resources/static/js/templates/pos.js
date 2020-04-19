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
    $(document).on("click", '.product-grid', function (event) {
        event.preventDefault();
        let item_id = this.id;
        let href = "/items/view/" + item_id;
        $.get(href, function (data) {
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
            $('#tbl_pos_item > tbody:last-child').append(item);
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
        $("#tbl_pos_item tr").each(function () {
            let value = parseFloat($('td', this).eq(index).text());
            if (!isNaN(value)) {
                total += value;
            }
        });
        return total;
    }

// $('#barcode').on('input', function (event) {
//     let barcode = $(this).val();
//     event.preventDefault();
//     let href = "/getItemByBarcode/" + barcode;
//     $.get(href, function (data) {
//         if (barcode == data.barcode) {
//             $('#tab_logic').append('<tr id="Saddr' + (i + 1) + '">' +
//                 '<td><input id="item_id[]" type="text" name=\'item_id[]\' value=\'' + data.item_id + '\'  class="form-control" readonly/></td>' +
//                 '<td><input type="text" id="item_name[]"  name=\'item_name[]\' value=\'' + data.item_name + '\'  class="form-control" readonly/></td>' +
//                 '<td><input type="number" id="qty[]" name=\'qty[]\' value="1" class="form-control qty" step="1" min="1" /></td>' +
//                 '<td><input type="number" name=\'sale_price[]\' value=\'' + data.sale_price + '\'  class="form-control price" step="0.00" min="1" readonly/></td>' +
//                 '<td><input type="number" id="sub_amt[]" name=\'sub_amt[]\' value=\'' + data.sale_price + '\'  class="form-control total" readonly/></td>' +
//                 '<td><input type="button" id="addr' + (i + 1) + '"  value="Remove"  class="form-control btn btn-danger remove_row"/></td>' +
//                 '</tr>');
//             calc();
//             $("#barcode").val("");
//         }
//         else {
//             return false;
//         }
//
//
//     });
//     i++;
// });
});
