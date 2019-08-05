package lasolutions.stockmanagement.Vendor;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface VendorRepository extends JpaRepository<VendorModel, String> {

    String getVendors = "CALL GBL_GET_VENDORS()";
    @Query(value = getVendors, nativeQuery = true)
    List<VendorModel> getVendors();

    String getVendorById = "CALL GBL_SHOW_VENDOR_INFO(:vendor_id)";

    @Query(value = getVendorById, nativeQuery = true)
    VendorModel getVendorById(@Param("vendor_id") String vendor_id);

    String getVendorId = "CALL GBL_GET_VENDOR_ID()";
    @Query(value = getVendorId, nativeQuery = true)
    String getVendorId();
}
