package lasolutions.stockmanagement.controller;

import lasolutions.stockmanagement.Customer.CustomerRepository;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class SaleOrderController {

    private final CustomerRepository customerRepository;

    public SaleOrderController(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    @RequestMapping(value = "/sale-orders", method = RequestMethod.GET)
    public ModelAndView showSaleOrders(){
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.addObject("customers", customerRepository.getCustomers());
        modelAndView.setViewName("sale-orders");
        return modelAndView;
    }
}
