/* GLOBAL FUNCTIONS */
/* ALERT MESSAGE */
function alert_message(msg) {
    $.smallBox({
        title: "Anachak Store",
        content: msg,
        color: "#739E73",
        iconSmall: "fa fa-bell-o",
        timeout: 5000
    });
}
/* GET LABEL FOR INACTIVE AND ACTIVE */
function getStatus(Status) {
    return {
        true: "<span class=\"label label-danger\">inactive</span>",
        false: "<span class=\"label label-success\">active</span>"
    }[Status];
}
/* CONVERT TO NUMBER */
function toNumber(string){
    const result = isNaN(parseFloat(string)) ? 0 : parseFloat(string);
    return result;
}

/* CONVERT TO DATE */
function toDate(dateStr) {
    var parts = dateStr.split("-")
    return new Date(parts[2], parts[1] - 1, parts[0])
}

/* EVENT IN ADD ITEM MODEL */
/* EVENT ITEM CODE KEY ENTER */
$('#md-item-code').keypress(function (event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13'){
        var href = "/items/view/" + $("#md-item-code").val();
        $.get(href, function (data) {
            $("#md-item-name").val(data.item_name);
            $("#md-item-cost").val(data.cost.toFixed(2));
        });
        $("#md-item-qty").val("");
        $("#md-item-disc").val("");
        $("#md-item-cost").focus();
    }
});

/* AUTO CALCULATE SUB AMOUNT */
$('#md-item-cost, #md-item-qty, #md-item-disc').keyup(function (event) {
    calculateSubAmt();
});

/* FUNCTION CAL SUB AMOUNT */
function calculateSubAmt() {
    var cost = toNumber($("#md-item-cost").val());
    var qty = toNumber($("#md-item-qty").val());
    var disc = toNumber($("#md-item-disc").val());
    var subAmt = (cost * qty);
    var total = subAmt - disc;
    $("#md-item-subAmt").val(subAmt.toFixed(2));
    $("#md-item-totalAmt").val(total.toFixed(2));
}

/* FUNCTION CAL GRAND TOTAL */
function calculateGrandAmt() {
    $("#total-subAmt").val(calculateColumn(6).toFixed(2));
    $("#total-disc").val(calculateColumn(5).toFixed(2));
    $("#total-amt").val((calculateColumn(6) - calculateColumn(5)).toFixed(2));
}

function calculateColumn(index) {
    var total = 0;
    $('#'+ global_variables.gbl_item_table_name +' tr').each(function () {
        var value = parseFloat($('td', this).eq(index).text());
        if (!isNaN(value)) {
            total += value;
        }
    });
    return total;
}

/* CLEAR MODAL ADD ITEM */
function clear_modal_add_item() {
    $('input:text, input:password, input:file, select, textarea', '#add-item-modal').val('');
    $('#md-item-cost, #md-item-qty, #md-item-disc').val("");
    $(function () {
        $("#md-item-code").focus();
    });
}

