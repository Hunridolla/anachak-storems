package lasolutions.stockmanagement.CostMethod;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("CostMethodService")
public class CostMethodServiceImplement implements CostMethodService {

    @Autowired
    private CostMethodRepository costMethodRepository;

    @Override
    public List<CostMethodModel> getCostMethods() {
        return costMethodRepository.getCostMethods();
    }
}
