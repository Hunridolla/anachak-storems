
var vendor_data = [
    {vendor_id: "Vendor ID", vendor_name: "Vendor Name", phone: "Phone", remark: "Remark"},
    {vendor_id: "V-001", vendor_name: "Fiplus Khmer", phone: "012 12 12 12", remark: "123"},
    {vendor_id: "V-002", vendor_name: "Samlanh Finance", phone: "012 13 13 13", remark: "123"},
    {vendor_id: "V-003", vendor_name: "Blue Finance", phone: "012 13 13 13", remark: "123"}
];
var customer_data = [
    {customer_id: "Customer ID", customer_name: "Customer Name", gender: "Gender", phone: "Phone", remark: "Remark"},
    {customer_id: "C-001", customer_name: "Soy Hunridolla", gender: "Male", phone: "012 12 12 12", remark: "123"},
    {customer_id: "C-002", customer_name: "Khin Phorn", gender: "Female", phone: "012 13 13 13", remark: "123"},
    {customer_id: "C-003", customer_name: "Sok DaraVisal", gender: "Male", phone: "012 13 13 13", remark: "123"}
];
var item_data = [
    { item_id: "Item ID", item_name: "Item Name", cost: "Cost", sale_price: "Sale Price", min_balance: "Min Balance", max_balance: "Max Balance", inactive: "Inactive", action: "Action" },
    { item_id: "I-0001", item_name: "Macbook Pro 2012 13\"", cost: "1,500.00$", sale_price: "1,600.00$", min_balance: "2", max_balance: "20", inactive: "<span class=\"label label-success\">active</span>", action: "<a href=\"create-item.html\" class=\"btn btn-xs btn-primary\">EDIT</a>" },
    { item_id: "I-0002", item_name: "Surface 4 14\"", cost: "850.00$", sale_price: "1,000.00$", min_balance: "2", max_balance: "20", inactive: "<span class=\"label label-success\">active</span>", action: "<a href=\"create-item.html\" class=\"btn btn-xs btn-primary\">EDIT</a>" },
    { item_id: "I-0003", item_name: "iPhone X MAX", cost: "650.00$", sale_price: "700.00$", min_balance: "2", max_balance: "20", inactive: "<span class=\"label label-success\">active</span>", action: "<a href=\"create-item.html\" class=\"btn btn-xs btn-primary\">EDIT</a>" }
];


$(document).on("click", "#btnVendor", function (event) {
    load_modal_data("#btnVendor", "#tblVendors", vendor_data);
});

$(document).on("click", "#btnCustomer", function (event) {
    load_modal_data("#btnCustomer", "#tblCustomers", customer_data);
});

$(document).on("click", "#btnFind", function (event) {
    load_modal_data("#btnFind", "#tblListing", item_data);
});


function load_modal_data(button_id, table_id, modal_data) {
    $(table_id).html('');
    var table_header = "<thead>" + "<tr>";
    $.each(modal_data[0], function (key, value) {
        table_header += "<th>" + value + "</th>";
    });
    table_header += "</tr></thead>"

    var table_body = "<tbody>";
    $.each(modal_data, function (index, object) {
        if (index === 0) return;
        table_body += "<tr class=\"AA\">";
        $.each(object, function (key, value) {
            table_body += "<td>" + value + "</td>";
        });
        table_body += "</tr>";
    });
    table_body += "</tbody>";
    $(table_id).append(table_header);
    $(table_id).append(table_body);
}

$(document).on("dblclick", "tr.AA", function (event) {
    var cCode = $(this).find('td').eq(0).html();
    var cText = $(this).find('td').eq(1).html();
    var control_target = $(this).closest('table').attr('data-target');
    var control_id = $('#' + control_target + '').attr('id');
    $('.cCode', '#' + control_id + '').val(cCode);
    $('.cText', '#' + control_id + '').html(cText);
    var current_modal = $(this).closest('.modal').attr('id');
    $('#' + current_modal + '').modal('toggle');
});