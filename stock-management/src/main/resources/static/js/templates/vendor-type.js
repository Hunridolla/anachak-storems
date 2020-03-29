$(document).ready(function () {

    /* GET VENDOR TYPE INTO FORM */
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
        $("#btn-save-vendor-type").prop('disabled', false);
        $("#btn-new-vendor-type").prop('disabled', false);
    });

    /* SAVE VENDOR TYPE */
    $(document).on('submit',"#frm-create-vendor-type", function (event) {
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
                alert_message("You have committed successfully!");
                clear_frm_save_vendor_type();
            },
            error: function (e) {
                console.log(e);
            }
        });
        
    });

    /* DISABLE BUTTON SAVE AND NEW */
    $('#tab-create-vendor-type').on('click', function (event) {
        event.preventDefault();
        $("#btn-save-vendor-type").prop('disabled', false);
        $("#btn-new-vendor-type").prop('disabled', false);
    });

    $('#tab-vendor-type-list').on('click', function (event) {
        event.preventDefault();
        var href = "/vendor-types/get/all";
        $.get(href, function (data) {
            SpreadData(data);
        });
        $("#btn-save-vendor-type").prop('disabled', true);
        $("#btn-new-vendor-type").prop('disabled', true);
    });


    /* EVENT FOR BUTTON NEW VENDOR TYPE */
    /* ADDED BY DOLLA 29-MAR-2020 */
    $('#btn-new-vendor-type').on('click', function (event) {
        clear_frm_save_vendor_type();
        $("#tab-create-vendor-type").click();
        $("#btn-save-vendor-type").prop('disabled', false);
    });

    /* LOAD VENDOR TYPE INTO TABLE */
    function SpreadData(data) {
        $("#tbl_vendor_Types > tbody").html('');
        $.each(data, function (key) {
            var categoryStatus = getStatus(data[key].inactive);
            var vendorTypes = "<tr>" +
                "<td>" + data[key].vendor_type_id + "</td>" +
                "<td>" + data[key].vendor_type_name + "</td>" +
                "<td>" + data[key].remark + "</td>" +
                "<td>" + categoryStatus + "</td>" +
                "<td align=\"center\">" + "<a href=\"/vendor-types/view/" + data[key].vendor_type_id + "\" class=\"btn btn-xs btn-primary\">\n" +
                "<i class=\"fa fa-edit\"></i></a>" +
                "</td>"
                + "</tr>";
            $("#tbl_vendor_Types").append(vendorTypes);
        });
    }

    /* CLEAR FORM CREATE VENDOR TYPE */
    function clear_frm_save_vendor_type() {
        $('input:text, input:password, input:file, select, textarea', '#frm-create-vendor-type').val('');
        $('input:checkbox, input:radio', '#frm-create-vendor-type').removeAttr('checked').removeAttr('selected');
        $('#inactive').prop('checked', false);
        $(function(){
            $("#vendor_type_name").focus();
        });
    }

    /* VALIDATIONS */
    /* ADDED BY DOLLA 29-MAR-2020 */
    var $frm_create_vendor_type = $('#frm-create-vendor-type').validate({
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
            vendor_type_name: {
                required: true
            }
        },

        /* MESSAGE INVALID FOR EACH  FIELDS ABOVE */
        messages: {
            vendor_type_name: {
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