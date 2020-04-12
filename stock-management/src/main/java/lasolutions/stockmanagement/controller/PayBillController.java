package lasolutions.stockmanagement.controller;

import lasolutions.stockmanagement.PayBill.PayBillModel;
import lasolutions.stockmanagement.PayBill.PayBillRepository;
import lasolutions.stockmanagement.PayBillDetail.PayBillDetailModel;
import lasolutions.stockmanagement.PayBillDetail.PayBillDetailRepository;
import lasolutions.stockmanagement.PublicModel.T3N3Model;
import lasolutions.stockmanagement.PublicModel.T3N3Repository;
import lasolutions.stockmanagement.Vendor.VendorRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.Date;
import java.util.List;

@Controller
public class PayBillController {

    private final VendorRepository vendorRepository;
    private final T3N3Repository t3N3Repository;
    private final PayBillRepository payBillRepository;
    private final PayBillDetailRepository payBillDetailRepository;
    String vReturn;

    public PayBillController(VendorRepository vendorRepository, T3N3Repository t3N3Repository, PayBillRepository payBillRepository, PayBillDetailRepository payBillDetailRepository) {
        this.vendorRepository = vendorRepository;
        this.t3N3Repository = t3N3Repository;
        this.payBillRepository = payBillRepository;
        this.payBillDetailRepository = payBillDetailRepository;
    }

    @RequestMapping(value = "/pay-bills", method = RequestMethod.GET)
    public ModelAndView showPayBills(){
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.addObject("vendors",vendorRepository.getVendors());
        modelAndView.setViewName("pay-bills");
        return modelAndView;
    }

    @RequestMapping(value = "/get-payable-bill/{vendor_id}", method = RequestMethod.GET)
    public ResponseEntity<Object> getPayableBill(@PathVariable("vendor_id") String vendor_id){
        List<T3N3Model> bills = t3N3Repository.getPayableBill(vendor_id);
        return new ResponseEntity<>(bills, HttpStatus.OK);
    }

    @RequestMapping(value = "/save-pay-bill", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<Object> savePayment(
            @RequestParam("paid_id") String paid_id,
            @RequestParam("paid_date") Date paid_date,
            @RequestParam("vendor_id") String vendor_id,
            @RequestParam("ref_no") String ref_no,
            @RequestParam("remark") String remark,
            @RequestParam("sub_amt") float sub_amt,
            @RequestParam("disc_amt") float disc_amt,
            @RequestParam("total_amt") float total_amt
    ){
        PayBillModel payBillModel = new PayBillModel();
        if(paid_id.isEmpty()){
            paid_id = payBillRepository.getPaidId();
        }
        payBillModel.setPaid_id(paid_id);
        payBillModel.setPaid_date(paid_date);
        payBillModel.setVendor_id(vendor_id);
        payBillModel.setRef_no(ref_no);
        payBillModel.setRemark(remark);
        payBillModel.setSub_amt(sub_amt);
        payBillModel.setDisc_amt(disc_amt);
        payBillModel.setTotal_amt(total_amt);
        payBillRepository.save(payBillModel);
        return new ResponseEntity<>(payBillModel, HttpStatus.OK);
    }

    @RequestMapping(value = "/save-pay-bill-detail", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<Object> savePaymentDetail(
        @RequestParam("paid_id") String paid_id,
        @RequestParam("bill_id") String bill_id,
        @RequestParam("disc_amt") float disc_amt,
        @RequestParam("pay_amt") float pay_amt
    ){
        PayBillDetailModel payBillDetailModel = new PayBillDetailModel();
        payBillDetailModel.setPaid_id(paid_id);
        payBillDetailModel.setBill_id(bill_id);
        payBillDetailModel.setDisc_amt(disc_amt);
        payBillDetailModel.setPay_amt(pay_amt);
        payBillDetailRepository.save(payBillDetailModel);
        vReturn = payBillDetailRepository.RefreshBill(bill_id);
        return new ResponseEntity<>(payBillDetailModel, HttpStatus.OK);
    }
}
