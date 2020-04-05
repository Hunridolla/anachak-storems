package lasolutions.stockmanagement.controller;

import lasolutions.stockmanagement.PurchaseOrder.PurchaseOrderModel;
import lasolutions.stockmanagement.PurchaseOrder.PurchaseOrderRepository;
import lasolutions.stockmanagement.PurchaseOrderDetail.PurchaseOrderDetailModel;
import lasolutions.stockmanagement.PurchaseOrderDetail.PurchaseOrderDetailRepository;
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
public class PurchaseOrderController {

    private final VendorRepository vendorRepository;
    private final PurchaseOrderRepository purchaseOrderRepository;
    private final PurchaseOrderDetailRepository purchaseOrderDetailRepository;

    @Autowired
    public PurchaseOrderController(VendorRepository vendorRepository, PurchaseOrderRepository purchaseOrderRepository, PurchaseOrderDetailRepository purchaseOrderDetailRepository){
        this.vendorRepository = vendorRepository;
        this.purchaseOrderRepository = purchaseOrderRepository;
        this.purchaseOrderDetailRepository = purchaseOrderDetailRepository;
    }

    @RequestMapping(value = "/purchase-orders", method = RequestMethod.GET)
    public ModelAndView showPurchaseOrders(){
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.addObject("vendors", vendorRepository.getVendors());
        modelAndView.setViewName("purchase-orders");
        return modelAndView;
    }

    @RequestMapping(value = "/save-purchase-order", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<Object> savePurchaseOrder(
            @RequestParam("purchase_id") String purchase_id,
            @RequestParam("purchase_date") Date purchase_date,
            @RequestParam("vendor_id") String vendor_id,
            @RequestParam("ref_no") String ref_no,
            @RequestParam("remark") String remark,
            @RequestParam("address") String address,
            @RequestParam("sub_amt") float sub_amt,
            @RequestParam("disc_amt") float disc_amt,
            @RequestParam("total_amt") float total_amt
    ){
        PurchaseOrderModel purchaseOrderModel = new PurchaseOrderModel();
        if(purchase_id.isEmpty()){
            purchase_id = purchaseOrderRepository.getPurchaseId();
        }
        purchaseOrderModel.setPurchase_id(purchase_id);
        purchaseOrderModel.setPurchase_date(purchase_date);
        purchaseOrderModel.setVendor_id(vendor_id);
        purchaseOrderModel.setRef_no(ref_no);
        purchaseOrderModel.setRemark(remark);
        purchaseOrderModel.setAddress(address);
        purchaseOrderModel.setSub_amt(sub_amt);
        purchaseOrderModel.setDisc_amt(disc_amt);
        purchaseOrderModel.setTotal_amt(total_amt);
        purchaseOrderRepository.save(purchaseOrderModel);
        return new ResponseEntity<>(purchaseOrderModel, HttpStatus.OK);
    }

    @RequestMapping(value = "/save-purchase-order-detail", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<Object> savePurchaseOrderDetail(
            @RequestParam("purchase_id") String purchase_id,
            @RequestParam("item_code") String item_code,
            @RequestParam("item_desc") String item_desc,
            @RequestParam("item_qty") int item_qty,
            @RequestParam("item_rate") float item_rate,
            @RequestParam("item_disc") float item_disc,
            @RequestParam("item_sub_amt") float item_sub_amt,
            @RequestParam("item_total_amt") float item_total_amt
    ){
        PurchaseOrderDetailModel purchaseOrderDetailModel = new PurchaseOrderDetailModel();
        purchaseOrderDetailModel.setPurchase_id(purchase_id);
        purchaseOrderDetailModel.setItem_id(item_code);
        purchaseOrderDetailModel.setItem_name(item_desc);
        purchaseOrderDetailModel.setQty(item_qty);
        purchaseOrderDetailModel.setRate(item_rate);
        purchaseOrderDetailModel.setDisc_amt(item_disc);
        purchaseOrderDetailModel.setTotal_amt(item_sub_amt);
        purchaseOrderDetailModel.setSub_amt(item_total_amt);
        purchaseOrderDetailRepository.save(purchaseOrderDetailModel);
        return new ResponseEntity<>(purchaseOrderDetailModel, HttpStatus.OK);
    }
}
