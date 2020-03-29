package lasolutions.stockmanagement.controller;

import lasolutions.stockmanagement.Vendor.VendorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class PurchaseOrderController {

    private final VendorRepository vendorRepository;

    @Autowired
    public PurchaseOrderController(VendorRepository vendorRepository){
        this.vendorRepository = vendorRepository;
    }

    @RequestMapping(value = "/purchase-orders", method = RequestMethod.GET)
    public ModelAndView showPurchaseOrders(){
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.addObject("vendors", vendorRepository.getVendors());
        modelAndView.setViewName("purchase-orders");
        return modelAndView;
    }
}
