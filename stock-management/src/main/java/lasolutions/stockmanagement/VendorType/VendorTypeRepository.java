package lasolutions.stockmanagement.VendorType;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface VendorTypeRepository extends JpaRepository<VendorTypeModel, String> {

    String getVendorTypes = "CALL GBL_GET_VENDOR_TYPES()";
    @Query(value = getVendorTypes, nativeQuery = true)
    List<VendorTypeModel> getVendorTypes();

    String getVendorTypeById = "CALL GBL_SHOW_VENDOR_TYPE_INFO(:vendor_type_id)";
    @Query(value = getVendorTypeById, nativeQuery = true)
    VendorTypeModel getVendorTypeById(@Param("vendor_type_id") String vendor_type_id);

    String getVendorTypeId = "CALL GBL_GET_VENDOR_TYPE_ID()";
    @Query(value = getVendorTypeId, nativeQuery = true)
    String getVendorTypeId();
}
