$(document).ready(function () {

    /* GET CATEGORY INTO FORM */
    $(document).on("click", ".table .btn-primary", function (event) {
        event.preventDefault();
        var href = $(this).attr('href');
        $.get(href, function (data) {
            $('#frm-create-category #category_id').val(data.category_id);
            $('#frm-create-category #category_name').val(data.category_name);
            $('#frm-create-category #remark').val(data.remark);
            if (data.inactive == true)
                $('#frm-create-category #inactive').prop('checked', true);
            else
                $('#frm-create-category #inactive').prop('checked', false);
        });
        $("#tab-create-category").click();
        $("#btn-save-category").prop('disabled', false);
        $("#btn-new-category").prop('disabled', false);
    });

    /* SAVE CATEGORY */
    $(document).on('submit',"#frm-create-category", function (event) {
        event.preventDefault();
        var category_id = $('#category_id').val();
        var category_name = $('#category_name').val();
        var remark = $('#remark').val();
        var inactive = false;
        if ($('#inactive').is(":checked")) {
            inactive = true;
        }

        $.ajax({
            async: false,
            dataType: "json",
            type: "POST",
            url: "/save-category",
            data: {
                category_id: category_id,
                category_name: category_name,
                remark: remark,
                inactive: inactive
            },
            success: function (data) {
                alert_message("You have committed successfully!");
                clear_frm_save_category();
            },
            error: function (e) {
                console.log(e);
            }
        });
    });

    /* DISABLE BUTTON SAVE AND NEW */
    $('#tab-create-category').on('click', function (event) {
        event.preventDefault();
        $("#btn-save-category").prop('disabled', false);
        $("#btn-new-category").prop('disabled', false);
    });

    $('#tab-category-list').on('click', function (event) {
        event.preventDefault();
        var href = "/categories/get/all";
        $.get(href, function (data) {
            SpreadData(data);
        });
        $('#btn-save-category').prop("disabled", true);
        $('#btn-new-category').prop("disabled", true);
    });

    /* EVENT FOR BUTTON NEW VENDOR TYPE */
    /* ADDED BY DOLLA 29-MAR-2020 */
    $('#btn-new-category').on('click', function (event) {
        clear_frm_save_category();
        $("#tab-create-category").click();
        $('#btn-save-category').prop("disabled", false);
    });

    /* LOAD CATEGORY INTO TABLE*/
    function SpreadData(data) {
        $("#tbl_categories > tbody").html('');
        $.each(data, function (key) {
            var categoryStatus = getStatus(data[key].inactive);
            var categories = "<tr>" +
                "<td>" + data[key].category_id + "</td>" +
                "<td>" + data[key].category_name + "</td>" +
                "<td>" + data[key].remark + "</td>" +
                "<td>" + categoryStatus + "</td>" +
                "<td align=\"center\">" + "<a href=\"/categories/view/" + data[key].category_id + "\" class=\"btn btn-xs btn-primary\">\n" +
                "<i class=\"fa fa-edit\"></i></a>" +
                "</td>"
                + "</tr>";
            $("#tbl_categories").append(categories);
        });
    }

    /* CLEAR FORM CREATE CATEGORY */
    function clear_frm_save_category() {
        $('input:text, input:password, input:file, select, textarea', '#frm-create-category').val('');
        $('input:checkbox, input:radio', '#frm-create-category').removeAttr('checked').removeAttr('selected');
        $('#inactive').prop('checked', false);
        $(function(){
            $("#category_name").focus();
        });
        $('#btn-save-category').prop("disabled", false);
    }

    /* VALIDATIONS */
    /* ADDED BY DOLLA 29-MAR-2020 */
    var $frm_create_category= $('#frm-create-category').validate({
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
            category_name: {
                required: true
            }
        },

        /* MESSAGE INVALID FOR EACH  FIELDS ABOVE */
        messages: {
            category_name: {
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