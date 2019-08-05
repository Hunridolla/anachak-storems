
$(document).ready(function () {

    /* read data into form */
    $(document).on("click", ".table .btn-primary", function (event) {
        event.preventDefault();
        var href = $(this).attr('href');
        $.get(href, function (data) {
            $('#frm-create-customer #customer_id').val(data.customer_id);
            $('#frm-create-customer #company_name').val(data.company_name);
            $('#frm-create-customer #company_name_khmer').val(data.company_name_khmer);
            $('#frm-create-customer #title').val(data.title);
            $('#frm-create-customer #first_name').val(data.first_name);
            $('#frm-create-customer #last_name').val(data.last_name);
            $('#frm-create-customer #contact').val(data.contact);
            $('#frm-create-customer #phone').val(data.phone);
            $('#frm-create-customer #email').val(data.email);
            $('#frm-create-customer #website').val(data.website);
            $('#frm-create-customer #address-detail').val(data.address_detail);
            $('#frm-create-customer #remark').val(data.remark);
            if (data.inactive == true)
                $('#frm-create-customer #inactive').prop('checked', true);
            else
                $('#frm-create-customer #inactive').prop('checked', false);
        });
        $("#tab-create-customer").click();
    });


    /* save customer */
    $('#btn-save-customer').on('click', function (event) {
        event.preventDefault();
        var customer_id = $('#customer_id').val();
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
            url: "/save-customer",
            data: {
                customer_id: customer_id,
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
                clear_frm_save_customer();
            },
            error: function (e) {
                console.log(e);
            }
        });

    });

    $('#tab-customer-list').on('click', function (event) {
        event.preventDefault();
        var href = "/customers/get/all";
        $.get(href, function (data) {
            SpreadData(data);
        });
    });

    /* func load data into table */
    function SpreadData(data) {
        $("#tbl_customers > tbody").html('');
        $.each(data, function (key) {
            var customerStatus = getStatus(data[key].inactive);
            var customers = "<tr>" +
                "<td>" + data[key].customer_id + "</td>" +
                "<td>" + data[key].company_name + "</td>" +
                "<td>" + data[key].company_name_khmer + "</td>" +
                "<td>" + data[key].contact + "</td>" +
                "<td>" + data[key].phone + "</td>" +
                "<td>" + customerStatus + "</td>" +
                "<td>" + "<a href=\"/customers/view/" + data[key].customer_id + "\" class=\"btn btn-xs btn-primary\">\n" +
                "<i class=\"fa fa-edit\"></i></a>" +
                "</td>"
                + "</tr>";
            $("#tbl_customers").append(customers);
        });
    }

    /* func add label inactive & active */
    function getStatus(Status) {
        return {
            true: "<span class=\"label label-danger\">inactive</span>",
            false: "<span class=\"label label-success\">active</span>"
        }[Status];
    }

    /* func clear frm save customer */
    function clear_frm_save_customer() {
        $('input:text, input:password, input:file, select, textarea', '#frm-create-customer').val('');
        $('input:checkbox, input:radio', '#frm-create-customer').removeAttr('checked').removeAttr('selected');
        $('#inactive').prop('checked', false);
        $(function(){
            $("#company_name").focus();
        });
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