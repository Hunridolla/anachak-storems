package lasolutions.stockmanagement.PayBill;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface PayBillRepository extends JpaRepository<PayBillModel, String> {
    String getPaidId = "CALL GBL_GET_PAYMENT_ID()";
    @Query(value = getPaidId, nativeQuery = true)
    String getPaidId();
}
