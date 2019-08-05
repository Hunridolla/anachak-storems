package lasolutions.stockmanagement.Vendor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("VendorService")
public class VendorServiceImplement implements VendorService {

    @Override
    public List<VendorModel> getVendors() {

        return vendorRepository.getVendors();
    }

    @Override
    public VendorModel getVendorById(String vendor_id) {
        return vendorRepository.getVendorById(vendor_id);
    }

    @Override
    public String getVendorId() {
        return vendorRepository.getVendorId();
    }

    @Autowired
    private VendorRepository vendorRepository;
}
