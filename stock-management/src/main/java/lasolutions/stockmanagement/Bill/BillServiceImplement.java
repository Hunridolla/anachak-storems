package lasolutions.stockmanagement.Bill;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository("BillService")
public class BillServiceImplement implements BillService {


    @Override
    public String getBillID() {
        return billRepository.getGetBillID();
    }

    @Autowired
    private BillRepository billRepository;
}
