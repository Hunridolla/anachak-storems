$(document).ready(function () {

    /* read data into modal */
    $(document).on("click", ".table .btn-primary", function (event) {
        event.preventDefault();
        let href = $(this).attr('href');
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

    /* SAVE NEW MEASURE */
    $(document).on('submit',"#create-unit-measure", function (event) {
        event.preventDefault();
        let unit_measure_id = $('#unit_measure_id').val();
        let unit_measure_name = $('#unit_measure_name').val();
        let remark = $('#remark').val();
        let inactive = false;
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
                clear_modal_save_unit_measure();
            },
            error: function (e) {
                alert('Error: ' + e);
            }
        });
        $('#create-unit-measure-modal').modal('toggle');
    });

    /* CLEAR FORM CREATE UNIT MEASURE */
    function clear_modal_save_unit_measure() {
        $('input:text, input:password, input:file, select, textarea', '#create-unit-measure').val('');
        $('input:checkbox, input:radio', '#create-unit-measure').removeAttr('checked').removeAttr('selected');
        $('#inactive').prop('checked', false);
    }

    /* LOAD UNIT MEASURE INTO TABLE */
    function loadProfilesIntoTable(data) {
        $("#tbl_unit_measure > tbody").html('');
        $.each(data, function (key, nums) {
            let UnitMeasureStatus = getStatus(data[key].inactive);
            let UnitMeasures = "<tr>" +
                "<td>" + data[key].unit_measure_id + "</td>" +
                "<td>" + data[key].unit_measure_name + "</td>" +
                "<td>" + data[key].remark + "</td>" +
                "<td>" + UnitMeasureStatus + "</td>" +
                "<td align=\"center\">" +
                "<a href=\"/unit-measures/view/" + data[key].unit_measure_id + "\" class=\"btn btn-xs btn-primary\">\n" +
                "<i class=\"fa fa-edit\"></i></a>" +
                "</td>"
                + "</tr>";
            $("#tbl_unit_measure").append(UnitMeasures);
        });
    }

    /* VALIDATIONS */
    /* ADDED BY DOLLA 29-MAR-2020 */
    let $frm_create_unit_measure = $('#create-unit-measure').validate({
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
            unit_measure_name: {
                required: true
            }
        },

        /* MESSAGE INVALID FOR EACH  FIELDS ABOVE */
        messages: {
            unit_measure_name: {
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

