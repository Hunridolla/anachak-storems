package lasolutions.stockmanagement.Invoice;

import org.springframework.stereotype.Service;

@Service
public interface InvoiceService {
//    public InvoiceModel SaveInvoice(String seller, Double sub_amt, Double disc_amt, Double total_amt);
    String getInvoiceId();
}
