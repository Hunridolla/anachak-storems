package lasolutions.stockmanagement.controller;

import lasolutions.stockmanagement.Customer.CustomerModel;
import lasolutions.stockmanagement.Customer.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@Controller
public class CustomerController {

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    public CustomerController(CustomerRepository customerRepository){
        this.customerRepository = customerRepository;
    }

    @RequestMapping(value = "/customers", method = RequestMethod.GET)
    public ModelAndView showCustomers() {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("customers");
        return modelAndView;
    }

    @RequestMapping(value = "/save-customer", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<Object> saveCustomer(
            @RequestParam("customer_id") String customer_id,
            @RequestParam("company_name") String company_name,
            @RequestParam("company_name_khmer") String company_name_khmer,
            @RequestParam("title") String title,
            @RequestParam("first_name") String first_name,
            @RequestParam("last_name") String last_name,
            @RequestParam("contact") String contact,
            @RequestParam("phone") String phone,
            @RequestParam("email") String email,
            @RequestParam("website") String website,
            @RequestParam("address_detail") String address_detail,
            @RequestParam("remark") String remark,
            @RequestParam("inactive") Boolean inactive) {

        CustomerModel customerModel = new CustomerModel();
        if (customer_id.isEmpty()) {
            customer_id = customerRepository.getCustomerId();
        }
        customerModel.setCustomer_id(customer_id);
        customerModel.setCompany_name(company_name);
        customerModel.setCompany_name_khmer(company_name_khmer);
        customerModel.setTitle(title);
        customerModel.setFirst_name(first_name);
        customerModel.setLast_name(last_name);
        customerModel.setContact(contact);
        customerModel.setPhone(phone);
        customerModel.setEmail(email);
        customerModel.setWebsite(website);
        customerModel.setAddress_detail(address_detail);
        customerModel.setRemark(remark);
        customerModel.setInactive(inactive);
        customerRepository.save(customerModel);
        return new ResponseEntity<>(customerModel, HttpStatus.OK);
    }

    @RequestMapping(value = "/customers/get/all", method = RequestMethod.GET)
    public ResponseEntity<Object> getCustomers() {
        List<CustomerModel> customers = customerRepository.getCustomers();
        return new ResponseEntity<>(customers, HttpStatus.OK);
    }

    @RequestMapping(value = "/customers/view/{customer_id}", method = RequestMethod.GET)
    public ResponseEntity<Object> viewCustomer(@PathVariable("customer_id") String customer_id) {
        CustomerModel customer = customerRepository.getCustomerById(customer_id);
        return new ResponseEntity<>(customer, HttpStatus.OK);
    }
}
