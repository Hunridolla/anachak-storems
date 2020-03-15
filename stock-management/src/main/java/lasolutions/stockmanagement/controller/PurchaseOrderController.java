package lasolutions.stockmanagement.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class PurchaseOrderController {

    @RequestMapping(value = "/purchase-orders", method = RequestMethod.GET)
    public ModelAndView showPurchaseOrders(){
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("purchase-orders");
        return modelAndView;
    }
}
