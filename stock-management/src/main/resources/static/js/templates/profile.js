$(document).ready(function () {
    /* read data into modal */
    $(document).on("click", ".table .btn-primary", function (event) {
        event.preventDefault();
        let href = $(this).attr('href');
        $.get(href, function (data, status) {
            $('#create-profile-modal #profile_id').val(data.profile_id);
            $('#create-profile-modal #profile_name').val(data.profile_name);
            $('#create-profile-modal #remark').val(data.remark);
            if (data.inactive == true)
                $('#inactive').prop('checked', true);
            else
                $('#inactive').prop('checked', false);
        });
        $('#btn-save-profile').show();
        $('#create-profile-modal').modal();
    });

    /* view data into modal */
    $(document).on("click", ".table a.btn-success", function (event) {
        event.preventDefault();
        let href = $(this).attr('href');
        $.ajax({
            type: "GET",
            url: href,
            success: function (data) {
                $('#create-profile-modal #profile_id').val(data.profile_id);
                $('#create-profile-modal #profile_name').val(data.profile_name);
                $('#create-profile-modal #remark').val(data.remark);
                if (data.inactive == true)
                    $('#inactive').prop('checked', true);
                else
                    $('#inactive').prop('checked', false);
            },
            error: function (e) {
                alert('Error: ' + e);
            }
        });
        $('#btn-save-profile').hide();
        $('#create-profile-modal').modal();
    });

    /* clear profile modal */
    $('#btn-new-profile').on('click', function (e) {
        clear_modal_save_profile()
        $('#btn-save-profile').show();
    });

    /* save new profile or edit profile info */
    $('#btn-save-profile').on('click', function (event) {
        event.preventDefault();
        let profile_id = $('#profile_id').val();
        let profile_name = $('#profile_name').val();
        let remark = $('#remark').val();
        let inactive = false;
        if ($('#inactive').is(":checked")) {
            inactive = $('#inactive').val();
        }

        $.ajax({
            async: false,
            dataType: "json",
            type: "POST",
            url: "/save-profile",
            data: {profile_id: profile_id, profile_name: profile_name, remark: remark, inactive: inactive},
            success: function (data) {
                loadProfilesIntoTable(data);
            },
            error: function (e) {
                alert('Error: ' + e);
            }
        });
        $('#create-profile-modal').modal('toggle');
    });

    /* func clear save profile modal */
    function clear_modal_save_profile() {
        $('input:text, input:password, input:file, select, textarea', '#create-profile').val('');
        $('input:checkbox, input:radio', '#create-profile').removeAttr('checked').removeAttr('selected');
        $('#inactive').prop('checked', false);
    }

    /* func load data into table */
    function loadProfilesIntoTable(data) {
        $("#sys_profiles > tbody").html('');
        $.each(data, function (key, nums) {
            let profileStatus = getStatus(data[key].inactive);
            let profiles = "<tr>" +
                "<td>" + data[key].profile_id + "</td>" +
                "<td>" + data[key].profile_name + "</td>" +
                "<td>" + data[key].remark + "</td>" +
                "<td>" + profileStatus + "</td>" +
                "<td>" + "<a href=\"/profiles/view/" + data[key].profile_id + "\" class=\"btn btn-xs btn-success\">\n" +
                "<i class=\"fa fa-eye\"></i></a>" +
                " <a href=\"/profiles/edit/" + data[key].profile_id + "\" class=\"btn btn-xs btn-primary\">\n" +
                "<i class=\"fa fa-edit\"></i></a>"
            "</td>"
            + "</tr>";
            $("#sys_profiles").append(profiles);
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

