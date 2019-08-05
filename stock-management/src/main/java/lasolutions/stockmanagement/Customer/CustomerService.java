package lasolutions.stockmanagement.Customer;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface CustomerService {
    String getCustomerId();
    List<CustomerModel> getCustomers();
    CustomerModel getCustomerById(String customer_id);
}
