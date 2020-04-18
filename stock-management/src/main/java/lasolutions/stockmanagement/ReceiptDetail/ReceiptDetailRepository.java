package lasolutions.stockmanagement.ReceiptDetail;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ReceiptDetailRepository extends JpaRepository<ReceiptDetailModel, String> {
    String RefreshInvoice = "CALL GBL_REFRESH_INVOICE(:inv_id)";
    @Query(value = RefreshInvoice, nativeQuery = true)
    String RefreshInvoice(@Param("inv_id") String inv_id);
}
