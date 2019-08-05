package lasolutions.stockmanagement.Receipt;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ReceiptRepository extends JpaRepository<ReceiptModel,String> {
    String getMaxId = "CALL GBL_GET_MAX_REC_ID";
    @Query(value = getMaxId,nativeQuery = true)
    ReceiptModel getMaxId();
}
