package lasolutions.stockmanagement.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class InvoiceController {

    @RequestMapping(value = "/invoices", method = RequestMethod.GET)
    public ModelAndView showInvoices(){
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("invoices");
        return modelAndView;
    }
}
