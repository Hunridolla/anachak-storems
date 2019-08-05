package lasolutions.stockmanagement.Vendor;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface VendorService {
    String getVendorId();
    List<VendorModel> getVendors();
    VendorModel getVendorById(String vendor_id);
}

