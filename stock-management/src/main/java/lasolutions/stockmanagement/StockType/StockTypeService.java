package lasolutions.stockmanagement.StockType;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface StockTypeService {
    public List<StockTypeModel> getStockTypes();
}
