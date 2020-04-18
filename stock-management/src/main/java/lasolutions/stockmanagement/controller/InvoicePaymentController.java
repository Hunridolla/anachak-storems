package lasolutions.stockmanagement.controller;

import lasolutions.stockmanagement.Customer.CustomerRepository;
import lasolutions.stockmanagement.PublicModel.T3N3Model;
import lasolutions.stockmanagement.PublicModel.T3N3Repository;
import lasolutions.stockmanagement.Receipt.ReceiptModel;
import lasolutions.stockmanagement.Receipt.ReceiptRepository;
import lasolutions.stockmanagement.ReceiptDetail.ReceiptDetailModel;
import lasolutions.stockmanagement.ReceiptDetail.ReceiptDetailRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.Date;
import java.util.List;

@Controller
public class InvoicePaymentController {
    private final CustomerRepository customerRepository;
    private final T3N3Repository t3N3Repository;
    private final ReceiptRepository receiptRepository;
    private final ReceiptDetailRepository receiptDetailRepository;
    String vReturn;

    public InvoicePaymentController(CustomerRepository customerRepository, T3N3Repository t3N3Repository, ReceiptRepository receiptRepository, ReceiptDetailRepository receiptDetailRepository) {
        this.customerRepository = customerRepository;
        this.t3N3Repository = t3N3Repository;
        this.receiptRepository = receiptRepository;
        this.receiptDetailRepository = receiptDetailRepository;
    }

    @RequestMapping(value = "/invoice-payments", method = RequestMethod.GET)
    public ModelAndView showInvoicePayments(){
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.addObject("customers",customerRepository.getCustomers());
        modelAndView.setViewName("invoice-payments");
        return modelAndView;
    }

    @RequestMapping(value = "/get-receivable-invoice/{customer_id}",method = RequestMethod.GET)
    public ResponseEntity<Object> getReceivableInvoice(@PathVariable("customer_id") String customer_id){
        List<T3N3Model> invoices = t3N3Repository.getReceivableInvoice(customer_id);
        return new ResponseEntity<>(invoices, HttpStatus.OK);
    }

    @RequestMapping(value = "/save-receipt", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<Object> saveReceipt(
            @RequestParam("receipt_id") String receipt_id,
            @RequestParam("receipt_date") Date receipt_date,
            @RequestParam("customer_id") String customer_id,
            @RequestParam("ref_no") String ref_no,
            @RequestParam("remark") String remark,
            @RequestParam("sub_amt") float sub_amt,
            @RequestParam("disc_amt") float disc_amt,
            @RequestParam("total_amt") float total_amt
    ){
        ReceiptModel receiptModel = new ReceiptModel();
        if(receipt_id.isEmpty()){
            receipt_id = receiptRepository.getReceiptId();
        }
        receiptModel.setReceipt_id(receipt_id);
        receiptModel.setReceipt_date(receipt_date);
        receiptModel.setCustomer_id(customer_id);
        receiptModel.setRef_no(ref_no);
        receiptModel.setRemark(remark);
        receiptModel.setSub_amt(sub_amt);
        receiptModel.setDisc_amt(disc_amt);
        receiptModel.setTotal_amt(total_amt);
        receiptRepository.save(receiptModel);
        return new ResponseEntity<>(receiptModel, HttpStatus.OK);
    }

    @RequestMapping(value = "/save-receipt-detail", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<Object> saveReceiptDetail(
            @RequestParam("receipt_id") String receipt_id,
            @RequestParam("inv_id") String inv_id,
            @RequestParam("disc_amt") float disc_amt,
            @RequestParam("receive_amt") float receive_amt
    ){
        ReceiptDetailModel receiptDetailModel = new ReceiptDetailModel();
        receiptDetailModel.setReceipt_id(receipt_id);
        receiptDetailModel.setInv_id(inv_id);
        receiptDetailModel.setDisc_amt(disc_amt);
        receiptDetailModel.setReceive_amt(receive_amt);
        receiptDetailRepository.save(receiptDetailModel);
        vReturn = receiptDetailRepository.RefreshInvoice(inv_id);
        return new ResponseEntity<>(receiptDetailModel, HttpStatus.OK);
    }
}
