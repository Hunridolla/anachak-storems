package lasolutions.stockmanagement.UnitMeasure;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UnitMeasureRepository extends JpaRepository<UnitMeasureModel, String> {

    String getUnitMeasureId = "CALL GBL_GET_UM_ID";
    @Query(value = getUnitMeasureId, nativeQuery = true)
    String getUnitMeasureId();

    String getUnitMeasures = "CALL GBL_GET_UM";
    @Query(value = getUnitMeasures, nativeQuery = true)
    List<UnitMeasureModel> getUnitMeasures();

    String getUnitMeasureByID = "CALL GBL_SHOW_UM_INFO(:unit_measure_id)";
    @Query(value = getUnitMeasureByID, nativeQuery = true)
    UnitMeasureModel getUnitMeasureByID(@Param("unit_measure_id") String unit_measure_id);
}
