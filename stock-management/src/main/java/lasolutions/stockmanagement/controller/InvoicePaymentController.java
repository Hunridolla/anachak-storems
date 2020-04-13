package lasolutions.stockmanagement.controller;

import lasolutions.stockmanagement.Customer.CustomerRepository;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class InvoicePaymentController {
    private final CustomerRepository customerRepository;

    public InvoicePaymentController(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    @RequestMapping(value = "/invoice-payments", method = RequestMethod.GET)
    public ModelAndView showInvoicePayments(){
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.addObject("customers",customerRepository.getCustomers());
        modelAndView.setViewName("invoice-payments");
        return modelAndView;
    }
}
