package lasolutions.stockmanagement.ExchangeRate;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ExRepository  extends JpaRepository<ExModel, String> {
   String  getExId = "CALL GBL_GET_ExID()";
   @Query(value = getExId, nativeQuery = true)
   String getExId();
}
