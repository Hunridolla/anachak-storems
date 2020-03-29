$(document).ready(function () {
    $('.category').on('click', function (event) {
        event.preventDefault();
        var cat_id = this.id;
        var href = "/pos/" + cat_id;
        $.get(href, function (data) {
            getItembyCat(data);
        });

    });
})

function getItembyCat(data) {
    $(".group-item").html("");
    $.each(data, function (key) {
        // var itemStatus = getStatus(data[key].inactive);
        var items = " <div class=\"col-md-3 col-sm-6\" style=\"margin-top: 10px;\">" +
            "<div class=\"product-grid\" id=\"" + data[key].item_id + "\"> " +
            "<div class=\"product-image\">" +
            "<img class=\"pic-1 img-fluid m-100\" src=\"https://via.placeholder.com/100x80\" id=\"" + data[key].item_id + "\">" +
            "</div>" +
            "<div class=\"product-content\">" +
            "<h5  class=\"title\"> " + data[key].item_name + "</h5>" +
            "</div>" +
            "</div>" +
            "</div>";
        $(".group-item").append(items);
    });
}
var i = 0;
$(document).on('click', '.product-grid', function (event) {
    var item_id = this.id;
    event.preventDefault();
    var cat_id = this.id;
    var href = "/getItembyID/" + item_id;
    $.get(href, function (data) {

        $('#tab_logic').append('<tr id="Saddr' + (i + 1) + '">' +
            '<td><input id="item_id[]" type="text" name=\'item_id[]\' value=\'' + data.item_id + '\'  class="form-control" readonly/></td>' +
            '<td><input type="text" id="item_name[]"  name=\'item_name[]\' value=\'' + data.item_name + '\'  class="form-control" readonly/></td>' +
            '<td><input type="number" id="qty[]" name=\'qty[]\' value="1" class="form-control qty" step="1" min="1" /></td>' +
            '<td><input type="number" name=\'sale_price[]\' value=\'' + data.sale_price + '\'  class="form-control price" step="0.00" min="1" readonly/></td>' +
            '<td><input type="number" id="sub_amt[]" name=\'sub_amt[]\' value=\'' + data.sale_price + '\'  class="form-control total" readonly/></td>' +
            '<td><input type="button" id="addr' + (i + 1) + '"  value="Remove"  class="form-control btn btn-danger remove_row"/></td>' +
            '</tr>');
        calc();

    });
    i++;
});

$(document).on('click', '.remove_row', function () {
    var id = this.id
    $("#S" + (id)).html('');
    calc();
});

$(document).ready(function () {
    $('#tab_logic tbody').on('keyup change', function () {
        calc();
    });
    $('#discount').on('keyup change', function () {
        calc_total();
    });
    $('#cash_receive').on('keyup change', function () {
        var cash_receive = $("#cash_receive").val();
        var cash_total = $("#cash_total").val();
        $('#cash_back').val((cash_receive - cash_total).toFixed(2));

    });


})


function calc() {
    $('#tab_logic tbody tr').each(function (i, element) {
        var html = $(this).html();
        if (html != '') {
            var qty = $(this).find('.qty').val();
            var price = $(this).find('.price').val();
            $(this).find('.total').val(qty * price);

            calc_total();
        }
    });
}



function calc_total() {
    total = 0;
    $('.total').each(function () {
        total += parseInt($(this).val());
    });
    $('#sub_total').val(total.toFixed(2));
    dis_sum = total / 100 * $('#discount').val();
    $('#dis_amount').val(dis_sum.toFixed(2));
    $('#total_amount').val((total - dis_sum).toFixed(2));
    $('#cash_total').val((total - dis_sum).toFixed(2));
}


$('#btnSaveINV').on('click', function (event) {
    event.preventDefault();
    var seller = $('#user').val();
    var sub_amt = $('#sub_total').val();
    var disc_amt = $('#dis_amount').val();
    var total_amt = $('#total_amount').val();
    var customer = $('.customer').val();

    $.ajax({
        async: false,
        dataType: "json",
        type: "POST",
        url: "/save-invoice",
        data: { seller: seller, sub_amt: sub_amt, disc_amt: disc_amt, total_amt: total_amt, customer: customer },
        success: function () {
            alert_message();
        },
        error: function (e) {
            alert('Error: ' + e);
        }
    });
});

function alert_message() {
    $.smallBox({
        title: "Anachak Technology",
        content: "You have committed successfully!",
        color: "#739E73",
        iconSmall: "fa fa-bell-o",
        timeout: 5000
    });
    $('#moneyModal').modal('toggle');
    $('#tab_logic1').html('');
    $('#sub_total').val(0);
    $('#discount').val(0);
    $('#dis_amount').val(0);
    $('#total_amount').val(0);
}

$('#barcode').on('input', function (event) {
    var barcode = $(this).val();
    event.preventDefault();
    var href = "/getItemByBarcode/" + barcode;
    $.get(href, function (data) {
        if (barcode == data.barcode) {
            $('#tab_logic').append('<tr id="Saddr' + (i + 1) + '">' +
                '<td><input id="item_id[]" type="text" name=\'item_id[]\' value=\'' + data.item_id + '\'  class="form-control" readonly/></td>' +
                '<td><input type="text" id="item_name[]"  name=\'item_name[]\' value=\'' + data.item_name + '\'  class="form-control" readonly/></td>' +
                '<td><input type="number" id="qty[]" name=\'qty[]\' value="1" class="form-control qty" step="1" min="1" /></td>' +
                '<td><input type="number" name=\'sale_price[]\' value=\'' + data.sale_price + '\'  class="form-control price" step="0.00" min="1" readonly/></td>' +
                '<td><input type="number" id="sub_amt[]" name=\'sub_amt[]\' value=\'' + data.sale_price + '\'  class="form-control total" readonly/></td>' +
                '<td><input type="button" id="addr' + (i + 1) + '"  value="Remove"  class="form-control btn btn-danger remove_row"/></td>' +
                '</tr>');
            calc();
            $("#barcode").val("");
        }
        else {
            return false;
        }


    });
    i++;
});

