package lasolutions.stockmanagement.Customer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("CustomerService")
public class CustomerServiceImplement implements CustomerService{

    @Autowired
    private CustomerRepository customerRepository;

    @Override
    public String getCustomerId() {
        return customerRepository.getCustomerId();
    }

    @Override
    public List<CustomerModel> getCustomers() {
        return customerRepository.getCustomers();
    }

    @Override
    public CustomerModel getCustomerById(String customer_id) {
        return customerRepository.getCustomerById(customer_id);
    }

}
