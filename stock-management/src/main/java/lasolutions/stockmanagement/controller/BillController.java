package lasolutions.stockmanagement.controller;

import lasolutions.stockmanagement.Bill.BillModel;
import lasolutions.stockmanagement.Bill.BillRepository;
import lasolutions.stockmanagement.BillDetail.BillDetailModel;
import lasolutions.stockmanagement.BillDetail.BillDetailRepository;
import lasolutions.stockmanagement.Vendor.VendorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import java.util.Date;

@Controller
public class BillController {

    @Autowired
    private VendorRepository vendorRepository;
    private BillRepository billRepository;
    private BillDetailRepository billDetailRepository;

    @Autowired
    public BillController(VendorRepository vendorRepository, BillRepository billRepository, BillDetailRepository billDetailRepository){
        this.vendorRepository = vendorRepository;
        this.billRepository = billRepository;
        this.billDetailRepository = billDetailRepository;
    }

    @RequestMapping(value = "/stock-in")
    public ModelAndView stockIn() {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.addObject("vendors", vendorRepository.getVendors());
        modelAndView.setViewName("stock-in");
        return modelAndView;
    }
    @RequestMapping(value = "/save-bill", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<Object>  saveBill(
            @RequestParam("bill_id") String bill_id,
            @RequestParam("bill_date") Date bill_date,
            @RequestParam("bill_due") Date bill_due,
            @RequestParam("vendor_id") String vendor_id,
            @RequestParam("ref_no") String ref_no,
            @RequestParam("remark") String remark,
            @RequestParam("address") String address,
            @RequestParam("sub_amt") float sub_amt,
            @RequestParam("disc_amt") float disc_amt,
            @RequestParam("total_amt") float total_amt
    ){
        BillModel billModel = new BillModel();
        if (bill_id.isEmpty()){
            bill_id = billRepository.getGetBillID();
        }
        billModel.setBill_id(bill_id);
        billModel.setBill_date(bill_date);
        billModel.setBill_due(bill_due);
        billModel.setVendor_id(vendor_id);
        billModel.setRef_no(ref_no);
        billModel.setRemark(remark);
        billModel.setAddress(address);
        billModel.setSub_amt(sub_amt);
        billModel.setDisc_amt(disc_amt);
        billModel.setTotal_amt(total_amt);
        billRepository.save(billModel);
        return new ResponseEntity<>(billModel, HttpStatus.OK);
    }

    @RequestMapping(value = "/save-bill-detail", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<Object>  saveBillDetail(
            @RequestParam("bill_id") String bill_id,
            @RequestParam("item_code") String item_code,
            @RequestParam("item_desc") String item_desc,
            @RequestParam("item_qty") int item_qty,
            @RequestParam("item_rate") float item_rate,
            @RequestParam("item_disc") float item_disc,
            @RequestParam("item_sub_amt") float item_sub_amt,
            @RequestParam("item_total_amt") float item_total_amt
    ){
        BillDetailModel billDetailModel = new BillDetailModel();
        billDetailModel.setBill_id(bill_id);
        billDetailModel.setItem_id(item_code);
        billDetailModel.setItem_name(item_desc);
        billDetailModel.setQty(item_qty);
        billDetailModel.setRate(item_rate);
        billDetailModel.setDisc_amt(item_disc);
        billDetailModel.setTotal_amt(item_sub_amt);
        billDetailModel.setSub_amt(item_total_amt);
        billDetailRepository.save(billDetailModel);
        return new ResponseEntity<>(billDetailModel, HttpStatus.OK);
    }
}
