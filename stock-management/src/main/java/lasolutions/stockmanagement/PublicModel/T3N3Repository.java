package lasolutions.stockmanagement.PublicModel;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface T3N3Repository extends JpaRepository<T3N3Model, Integer> {
    String getPayableBill = "CALL GBL_GET_PAYABLE_BILL(:vendor_id)";
    @Query(value = getPayableBill, nativeQuery = true)
    List<T3N3Model> getPayableBill(@Param("vendor_id") String vendor_id);
}
