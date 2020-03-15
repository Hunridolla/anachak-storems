package lasolutions.stockmanagement.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class SaleOrderController {

    @RequestMapping(value = "/sale-orders", method = RequestMethod.GET)
    public ModelAndView showSaleOrders(){
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("sale-orders");
        return modelAndView;
    }
}
