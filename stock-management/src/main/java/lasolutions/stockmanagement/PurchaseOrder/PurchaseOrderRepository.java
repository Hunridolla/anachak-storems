package lasolutions.stockmanagement.PurchaseOrder;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface PurchaseOrderRepository extends JpaRepository<PurchaseOrderModel, String> {
    String getPurchaseId = "CALL GBL_GET_PURCHASE_ID()";
    @Query(value = getPurchaseId, nativeQuery = true)
    String getPurchaseId();
}
