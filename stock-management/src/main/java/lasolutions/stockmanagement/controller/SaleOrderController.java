package lasolutions.stockmanagement.controller;

import lasolutions.stockmanagement.Customer.CustomerRepository;
import lasolutions.stockmanagement.SaleOrder.SaleOrderModel;
import lasolutions.stockmanagement.SaleOrder.SaleOrderRepository;
import lasolutions.stockmanagement.SaleOrderDetail.SaleOrderDetailModel;
import lasolutions.stockmanagement.SaleOrderDetail.SaleOrderDetailRepository;
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
public class SaleOrderController {

    private final CustomerRepository customerRepository;
    private final SaleOrderRepository saleOrderRepository;
    private final SaleOrderDetailRepository saleOrderDetailRepository;

    public SaleOrderController(CustomerRepository customerRepository, SaleOrderRepository saleOrderRepository, SaleOrderDetailRepository saleOrderDetailRepository) {
        this.customerRepository = customerRepository;
        this.saleOrderRepository = saleOrderRepository;
        this.saleOrderDetailRepository = saleOrderDetailRepository;
    }

    @RequestMapping(value = "/sale-orders", method = RequestMethod.GET)
    public ModelAndView showSaleOrders(){
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.addObject("customers", customerRepository.getCustomers());
        modelAndView.setViewName("sale-orders");
        return modelAndView;
    }

    @RequestMapping(value = "/save-sale-order", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<Object> saveSaleOrder(
        @RequestParam("sale_order_id") String sale_order_id,
        @RequestParam("sale_order_date") Date sale_order_date,
        @RequestParam("customer_id") String customer_id,
        @RequestParam("ref_no") String ref_no,
        @RequestParam("remark") String remark,
        @RequestParam("address") String address,
        @RequestParam("sub_amt") float sub_amt,
        @RequestParam("disc_amt") float disc_amt,
        @RequestParam("total_amt") float total_amt
    ){
        SaleOrderModel saleOrderModel = new SaleOrderModel();
        if(sale_order_id.isEmpty()){
            sale_order_id = saleOrderRepository.getSaleOrderId();
        }
        saleOrderModel.setSale_order_id(sale_order_id);
        saleOrderModel.setSale_order_date(sale_order_date);
        saleOrderModel.setCustomer_id(customer_id);
        saleOrderModel.setRef_no(ref_no);
        saleOrderModel.setRemark(remark);
        saleOrderModel.setAddress(address);
        saleOrderModel.setSub_amt(sub_amt);
        saleOrderModel.setDisc_amt(disc_amt);
        saleOrderModel.setTotal_amt(total_amt);
        saleOrderRepository.save(saleOrderModel);
        return new ResponseEntity<>(saleOrderModel, HttpStatus.OK);
    }

    @RequestMapping(value = "/save-sale-order-detail", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<Object> saveSaleOrderDetail(
            @RequestParam("sale_order_id") String sale_order_id,
            @RequestParam("item_code") String item_code,
            @RequestParam("item_desc") String item_desc,
            @RequestParam("item_qty") int item_qty,
            @RequestParam("item_rate") float item_rate,
            @RequestParam("item_disc") float item_disc,
            @RequestParam("item_sub_amt") float item_sub_amt,
            @RequestParam("item_total_amt") float item_total_amt
    ){
        SaleOrderDetailModel saleOrderDetailModel = new SaleOrderDetailModel();
        saleOrderDetailModel.setSale_order_id(sale_order_id);
        saleOrderDetailModel.setItem_id(item_code);
        saleOrderDetailModel.setItem_name(item_desc);
        saleOrderDetailModel.setQty(item_qty);
        saleOrderDetailModel.setRate(item_rate);
        saleOrderDetailModel.setDisc_amt(item_disc);
        saleOrderDetailModel.setTotal_amt(item_sub_amt);
        saleOrderDetailModel.setSub_amt(item_total_amt);
        saleOrderDetailRepository.save(saleOrderDetailModel);
        return new ResponseEntity<>(saleOrderDetailModel, HttpStatus.OK);
    }
}
