package lasolutions.stockmanagement.SaleOrder;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface SaleOrderRepository extends JpaRepository<SaleOrderModel, String> {
    String getSaleOrderId = "CALL GBL_GET_SALE_ORDER_ID()";
    @Query(value = getSaleOrderId, nativeQuery = true)
    String getSaleOrderId();
}
