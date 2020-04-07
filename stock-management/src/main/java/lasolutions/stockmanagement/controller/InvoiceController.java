package lasolutions.stockmanagement.controller;

import lasolutions.stockmanagement.Customer.CustomerRepository;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class InvoiceController {
    private final CustomerRepository customerRepository;

    public InvoiceController(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    @RequestMapping(value = "/invoices", method = RequestMethod.GET)
    public ModelAndView showInvoices(){
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.addObject("customers", customerRepository.getCustomers());
        modelAndView.setViewName("invoices");
        return modelAndView;
    }
}
