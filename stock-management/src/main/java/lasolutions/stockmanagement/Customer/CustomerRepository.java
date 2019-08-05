package lasolutions.stockmanagement.Customer;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CustomerRepository extends JpaRepository<CustomerModel, String> {

    String getCustomerId = "CALL GBL_GET_CUS_ID";
    @Query(value = getCustomerId, nativeQuery = true)
    String getCustomerId();

    String getCustomers = "CALL GBL_GET_CUS";
    @Query(value = getCustomers, nativeQuery = true)
    List<CustomerModel>  getCustomers();

    String getCustomerById = "CALL GBL_SHOW_CUS_INFO(:customer_id)";
    @Query(value = getCustomerById, nativeQuery = true)
    CustomerModel getCustomerById(@Param("customer_id") String customer_id);
}
