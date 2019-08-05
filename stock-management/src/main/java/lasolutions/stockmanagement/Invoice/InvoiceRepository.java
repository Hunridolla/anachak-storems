package lasolutions.stockmanagement.Invoice;

import lasolutions.stockmanagement.Item.ItemModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface InvoiceRepository extends JpaRepository<InvoiceModel, String> {
    String SaveInvoice = "CALL SAVE_INVOICE(:seller, :sub_amt, :disc_amt, :total_amt)";
    @Query(value = SaveInvoice, nativeQuery = true)
    InvoiceModel SaveInvoice(@Param("seller") String seller,
                                @Param("sub_amt") Double sub_amt,
                                @Param("disc_amt") Double disc_amt,
                                @Param("total_amt") Double total_amt);

    String getMaxId = "CALL GBL_GET_MAX_INV_ID";
    @Query(value = getMaxId,nativeQuery = true)
    InvoiceModel getMaxId();
}
