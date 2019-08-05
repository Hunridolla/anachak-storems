package lasolutions.stockmanagement.Receipt;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository("ReceiptService")
public class ReceiptServiceImplement implements ReceiptService {

    @Autowired
    private ReceiptRepository receiptRepository;

    @Override
    public ReceiptModel getMaxId() {
        return receiptRepository.getMaxId();
    }
}
