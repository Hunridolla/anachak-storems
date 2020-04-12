package lasolutions.stockmanagement.PayBillDetail;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PayBillDetailRepository extends JpaRepository<PayBillDetailModel, String> {
    String RefreshBill = "CALL GBL_REFRESH_BILL(:bill_id)";
    @Query(value = RefreshBill, nativeQuery = true)
    String RefreshBill(@Param("bill_id") String bill_id);
}
