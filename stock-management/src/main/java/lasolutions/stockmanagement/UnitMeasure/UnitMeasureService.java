package lasolutions.stockmanagement.UnitMeasure;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface UnitMeasureService {
    public List<UnitMeasureModel> getUnitMeasures();

    public UnitMeasureModel getUnitMeasureByID(String unit_measure_id);

    public String getUnitMeasureId();
}
