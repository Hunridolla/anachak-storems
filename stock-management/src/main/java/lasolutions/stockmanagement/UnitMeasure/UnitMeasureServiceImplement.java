package lasolutions.stockmanagement.UnitMeasure;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("UnitMeasureService")
public class UnitMeasureServiceImplement implements UnitMeasureService {

    @Autowired
    private UnitMeasureRepository unitMeasureRepository;

    @Override
    public List<UnitMeasureModel> getUnitMeasures() {
        return unitMeasureRepository.getUnitMeasures();
    }

    @Override
    public UnitMeasureModel getUnitMeasureByID(String unit_measure_id) {
        return unitMeasureRepository.getUnitMeasureByID(unit_measure_id);
    }

    @Override
    public String getUnitMeasureId() {
        return unitMeasureRepository.getUnitMeasureId();
    }
}
