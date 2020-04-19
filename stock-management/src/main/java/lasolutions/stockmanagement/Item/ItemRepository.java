package lasolutions.stockmanagement.Item;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ItemRepository extends JpaRepository<ItemModel, String> {

    String getItems = "CALL GBL_GET_ITEMS()";
    @Query(value = getItems, nativeQuery = true)
    List<ItemModel> getItems();

    String getItemById = "CALL GBL_SHOW_ITEM_INFO(:item_id)";
    @Query(value = getItemById, nativeQuery = true)
    ItemModel getItemById(@Param("item_id") String item_id);

    String getItemByBarcode = "CALL GBL_SHOW_ITEM_BY_BARCODE(:barcode)";
    @Query(value = getItemByBarcode,nativeQuery = true)
    ItemModel getItemByBarcode (@Param("barcode") String barcode);

    String getItemByCat = "CALL GBL_SHOW_ITEM_INFO_BY_CAT(:cat_id)";
    @Query(value = getItemByCat, nativeQuery = true)
    List<ItemModel> getItemByCat(@Param("cat_id") String cat_id);

}
