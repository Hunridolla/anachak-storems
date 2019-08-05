package lasolutions.stockmanagement.VendorType;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("VendorTypeService")
public class VendorTypeServiceImplement implements VendorTypeService {

    @Override
    public List<VendorTypeModel> getVendorTypes() {
        return vendorTypeRepository.getVendorTypes();
    }

    @Override
    public VendorTypeModel getVendorTypeById(String vendor_type_id) {
        return vendorTypeRepository.getVendorTypeById(vendor_type_id);
    }

    @Override
    public String getVendorTypeId() {
        return getVendorTypeId();
    }

    @Autowired
    private VendorTypeRepository vendorTypeRepository;

}
