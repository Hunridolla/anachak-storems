$(document).ready(function () {

    /* read data into form */
    $(document).on("click", ".table .btn-primary", function (event) {
        event.preventDefault();
        var href = $(this).attr('href');
        $.get(href, function (data) {
            $('#frm-create-vendor #vendor_id').val(data.vendor_id);
            $('#frm-create-vendor #vendor_type').val(data.vendor_type);
            $('#frm-create-vendor #company_name').val(data.company_name);
            $('#frm-create-vendor #company_name_khmer').val(data.company_name_khmer);
            $('#frm-create-vendor #title').val(data.title);
            $('#frm-create-vendor #first_name').val(data.first_name);
            $('#frm-create-vendor #last_name').val(data.last_name);
            $('#frm-create-vendor #contact').val(data.contact);
            $('#frm-create-vendor #phone').val(data.phone);
            $('#frm-create-vendor #email').val(data.email);
            $('#frm-create-vendor #website').val(data.website);
            $('#frm-create-vendor #address-detail').val(data.address_detail);
            $('#frm-create-vendor #remark').val(data.remark);
            if (data.inactive == true)
                $('#frm-create-vendor #inactive').prop('checked', true);
            else
                $('#frm-create-vendor #inactive').prop('checked', false);
        });
        $("#tab-create-vendor").click();
    });

    /* save new vendors edit vendors info */
    $('#btn-save-vendor').on('click', function (event) {
        event.preventDefault();
        var vendor_id = $('#vendor_id').val();
        var vendor_type = $('#vendor_type').val();
        var company_name = $('#company_name').val();
        var company_name_khmer = $('#company_name_khmer').val();
        var title = $('#title').val();
        var first_name = $('#first_name').val();
        var last_name = $('#last_name').val();
        var contact = $('#contact').val();
        var phone = $('#phone').val();
        var email = $('#email').val();
        var website = $('#website').val();
        var address_detail = $('#address-detail').val();
        var remark = $('#remark').val();
        var inactive = false;
        if ($('#inactive').is(":checked")) {
            inactive = true;
        }

        $.ajax({
            async: false,
            dataType: "json",
            type: "POST",
            url: "/save-vendor",
            data: {
                vendor_id: vendor_id,
                vendor_type: vendor_type,
                company_name: company_name,
                company_name_khmer: company_name_khmer,
                title: title,
                first_name: first_name,
                last_name: last_name,
                contact: contact,
                phone: phone,
                email: email,
                website: website,
                address_detail: address_detail,
                remark: remark,
                inactive: inactive
            },
            success: function () {
                alert_message();
                clear_frm_save_vendor();
            },
            error: function (e) {
                console.log(e);
            }
        });
    });

    $('#tab-vendor-list').on('click', function (event) {
        event.preventDefault();
        var href = "/vendors/get/all";
        $.get(href, function (data) {
            SpreadData(data);
        });
    });

    /* func load data into table */
    function SpreadData(data) {
        $("#tbl_vendors > tbody").html('');
        $.each(data, function (key) {
            var vendorStatus = getStatus(data[key].inactive);
            var vendors = "<tr>" +
                "<td>" + data[key].vendor_id + "</td>" +
                "<td>" + data[key].company_name + "</td>" +
                "<td>" + data[key].company_name_khmer + "</td>" +
                "<td>" + data[key].contact + "</td>" +
                "<td>" + data[key].phone + "</td>" +
                "<td>" + vendorStatus + "</td>" +
                "<td>" + "<a href=\"/vendors/view/" + data[key].vendor_id + "\" class=\"btn btn-xs btn-primary\">\n" +
                "<i class=\"fa fa-edit\"></i></a>" +
                "</td>"
                + "</tr>";
            $("#tbl_vendors").append(vendors);
        });
    }

    $('#btn-new-vendor').on('click', function () {
        clear_frm_save_vendor();
    });

    /* func clear frm save vendor */
    function clear_frm_save_vendor() {
        $('input:text, input:password, input:file, select, textarea', '#frm-create-vendor').val('');
        $('input:checkbox, input:radio', '#frm-create-vendor').removeAttr('checked').removeAttr('selected');
        $('#inactive').prop('checked', false);
        $(function(){
            $("#company_name").focus();
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