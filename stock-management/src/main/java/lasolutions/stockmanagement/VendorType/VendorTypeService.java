package lasolutions.stockmanagement.VendorType;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface VendorTypeService {
    public List<VendorTypeModel> getVendorTypes();

    public VendorTypeModel getVendorTypeById(String vendor_type_id);

    public String getVendorTypeId();

}
