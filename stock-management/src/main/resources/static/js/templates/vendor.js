$(document).ready(function () {

    /* GET VENDOR INTO FORM */
    $(document).on("click", ".table .btn-primary", function (event) {
        event.preventDefault();
        let href = $(this).attr('href');
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
        $("#btn-save-vendor").prop('disabled', false);
        $("#btn-new-vendor").prop('disabled', false);
    });

    /* SAVE VENDOR */
    $(document).on('submit',"#frm-create-vendor", function (event) {
        event.preventDefault();
        let vendor_id = $('#vendor_id').val();
        let vendor_type = $('#vendor_type').val();
        let company_name = $('#company_name').val();
        let company_name_khmer = $('#company_name_khmer').val();
        let title = $('#title').val();
        let first_name = $('#first_name').val();
        let last_name = $('#last_name').val();
        let contact = $('#contact').val();
        let phone = $('#phone').val();
        let email = $('#email').val();
        let website = $('#website').val();
        let address_detail = $('#address-detail').val();
        let remark = $('#remark').val();
        let inactive = false;
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
                alert_message("You have committed successfully!");
                clear_frm_save_vendor();
            },
            error: function (e) {
                console.log(e);
            }
        });
    });

    /* DISABLE BUTTON SAVE AND NEW */
    $('#tab-create-vendor').on('click', function (event) {
        event.preventDefault();
        $("#btn-save-vendor").prop('disabled', false);
        $("#btn-new-vendor").prop('disabled', false);
    });

    $('#tab-vendor-list').on('click', function (event) {
        event.preventDefault();
        let href = "/vendors/get/all";
        $.get(href, function (data) {
            SpreadData(data);
        });
        $("#btn-save-vendor").prop('disabled', true);
        $("#btn-new-vendor").prop('disabled', true);
    });

    /* EVENT FOR BUTTON NEW CUSTOMER */
    /* ADDED BY DOLLA 29-MAR-2020 */
    $('#btn-new-vendor').on('click', function () {
        clear_frm_save_vendor();
        $("#btn-save-vendor").prop('disabled', false);
    });

    /* LOAD VENDOR INTO TABLE */
    function SpreadData(data) {
        $("#tbl_vendors > tbody").html('');
        $.each(data, function (key) {
            let vendorStatus = getStatus(data[key].inactive);
            let vendors = "<tr>" +
                "<td>" + data[key].vendor_id + "</td>" +
                "<td>" + data[key].company_name + "</td>" +
                "<td>" + data[key].company_name_khmer + "</td>" +
                "<td>" + data[key].contact + "</td>" +
                "<td>" + data[key].phone + "</td>" +
                "<td>" + vendorStatus + "</td>" +
                "<td align=\"center\">" + "<a href=\"/vendors/view/" + data[key].vendor_id + "\" class=\"btn btn-xs btn-primary\">\n" +
                "<i class=\"fa fa-edit\"></i></a>" +
                "</td>"
                + "</tr>";
            $("#tbl_vendors").append(vendors);
        });
    }

    /* CLEAR FORM CREATE VENDOR */
    function clear_frm_save_vendor() {
        $('input:text, input:password, input:file, select, textarea', '#frm-create-vendor').val('');
        $('input:checkbox, input:radio', '#frm-create-vendor').removeAttr('checked').removeAttr('selected');
        $('#inactive').prop('checked', false);
        $(function(){
            $("#company_name").focus();
        });
    }

    /* VALIDATIONS */
    /* ADDED BY DOLLA 29-MAR-2020 */
    let $frm_create_vendor = $('#frm-create-vendor').validate({
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
            vendor_type: {
                required: true
            },
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
            vendor_type:{
                required: 'Required*'
            },
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