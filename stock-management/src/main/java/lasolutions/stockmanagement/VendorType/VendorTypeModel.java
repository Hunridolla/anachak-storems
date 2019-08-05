package lasolutions.stockmanagement.VendorType;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "tbl_vendor_types")
public class VendorTypeModel {

    @Id
    @Column(name = "vendor_type_id", insertable = false, updatable = false)
    private String vendor_type_id;

    @Column(name = "vendor_type_name")
    private String vendor_type_name;

    @Column(name = "remark")
    private String remark;

    @Column(name = "inactive")
    private boolean inactive;

    public VendorTypeModel() {

    }

    public String getVendor_type_id() {
        return vendor_type_id;
    }

    public void setVendor_type_id(String vendor_type_id) {
        this.vendor_type_id = vendor_type_id;
    }

    public String getVendor_type_name() {
        return vendor_type_name;
    }

    public void setVendor_type_name(String vendor_type_name) {
        this.vendor_type_name = vendor_type_name;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public boolean isInactive() {
        return inactive;
    }

    public void setInactive(boolean inactive) {
        this.inactive = inactive;
    }
}
