$(document).ready(function () {

    /* read data into form */
    $(document).on("click", ".table .btn-primary", function (event) {
        event.preventDefault();
        var href = $(this).attr('href');
        $.get(href, function (data) {
            $('#frm-create-vendor-type #vendor_type_id').val(data.vendor_type_id);
            $('#frm-create-vendor-type #vendor_type_name').val(data.vendor_type_name);
            $('#frm-create-vendor-type #remark').val(data.remark);
            if (data.inactive == true)
                $('#frm-create-vendor-type #inactive').prop('checked', true);
            else
                $('#frm-create-vendor-type #inactive').prop('checked', false);
        });
        $("#tab-create-vendor-type").click();
    });

    /* save new vendor-type type or edit vendor-type type info */
    $('#btn-save-vendor-type').on('click', function (event) {
        event.preventDefault();
        var vendor_type_id = $('#vendor_type_id').val();
        var vendor_type_name = $('#vendor_type_name').val();
        var remark = $('#remark').val();
        var inactive = false;
        if ($('#inactive').is(":checked")) {
            inactive = true;
        }

        $.ajax({
            async: false,
            dataType: "json",
            type: "POST",
            url: "/save-vendor-type",
            data: {
                vendor_type_id: vendor_type_id,
                vendor_type_name: vendor_type_name,
                remark: remark,
                inactive: inactive
            },
            success: function (data) {
                alert_message();
                clear_frm_save_vendor_type();
            },
            error: function (e) {
                console.log(e);
            }
        });
        
    });

    /* func clear save profile modal */
    function clear_frm_save_vendor_type() {
        $('input:text, input:password, input:file, select, textarea', '#frm-create-vendor-type').val('');
        $('input:checkbox, input:radio', '#frm-create-vendor-type').removeAttr('checked').removeAttr('selected');
        $('#inactive').prop('checked', false);
    }

    /* tab listing */
    $('#tab-vendor-type-list').on('click', function (event) {
        event.preventDefault();
        var href = "/vendor-types/get/all";
        $.get(href, function (data) {
            SpreadData(data);
        });
    });
    /* btn new vendor type */
    $('#btn-new-vendor-type').on('click', function (event) {
        clear_frm_save_vendor_type();
        $("#tab-create-vendor-type").click();
    });

    /* func load data into table */
    function SpreadData(data) {
        $("#tbl_vendor_Types > tbody").html('');
        $.each(data, function (key) {
            var categoryStatus = getStatus(data[key].inactive);
            var vendorTypes = "<tr>" +
                "<td>" + data[key].vendor_type_id + "</td>" +
                "<td>" + data[key].vendor_type_name + "</td>" +
                "<td>" + data[key].remark + "</td>" +
                "<td>" + categoryStatus + "</td>" +
                "<td>" + "<a href=\"/vendor-types/view/" + data[key].vendor_type_id + "\" class=\"btn btn-xs btn-primary\">\n" +
                "<i class=\"fa fa-edit\"></i></a>" +
                "</td>"
                + "</tr>";
            $("#tbl_vendor_Types").append(vendorTypes);
        });
    }

    /* func add label inactive & active */
    function getStatus(Status) {
        return {
            true: "<span class=\"label label-danger\">inactive</span>",
            false: "<span class=\"label label-success\">active</span>"
        }[Status];
    }

    function alert_message() {
        $.smallBox({
            title: "Fiplus Khmer",
            content: "You have committed successfully!",
            color: "#739E73",
            iconSmall: "fa fa-bell-o",
            timeout: 3000
        });
    }
});