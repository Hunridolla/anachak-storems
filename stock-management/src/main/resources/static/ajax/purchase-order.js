$(document).ready(function () {
    $('#purchase-date').datepicker({
        dateFormat: 'dd-mm-yy',
        prevText: '<i class="fa fa-chevron-left"></i>',
        nextText: '<i class="fa fa-chevron-right"></i>'
    });
    $("#btn-add-items").on('click', function (e) {
        clear_modal_add_item();
        $("#status").html("[new]");
        $("#status").attr("aria-valuetext", "[new]");
        $("#status").removeClass("label-primary");
        $("#status").addClass("label-success");
        $("#add-item-modal").modal();
    });
    function clear_modal_add_item() {
        $('input:text, input:password, input:file, select, textarea', '#add-item-modal').val('');
        $('#item-cost, #item-qty, #item-disc').val("");
    }
});