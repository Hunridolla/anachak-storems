
$(document).ready(function () {

    /* GET CUSTOMER INTO FORM*/
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
        $("#btn-save-customer").prop('disabled', false);
        $("#btn-new-customer").prop('disabled', false);
    });

    /* SAVE CUSTOMER */
    $(document).on('submit',"#frm-create-customer", function (event) {
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
                alert_message("You have committed successfully!");
                clear_frm_save_customer();
            },
            error: function (e) {
                console.log(e);
            }
        });

    });

    /* DISABLE BUTTON SAVE AND NEW */
    $('#tab-create-customer').on('click', function (event) {
        event.preventDefault();
        $("#btn-save-customer").prop('disabled', false);
        $("#btn-new-customer").prop('disabled', false);
    });

    $('#tab-customer-list').on('click', function (event) {
        event.preventDefault();
        var href = "/customers/get/all";
        $.get(href, function (data) {
            SpreadData(data);
        });
        $("#btn-save-customer").prop('disabled', true);
        $("#btn-new-customer").prop('disabled', true);
    });

    /* EVENT FOR BUTTON NEW CUSTOMER */
    /* ADDED BY DOLLA 29-MAR-2020 */
    $('#btn-new-customer').on('click', function (event) {
        event.preventDefault();
        clear_frm_save_customer();
        $("#btn-save-customer").prop('disabled', false);
    });

    /* LOAD CUSTOMERS INTO TABLE */
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
                "<td align=\'center\'>" + "<a href=\"/customers/view/" + data[key].customer_id + "\" class=\"btn btn-xs btn-primary\">\n" +
                "<i class=\"fa fa-edit\"></i></a>" +
                "</td>"
                + "</tr>";
            $("#tbl_customers").append(customers);
        });
    }

    /* CLEAR FORM CREATE CUSTOMER */
    function clear_frm_save_customer() {
        $('input:text, input:password, input:file, select, textarea', '#frm-create-customer').val('');
        $('input:checkbox, input:radio', '#frm-create-customer').removeAttr('checked').removeAttr('selected');
        $('#inactive').prop('checked', false);
        $(function(){
            $("#company_name").focus();
        });
    }

    /* VALIDATIONS */
    /* ADDED BY DOLLA 29-MAR-2020 */
    var $frm_create_customer = $('#frm-create-customer').validate({
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
            company_name: {
                required: true
            },
            contact: {
                required: true
            },
            phone: {
                required: true
            }
        },

        /* MESSAGE INVALID FOR EACH  FIELDS ABOVE */
        messages: {
            company_name: {
                required: 'Required*'
            },
            contact:{
                required: 'Required*'
            },
            phone: {
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