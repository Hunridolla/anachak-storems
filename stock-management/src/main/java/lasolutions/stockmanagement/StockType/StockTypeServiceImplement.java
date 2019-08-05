package lasolutions.stockmanagement.StockType;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("StockTypeService")
public class StockTypeServiceImplement implements StockTypeService {

    @Autowired
    private StockTypeRepository stockTypeRepository;

    @Override
    public List<StockTypeModel> getStockTypes() {
        return stockTypeRepository.getStockTypes();
    }
}
