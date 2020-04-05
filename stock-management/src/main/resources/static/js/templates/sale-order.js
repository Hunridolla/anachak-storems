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
        $("#add-item-modal").modal();
    });
});