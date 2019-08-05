package lasolutions.stockmanagement.Invoice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository("InvoiceService")
public class InvoiceServiceImplement implements InvoiceService {

    @Autowired
    private InvoiceRepository invoiceRepository;

    @Override
    public InvoiceModel SaveInvoice(String  seller, Double sub_amt, Double disc_amt, Double total_amt){
        return  invoiceRepository.SaveInvoice(seller,sub_amt,disc_amt,total_amt);}

    @Override
    public InvoiceModel getMaxId() {
        return invoiceRepository.getMaxId();
    }
}
