package lasolutions.stockmanagement.CostMethod;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CostMethodRepository extends JpaRepository<CostMethodModel, Integer> {

    String getCostMethods = "CALL GBL_CALL_CostMethods";

    @Query(value = getCostMethods, nativeQuery = true)
    List<CostMethodModel> getCostMethods();

}
