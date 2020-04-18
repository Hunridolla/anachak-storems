package lasolutions.stockmanagement.Receipt;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ReceiptRepository extends JpaRepository<ReceiptModel,String> {
    String getReceiptId = "CALL GBL_GET_RECEIPT_ID";
    @Query(value = getReceiptId,nativeQuery = true)
    String getReceiptId();
}
