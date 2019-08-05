$(document).ready(function () {

    /* read data into modal */
    $(document).on("click", ".table .btn-primary", function (event) {
        event.preventDefault();
        var href = $(this).attr('href');
        $.get(href, function (data, status) {
            $('#create-unit-measure-modal #unit_measure_id').val(data.unit_measure_id);
            $('#create-unit-measure-modal #unit_measure_name').val(data.unit_measure_name);
            $('#create-unit-measure-modal #remark').val(data.remark);
            if (data.inactive == true)
                $('#inactive').prop('checked', true);
            else
                $('#inactive').prop('checked', false);
        });
        $('#btn-save-unit-measure').show();
        $('#create-unit-measure-modal').modal();
    });


    /* clear measure modal */
    $('#btn-new-unit-measure').on('click', function (e) {
        clear_modal_save_unit_measure()
        $('#btn-save-unit-measure').show();
    });

    /* save new measure or edit measure info */
    $('#btn-save-unit-measure').on('click', function (event) {
        event.preventDefault();
        var unit_measure_id = $('#unit_measure_id').val();
        var unit_measure_name = $('#unit_measure_name').val();
        var remark = $('#remark').val();
        var inactive = false;
        if ($('#inactive').is(":checked")) {
            inactive = $('#inactive').val();
        }

        $.ajax({
            async: false,
            dataType: "json",
            type: "POST",
            url: "/save-unit-measure",
            data: {
                unit_measure_id: unit_measure_id,
                unit_measure_name: unit_measure_name,
                remark: remark,
                inactive: inactive
            },
            success: function (data) {
                loadProfilesIntoTable(data);
            },
            error: function (e) {
                alert('Error: ' + e);
            }
        });
        $('#create-unit-measure-modal').modal('toggle');
    });

    /* func clear save unit measure modal */
    function clear_modal_save_unit_measure() {
        $('input:text, input:password, input:file, select, textarea', '#create-unit-measure-modal').val('');
        $('input:checkbox, input:radio', '#create-unit-measure-modal').removeAttr('checked').removeAttr('selected');
        $('#inactive').prop('checked', false);
    }

    /* func load data into table */
    function loadProfilesIntoTable(data) {
        $("#tbl_unit_measure > tbody").html('');
        $.each(data, function (key, nums) {
            var UnitMeasureStatus = getStatus(data[key].inactive);
            var UnitMeasures = "<tr>" +
                "<td>" + data[key].unit_measure_id + "</td>" +
                "<td>" + data[key].unit_measure_name + "</td>" +
                "<td>" + data[key].remark + "</td>" +
                "<td>" + UnitMeasureStatus + "</td>" +
                "<td>" +
                " <a href=\"/unit-measures/view/" + data[key].unit_measure_id + "\" class=\"btn btn-xs btn-primary\">\n" +
                "<i class=\"fa fa-edit\"></i></a>" +
                "</td>"
                + "</tr>";
            $("#tbl_unit_measure").append(UnitMeasures);
        });
    }

    /* func add label inactive & active */
    function getStatus(Status) {
        return {
            true: "<span class=\"label label-danger\">inactive</span>",
            false: "<span class=\"label label-success\">active</span>"
        }[Status];
    }
});

