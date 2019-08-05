package lasolutions.stockmanagement.VendorType;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface VendorTypeRepository extends JpaRepository<VendorTypeModel, String> {

    String getVendorTypes = "SELECT vendor_type_id, vendor_type_name, remark, inactive FROM tbl_vendor_types";

    @Query(value = getVendorTypes, nativeQuery = true)
    List<VendorTypeModel> getVendorTypes();

    String getVendorTypeById = "SELECT vendor_type_id, vendor_type_name, remark, inactive FROM tbl_vendor_types WHERE vendor_type_id= :vendor_type_id";

    @Query(value = getVendorTypeById, nativeQuery = true)
    VendorTypeModel getVendorTypeById(@Param("vendor_type_id") String vendor_type_id);

    String getVendorTypeId = "SELECT CONCAT('T-' , LPAD(RIGHT(MAX(vendor_type_id),3) + 1,3,0)) as vendor_type_id FROM tbl_vendor_types";

    @Query(value = getVendorTypeId, nativeQuery = true)
    String getVendorTypeId();
}
