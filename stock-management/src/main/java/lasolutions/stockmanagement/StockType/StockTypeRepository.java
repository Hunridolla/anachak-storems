package lasolutions.stockmanagement.StockType;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface StockTypeRepository extends JpaRepository<StockTypeModel, Integer> {

    String getStockTypes = "CALL GBL_CALL_StockTypes";

    @Query(value = getStockTypes, nativeQuery = true)
    List<StockTypeModel> getStockTypes();
}
