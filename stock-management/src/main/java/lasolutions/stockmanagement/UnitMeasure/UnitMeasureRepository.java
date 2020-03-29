package lasolutions.stockmanagement.UnitMeasure;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UnitMeasureRepository extends JpaRepository<UnitMeasureModel, String> {

    String getUnitMeasures = "SELECT unit_measure_id, unit_measure_name, remark, inactive FROM tbl_unit_measures";
    @Query(value = getUnitMeasures, nativeQuery = true)
    List<UnitMeasureModel> getUnitMeasures();

    String getUnitMeasureByID = "SELECT unit_measure_id, unit_measure_name, remark, inactive FROM tbl_unit_measures WHERE unit_measure_id= :unit_measure_id";
    @Query(value = getUnitMeasureByID, nativeQuery = true)
    UnitMeasureModel getUnitMeasureByID(@Param("unit_measure_id") String unit_measure_id);

    String getUnitMeasureId = "CALL GBL_GET_UM_ID";
    @Query(value = getUnitMeasureId, nativeQuery = true)
    String getUnitMeasureId();
}
