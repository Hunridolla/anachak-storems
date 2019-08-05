package lasolutions.stockmanagement.CostMethod;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface CostMethodService {
    public List<CostMethodModel> getCostMethods();
}