/* ADD ITEM FROM MODAL INTO TABLE */
$(document).on('submit', "#frm-add-item-modal", function (event) {
    event.preventDefault();
    var item_code = $("#md-item-code").val();
    var decs = $("#md-item-name").val();
    var qty = $("#md-item-qty").val();
    var cost = toNumber($("#md-item-cost").val());
    var disc = toNumber($("#md-item-disc").val());
    var subAmt = toNumber($("#md-item-subAmt").val());
    var totalAmt = toNumber($("#md-item-totalAmt").val());
    var status = $("#status").attr("aria-valuetext");
    if (status === "[new]") {
        var row = "<tr>" +
            "<td align=\'center\'> <a class=\"btn btn-xs btn-primary gb-edit-item\"> <i class=\"fa fa-edit\"></i></a> <a class=\"btn btn-xs btn-danger gb-remove-item\"> <i class=\"fa fa-trash-o\"></i></a></td>" +
            "<td>" + item_code + "</td>" +
            "<td>" + decs + "</td>" +
            "<td>" + qty + "</td>" +
            "<td>" + cost.toFixed(2) + "</td>" +
            "<td>" + disc.toFixed(2) + "</td>" +
            "<td>" + subAmt.toFixed(2) + "</td>" +
            "<td>" + totalAmt.toFixed(2) + "</td>" +
            "</tr>";
        $('#' + global_variables.gbl_item_table_name + '> tbody:last-child').append(row);
    } else {
        $("#" + global_variables.gbl_item_table_name + " tr:nth-child(" + global_variables.gbl_rowindex + ") td:nth-child(2)").text(item_code);
        $("#" + global_variables.gbl_item_table_name + " tr:nth-child(" + global_variables.gbl_rowindex + ") td:nth-child(3)").text(decs);
        $("#" + global_variables.gbl_item_table_name + " tr:nth-child(" + global_variables.gbl_rowindex + ") td:nth-child(4)").text(qty);
        $("#" + global_variables.gbl_item_table_name + " tr:nth-child(" + global_variables.gbl_rowindex + ") td:nth-child(5)").text(cost.toFixed(2));
        $("#" + global_variables.gbl_item_table_name + " tr:nth-child(" + global_variables.gbl_rowindex + ") td:nth-child(6)").text(disc.toFixed(2));
        $("#" + global_variables.gbl_item_table_name + " tr:nth-child(" + global_variables.gbl_rowindex + ") td:nth-child(7)").text(subAmt.toFixed(2));
        $("#" + global_variables.gbl_item_table_name + " tr:nth-child(" + + global_variables.gbl_rowindex + ") td:nth-child(8)").text(totalAmt.toFixed(2));
        $('#add-item-modal').modal('toggle');
    }
    calculateGrandAmt();
    clear_modal_add_item();
});

/* LOAD ITEM IN TABLE INTO MODAL BY ROW INDEX */
$(document).on('click', ".gb-edit-item", function (event) {
    event.preventDefault();
    global_variables.gbl_rowindex  = $(this).closest('td').parent()[0].sectionRowIndex + 1;
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
    $("#md-item-code").val(item_code);
    $("#md-item-name").val(decs);
    $("#md-item-cost").val(cost);
    $("#md-item-qty").val(qty);
    $("#md-item-disc").val(disc);
    $("#md-item-subAmt").val(subAmt);
    $("#md-item-totalAmt").val(totalAmt);
    $("#add-item-modal").modal();
    $(function () {
        $("#md-item-cost").focus();
    });
});

/* EVENT FOR REMOVE ITEM FROM TABLE */
$(document).on('click', '.gb-remove-item', function () {
    global_variables.gbl_rowindex  = $(this).closest('td').parent()[0].sectionRowIndex + 1;
    $("table tr:eq(" + global_variables.gbl_rowindex + ")").remove();
    calculateGrandAmt();
});


/* VALIDATIONS */
/* ADDED BY DOLLA 29-MAR-2020 */
var $frm_add_item_modal = $('#frm-add-item-modal').validate({
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
        md_item_code: {
            required: true
        },
        md_item_name: {
            required: true
        },
        md_item_qty: {
            required: true
        },
        md_item_subAmt: {
            required: true
        },
        md_item_totalAmt: {
            required: true
        }
    },

    /* MESSAGE INVALID FOR EACH  FIELDS ABOVE */
    messages: {
        md_item_code: {
            required: ''
        },
        md_item_name: {
            required: ''
        },
        md_item_qty: {
            required: ''
        },
        md_item_subAmt: {
            required: ''
        },
        md_item_totalAmt: {
            required: ''
        }
    },

    /* DEFAULT OF SMARTADMIN */
    /* DON'T CHANGE */
    errorPlacement: function (error, element) {
        error.insertAfter(element.parent());
    }
});