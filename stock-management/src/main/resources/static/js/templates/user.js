$(document).ready(function () {

    /* read user info into modal */
    $(document).on("click", ".table .btn-primary", function (event) {
        event.preventDefault();
        var href = $(this).attr('href');
        $.get(href, function (data, status) {
            $('#create-user-modal #user_id').val(data.user_id);
            $('#create-user-modal #user_name').val(data.user_name);
            $('#create-user-modal #login_name').val(data.login_name);
            $('#profile_id').val(data.profile_id);
            $('#create-user-modal #remark').val(data.remark);
            if (data.inactive == true)
                $('#create-user-modal #inactive').prop('checked', true);
            else
                $('#create-user-modal #inactive').prop('checked', false);

            if (data.pwd_expiry == true)
                $('#create-user-modal #pwd_expiry').prop('checked', true);
            else
                $('#create-user-modal #pwd_expiry').prop('checked', false);

            $('#create-user-modal #password').attr('readonly', true);
            $('#create-user-modal #retype_password').attr('readonly', true);
            $('#btn-save-user').show();
            $('#create-user-modal').modal();
        });
    });

    /* view user info into modal */
    $(document).on("click", ".table .btn-success", function (event) {
        event.preventDefault();
        var href = $(this).attr('href');
        $.get(href, function (data, status) {
            $('#create-user-modal #user_id').val(data.user_id);
            $('#create-user-modal #user_name').val(data.user_name);
            $('#create-user-modal #login_name').val(data.login_name);
            $('#profile_id').val(data.profile_id);
            $('#create-user-modal #remark').val(data.remark);
            if (data.inactive == true)
                $('#create-user-modal #inactive').prop('checked', true);
            else
                $('#create-user-modal #inactive').prop('checked', false);

            if (data.pwd_expiry == true)
                $('#create-user-modal #pwd_expiry').prop('checked', true);
            else
                $('#create-user-modal #pwd_expiry').prop('checked', false);

            $('#create-user-modal #password').attr('readonly', true);
            $('#create-user-modal #retype_password').attr('readonly', true);
            $('#btn-save-user').hide();
            $('#create-user-modal').modal();
        });
    });

    /* clear form #create-user */
    $('#btn-new-user').on('click', function (e) {
        clear_modal_save_user();
        $('#btn-save-user').show();
    });

    /* func clear save user modal */
    function clear_modal_save_user() {
        $('input:text, input:password, input:file, select, textarea', '#create-user').val('');
        $('input:checkbox, input:radio', '#create-user').removeAttr('checked').removeAttr('selected');
        $('input:text, input:password, input:file, select, textarea', '#create-user').removeAttr('readonly');
        $('#create-user-modal #user_id').attr('readonly', true);
        $('#create-user-modal #inactive').prop('checked', false);
        $('#create-user-modal #pwd_expiry').prop('checked', false);
    }

    /* save new user or edit user info */
    $('#btn-save-user').on('click', function (event) {
        event.preventDefault();
        var user_id = $('#user_id').val();
        var user_name = $('#user_name').val();
        var login_name = $('#login_name').val();
        var password = $('#password').val();
        var profile_id = $('#profile_id').val();
        var remark = $('#remark').val();
        var inactive = false;
        var pwd_expiry = false;
        if ($('#inactive').is(":checked")) {
            inactive = true;
        }
        if ($('#pwd_expiry').is(":checked")) {
            pwd_expiry = true;
        }
        $.ajax({
            async: false,
            dataType: "json",
            type: "POST",
            url: "/save-user",
            data: {
                user_id: user_id,
                user_name: user_name,
                login_name: login_name,
                password: password,
                profile_id: profile_id,
                remark: remark,
                inactive: inactive,
                pwd_expiry: pwd_expiry
            },
            success: function (data) {
                loadUsersIntoTable(data);
            },
            error: function (e) {
                console.log(e);
            }
        });
        $('#create-user-modal').modal('toggle');
    });

    /* func load data into table */
    function loadUsersIntoTable(data) {
        $("#sys_users > tbody").html('');
        $.each(data, function (key, num) {
            var userStatus = getStatus(data[key].inactive);
            var users = "<tr>" +
                "<td>" + data[key].user_id + "</td>" +
                "<td>" + data[key].user_name + "</td>" +
                "<td>" + data[key].login_name + "</td>" +
                "<td>" + data[key].profile_id + "</td>" +
                "<td>" + userStatus + "</td>" +
                "<td>" + "<a href=\"/users/view/" + data[key].user_id + "\" class=\"btn btn-xs btn-success\">\n" +
                "<i class=\"fa fa-eye\"></i></a>" +
                " <a href=\"/users/edit/" + data[key].user_id + "\" class=\"btn btn-xs btn-primary\">\n" +
                "<i class=\"fa fa-edit\"></i></a>" + "</td>" +
                "</tr>";
            $("#sys_users").append(users);
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