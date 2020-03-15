package lasolutions.stockmanagement.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class InvoicePaymentController {

    @RequestMapping(value = "/invoice-payments", method = RequestMethod.GET)
    public ModelAndView showInvoicePayments(){
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("invoice-payments");
        return modelAndView;
    }
}
