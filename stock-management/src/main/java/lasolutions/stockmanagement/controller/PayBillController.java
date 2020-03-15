package lasolutions.stockmanagement.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class PayBillController {

    @RequestMapping(value = "/pay-bills", method = RequestMethod.GET)
    public ModelAndView showPayBills(){
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("pay-bills");
        return modelAndView;
    }
}
