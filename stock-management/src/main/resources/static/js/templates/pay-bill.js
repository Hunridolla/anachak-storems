$(document).ready(function () {
    $('#paid-date').datepicker({
        dateFormat: 'dd-mm-yy',
        prevText: '<i class="fa fa-chevron-left"></i>',
        nextText: '<i class="fa fa-chevron-right"></i>'
    });
    /* SHOW PAYABLE BILLS */
    $("#btn-show-bill").on('click', function (event) {
        event.preventDefault();
        let vendor_id = $("#vendors").val();
        let href = "/get-payable-bill/" + vendor_id;
        $.get(href, function (data) {
           SpreadBill(data);
           calculateBillGrandAmt();
        });
    });

    /* LOAD BILLS INTO TABLE */
    function SpreadBill(data) {
        $("#tbl-pay-bill > tbody").html('');
        $.each(data, function (key) {
            let orig_amt = data[key].nfield1;
            let disc_amt = data[key].nfield2;
            let pay_amt = data[key].nfield3;
            let vBill = "<tr>" +
                "<td style=\"width:10px\" align=\'center\'><label class=\'checkbox\'> <input class='checked' type=\'checkbox\' checked=\'checked\'><i></i></label></td>" +
                "<td align=\'center\'><a class=\"btn btn-xs btn-primary gb-edit-bill\"> <i class=\"fa fa-edit\"></i></a></td>"  +
                "<td>" + data[key].tfield1 + "</td>" +
                "<td>" + data[key].tfield2 + "</td>" +
                "<td>" + data[key].tfield3 + "</td>" +
                "<td>" + orig_amt.toFixed(2) + "</td>" +
                "<td>" + disc_amt.toFixed(2) + "</td>" +
                "<td>" + pay_amt.toFixed(2) + "</td>" +
                "</tr>";
            $("#tbl-pay-bill > tbody:last-child").append(vBill);
        });
    }
    /* FUNCTION CAL GRAND TOTAL */
    function calculateBillGrandAmt() {
        $("#total-subAmt").val(calculateBillColumn(7).toFixed(2));
        $("#total-disc").val(calculateBillColumn(6).toFixed(2));
        $("#total-amt").val((calculateBillColumn(7) - calculateBillColumn(6)).toFixed(2));
    }
    /* FUNCTION CAL TOTAL BY COLUMN */
    function calculateBillColumn(index) {
        let total = 0;
        $("#tbl-pay-bill input[type=checkbox]:checked").each(function () {
            let row = $(this).closest("tr")[0];
            let value = parseFloat(row.cells[index].innerHTML);
            if (!isNaN(value)) {
                total += value;
            }
        });
        return total;
    }
    /* EVENT FOR CHECK BOX CHANGE */
    $(document).on('change', "#tbl-pay-bill .checked", function (event) {
        calculateBillGrandAmt();
    });

    /* SAVE PAYMENT */
    $(document).on('submit', '#frm-create-pay-bill', function (event) {
        event.preventDefault();
        let paid_id = $("#paid-id").val();
        if(paid_id !== ""){
            alert_message("This data is already exist!");
            return;
        }
        let paid_date = toDate($("#paid-date").val());
        let vendor_id = $("#vendors").val();
        let ref_no = $("#ref-no").val();
        let remark = $("#remark").val();
        let sub_amt = toNumber($("#total-subAmt").val());
        let disc_amt = toNumber($("#total-disc").val());
        let total_amt = toNumber($("#total-amt").val());
        $.ajax({
            async: false,
            dataType: "json",
            type: "POST",
            url: "/save-pay-bill",
            data: {
                paid_id: paid_id, paid_date: paid_date, vendor_id: vendor_id, ref_no: ref_no,
                remark: remark,sub_amt: sub_amt, disc_amt: disc_amt, total_amt: total_amt
            },
            success: function (data) {
                let paid_id  = data.paid_id;
                /* SAVE DETAIL HERE */
                savePaymentDetail(paid_id);
                alert_message("You have committed successfully!");
                $("#paid-id").val(paid_id);
            },
            error: function (event) {
                alert_message("Error: " + event);
            }
        });
    });

    $("#btn-show-checked").on('click',function (event) {
        event.preventDefault();
        savePaymentDetail('PAY-000001');
    });

    /* SAVE PAY BILL DETAIL INTO DB */
    function savePaymentDetail(paid_id){
        $("#tbl-pay-bill > tbody > tr input[type=checkbox]:checked").each(function () {
            let bill_id = $(this).closest("tr").find("td:eq(2)").text();
            let disc_amt = toNumber($(this).closest("tr").find("td:eq(6)").text());
            let pay_amt = toNumber($(this).closest("tr").find("td:eq(7)").text());
            $.ajax({
                async: false,
                dataType: "json",
                type: "POST",
                url: "/save-pay-bill-detail",
                data: {
                    paid_id: paid_id, bill_id: bill_id, disc_amt: disc_amt, pay_amt: pay_amt
                },
                success: function () {
                },
                error: function () {
                }
            });
        });
    }

    /* VALIDATIONS */
    /* ADDED BY DOLLA 29-MAR-2020 */
    let $frm_create_pay_bill = $('#frm-create-pay-bill').validate({
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
            paid_date: {
                required: true
            },
            vendors: {
                required: true
            },
            total_amt: {
                required: true
            }
        },

        /* MESSAGE INVALID FOR EACH  FIELDS ABOVE */
        messages: {
            paid_date: {
                required: 'Required*'
            },
            vendors: {
                required: 'Required*'
            },
            total_amt: {
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