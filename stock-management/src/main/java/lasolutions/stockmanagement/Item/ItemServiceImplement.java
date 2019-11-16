package lasolutions.stockmanagement.Item;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("ItemService")
public class ItemServiceImplement implements ItemService {

    @Autowired
    private ItemRepository itemRepository;

    @Override
    public List<ItemModel> getItems() {
        return itemRepository.getItems();
    }

    @Override
    public  ItemModel getItemById(String item_id){
        return itemRepository.getItemById(item_id);
    }

    @Override
    public ItemModel getItemByBarcode(String barcode) {
        return itemRepository.getItemByBarcode(barcode);
    }

    @Override
    public  List<ItemModel> getItemByCat(String  cat_id){return  itemRepository.getItemByCat(cat_id);}
}
