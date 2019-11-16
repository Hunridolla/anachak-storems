$(document).ready(function () {
    /* view data into form */
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
    });

    /* save new category or edit category info */
    $('#btn-save-category').on('click', function (event) {
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
                alert_message();
                clear_frm_save_category();
            },
            error: function (e) {
                console.log(e);
            }
        });
    });

    /* button new category */
    $('#btn-new-category').on('click', function (event) {
        clear_frm_save_category();
        $("#tab-create-category").click();
    });

    /* func clear save profile modal */
    function clear_frm_save_category() {
        $('input:text, input:password, input:file, select, textarea', '#frm-create-category').val('');
        $('input:checkbox, input:radio', '#frm-create-category').removeAttr('checked').removeAttr('selected');
        $('#inactive').prop('checked', false);
        $('#btn-save-category').prop("disabled", false);
    }

    /* tab listing */
    $('#tab-category-list').on('click', function (event) {
        event.preventDefault();
        var href = "/categories/get/all";
        $.get(href, function (data) {
            SpreadData(data);
        });
    });

    /* func load data into table */
    function SpreadData(data) {
        $("#tbl_categories > tbody").html('');
        $.each(data, function (key) {
            var categoryStatus = getStatus(data[key].inactive);
            var categories = "<tr>" +
                "<td>" + data[key].category_id + "</td>" +
                "<td>" + data[key].category_name + "</td>" +
                "<td>" + data[key].remark + "</td>" +
                "<td>" + categoryStatus + "</td>" +
                "<td>" + "<a href=\"/categories/view/" + data[key].category_id + "\" class=\"btn btn-xs btn-primary\">\n" +
                "<i class=\"fa fa-edit\"></i></a>" +
                "</td>"
                + "</tr>";
            $("#tbl_categories").append(categories);
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
            timeout: 5000
        });
    }

});