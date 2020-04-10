package lasolutions.stockmanagement.controller;

import lasolutions.stockmanagement.Customer.CustomerRepository;
import lasolutions.stockmanagement.Invoice.InvoiceModel;
import lasolutions.stockmanagement.Invoice.InvoiceRepository;
import lasolutions.stockmanagement.InvoiceDetail.InvoiceDetailModel;
import lasolutions.stockmanagement.InvoiceDetail.InvoiceDetailRepository;
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
public class InvoiceController {
    private final CustomerRepository customerRepository;
    private final InvoiceRepository invoiceRepository;
    private final InvoiceDetailRepository invoiceDetailRepository;

    public InvoiceController(CustomerRepository customerRepository, InvoiceRepository invoiceRepository, InvoiceDetailRepository invoiceDetailRepository) {
        this.customerRepository = customerRepository;
        this.invoiceRepository = invoiceRepository;
        this.invoiceDetailRepository = invoiceDetailRepository;
    }

    @RequestMapping(value = "/invoices", method = RequestMethod.GET)
    public ModelAndView showInvoices(){
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.addObject("customers", customerRepository.getCustomers());
        modelAndView.setViewName("invoices");
        return modelAndView;
    }

    @RequestMapping(value = "/save-invoice", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<Object> saveInvoice(
            @RequestParam("inv_id") String inv_id,
            @RequestParam("inv_date") Date inv_date,
            @RequestParam("customer_id") String customer_id,
            @RequestParam("seller") String seller,
            @RequestParam(value = "ship_date",required = false) Date ship_date,
            @RequestParam("ship_to") String ship_to,
            @RequestParam("remark") String remark,
            @RequestParam("sub_amt") float sub_amt,
            @RequestParam("disc_amt") float disc_amt,
            @RequestParam("total_amt") float total_amt
    ){
        InvoiceModel invoiceModel = new InvoiceModel();
        if(inv_id.isEmpty()){
            inv_id = invoiceRepository.getInvoiceId();
        }
        invoiceModel.setInv_id(inv_id);
        invoiceModel.setInv_date(inv_date);
        invoiceModel.setCustomer_id(customer_id);
        invoiceModel.setSeller(seller);
        /*if(ship_date != null){
            invoiceModel.setShip_date(ship_date);
        }*/
        invoiceModel.setShip_date(ship_date);
        invoiceModel.setShip_to(ship_to);
        invoiceModel.setRemark(remark);
        invoiceModel.setSub_amt(sub_amt);
        invoiceModel.setDisc_amt(disc_amt);
        invoiceModel.setTotal_amt(total_amt);
        invoiceRepository.save(invoiceModel);
        return new ResponseEntity<>(invoiceModel, HttpStatus.OK);
    }

    @RequestMapping(value = "/save-invoice-detail", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<Object>  saveBillDetail(
            @RequestParam("inv_id") String inv_id,
            @RequestParam("item_code") String item_code,
            @RequestParam("item_desc") String item_desc,
            @RequestParam("item_qty") int item_qty,
            @RequestParam("item_rate") float item_rate,
            @RequestParam("item_disc") float item_disc,
            @RequestParam("item_sub_amt") float item_sub_amt,
            @RequestParam("item_total_amt") float item_total_amt
    ){
        InvoiceDetailModel invoiceDetailModel = new InvoiceDetailModel();
        invoiceDetailModel.setInv_id(inv_id);
        invoiceDetailModel.setItem_id(item_code);
        invoiceDetailModel.setItem_name(item_desc);
        invoiceDetailModel.setQty(item_qty);
        invoiceDetailModel.setRate(item_rate);
        invoiceDetailModel.setDisc_amt(item_disc);
        invoiceDetailModel.setTotal_amt(item_sub_amt);
        invoiceDetailModel.setSub_amt(item_total_amt);
        invoiceDetailRepository.save(invoiceDetailModel);
        return new ResponseEntity<>(invoiceDetailModel, HttpStatus.OK);
    }
}
