package lasolutions.stockmanagement.controller;

import lasolutions.stockmanagement.Catagory.CategoryRepository;
import lasolutions.stockmanagement.Customer.CustomerRepository;
import lasolutions.stockmanagement.Invoice.InvoiceRepository;
import lasolutions.stockmanagement.Invoice.InvoiceService;
import lasolutions.stockmanagement.Item.ItemModel;
import lasolutions.stockmanagement.Item.ItemRepository;
import lasolutions.stockmanagement.User.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@Controller
public class POSController {
    @Autowired
    private CategoryRepository categoryRepository;
    private ItemRepository itemRepository;
    private InvoiceRepository invoiceRepository;
    private CustomerRepository customerRepository;
    private InvoiceService invoiceService;

    @Autowired
    public POSController(InvoiceService invoiceService, CustomerRepository customerRepository, CategoryRepository categoryRepository, ItemRepository itemRepository, UserRepository userRepository, InvoiceRepository invoiceRepository) {

        this.categoryRepository = categoryRepository;
        this.itemRepository = itemRepository;
        this.invoiceRepository = invoiceRepository;
        this.customerRepository = customerRepository;
        this.invoiceService = invoiceService;

    }
    @RequestMapping(value = "/pos", method = RequestMethod.GET)
    public ModelAndView showItem() {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.addObject("categories", categoryRepository.getCategories());
        modelAndView.addObject("customer",customerRepository.getCustomers());

        modelAndView.setViewName("pos");
        return modelAndView;
    }

    @RequestMapping(value = "/pos/{cat_id}", method = RequestMethod.GET)
    public ResponseEntity<Object> viewItem(@PathVariable("cat_id") String cat_id) {
        List<ItemModel> itemModel = itemRepository.getItemByCat(cat_id);
//        ItemModel itemModel = itemRepository.getItemByCat(cat_id);
        return new ResponseEntity<>(itemModel, HttpStatus.OK);
    }

    @RequestMapping(value = "/getItembyID/{item_id}", method = RequestMethod.GET)
    public ResponseEntity<Object> getItem(@PathVariable("item_id") String item_id) {
        ItemModel itemModel = itemRepository.getItemById(item_id);
        return new ResponseEntity<>(itemModel, HttpStatus.OK);
    }

    @RequestMapping(value = "/getItemByBarcode/{barcode}", method = RequestMethod.GET)
    public ResponseEntity<Object> getItemByBarcode(@PathVariable("barcode") String barcode) {
        ItemModel itemModel = itemRepository.getItemByBarcode(barcode);
        return new ResponseEntity<>(itemModel, HttpStatus.OK);
    }
    /*
    @RequestMapping(value = "/save-invoice", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<Object> saveItem(
            @RequestParam("seller") String seller,
            @RequestParam("sub_amt") Double sub_amt,
            @RequestParam("disc_amt") Double disc_amt,
            @RequestParam("total_amt") Double total_amt,
            @RequestParam("customer") String customer
    ) {
        //Generate Invoice ID and Receipt ID
        //String MaxId= invoiceService.getMaxId().getInv_id();
        String RecMaxId= receiptService.getMaxId().getReceipt_id();

        MaxId = (MaxId=="0") ? "0" :  MaxId.substring(MaxId.lastIndexOf('-') + 1);
        RecMaxId = (RecMaxId=="0") ? "0" :  RecMaxId.substring(RecMaxId.lastIndexOf('-') + 1);

        int ID = Integer.parseInt(MaxId);
        int RecID = Integer.parseInt(RecMaxId);
        ID = ID+1;
        RecID = RecID+1;

        String IDFormat = String.format("%06d", ID);
        String RecIDFormat = String.format("%06d", RecID);

        IDFormat = "INV-"+IDFormat;
        RecIDFormat = "REC-"+RecIDFormat;

//        System.out.print(IDFormat);
        //Save Data to tbl_invoices
        InvoiceModel invoiceModel;
        invoiceModel = new InvoiceModel();
        invoiceModel.setInv_id(IDFormat);
        invoiceModel.setSeller(seller);
        invoiceModel.setSub_amt(sub_amt);
        invoiceModel.setDisc_amt(disc_amt);
        invoiceModel.setTotal_amt(total_amt);
        invoiceModel.setCustomer_id(customer);
        invoiceModel.setInactive(1);
        invoiceRepository.save(invoiceModel);

        //Save Data to tbl_receipts
        ReceiptModel receiptModel = new ReceiptModel();
        receiptModel.setReceipt_id(RecIDFormat);
        receiptModel.setCustomer_id(customer);
        receiptModel.setRef_no(IDFormat);
        receiptModel.setSub_amt(sub_amt);
        receiptModel.setDisc_amt(disc_amt);
        receiptModel.setTotal_amt(total_amt);

        receiptRepository.save(receiptModel);

        return new ResponseEntity<>(invoiceModel, HttpStatus.OK);
    }

//    @RequestMapping(value = "/save-invoice-detail", method = RequestMethod.POST)
//    @ResponseBody
//    public ResponseEntity<Object> saveItemDetail(
//            @RequestParam("item_id") String item_id,
//            @RequestParam("item_name") String item_name,
//            @RequestParam("qty") Integer qty,
//            @RequestParam("sub_amt") Double sub_amt
//    ) {
//        //Generate Invoice ID and Receipt ID
//        String MaxId= invoiceService.getMaxId().getInv_id();
//
//
////        System.out.print(IDFormat);
//        //Save Data to tbl_invoices
//        InvoiceDetailModel invoiceDetailModel;
//        invoiceDetailModel = new InvoiceDetailModel();
//        invoiceDetailModel.setInv_id(MaxId);
//        invoiceDetailModel.setItem_id(item_id);
//        invoiceDetailModel.setSub_amt(sub_amt);
//        invoiceDetailModel.setItem_name(item_name);
//        invoiceDetailModel.setQty(qty);
//
//        invoiceDetailRepository.save(invoiceDetailModel);
//
//
//
//        return new ResponseEntity<>(invoiceDetailRepository, HttpStatus.OK);
//    }
*/

}
