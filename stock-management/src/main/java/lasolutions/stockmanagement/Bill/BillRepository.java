package lasolutions.stockmanagement.Bill;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface BillRepository extends JpaRepository<BillModel, String> {
    String getBillID = "CALL GBL_GET_BILL_ID()";
    @Query(value = getBillID, nativeQuery = true)
    String getGetBillID();
}
