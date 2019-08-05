package lasolutions.stockmanagement.Item;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ItemService {
    public List<ItemModel> getItems();
    public ItemModel getItemById(String item_id);
    public List<ItemModel> getItemByCat(String cat_id);
}
