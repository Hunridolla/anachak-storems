package lasolutions.stockmanagement.PurchaseOrder;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Date;

@Entity
@Table(name = "tbl_purchase_orders")
public class PurchaseOrderModel {
    public PurchaseOrderModel(){

    }
    @Id
    @Column(name = "purchase_id", insertable = false, updatable = false)
    private  String purchase_id;

    @Column(name = "purchase_date")
    private Date purchase_date;

    @Column(name = "vendor_id")
    private String vendor_id;

    @Column(name = "ref_no")
    private String ref_no;

    @Column(name = "remark")
    private String remark;

    @Column(name = "address")
    private String address;

    @Column(name = "sub_amt")
    private float sub_amt;

    @Column(name = "disc_amt")
    private float disc_amt;

    @Column(name = "total_amt")
    private float total_amt;

    @Column(name = "inactive")
    private boolean inactive;

    @Column(name = "inactive_date")
    private Date inactive_date;

    public String getPurchase_id() {
        return purchase_id;
    }

    public void setPurchase_id(String purchase_id) {
        this.purchase_id = purchase_id;
    }

    public Date getPurchase_date() {
        return purchase_date;
    }

    public void setPurchase_date(Date purchase_date) {
        this.purchase_date = purchase_date;
    }

    public String getVendor_id() {
        return vendor_id;
    }

    public void setVendor_id(String vendor_id) {
        this.vendor_id = vendor_id;
    }

    public String getRef_no() {
        return ref_no;
    }

    public void setRef_no(String ref_no) {
        this.ref_no = ref_no;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public float getSub_amt() {
        return sub_amt;
    }

    public void setSub_amt(float sub_amt) {
        this.sub_amt = sub_amt;
    }

    public float getDisc_amt() {
        return disc_amt;
    }

    public void setDisc_amt(float disc_amt) {
        this.disc_amt = disc_amt;
    }

    public float getTotal_amt() {
        return total_amt;
    }

    public void setTotal_amt(float total_amt) {
        this.total_amt = total_amt;
    }

    public boolean isInactive() {
        return inactive;
    }

    public void setInactive(boolean inactive) {
        this.inactive = inactive;
    }

    public Date getInactive_date() {
        return inactive_date;
    }

    public void setInactive_date(Date inactive_date) {
        this.inactive_date = inactive_date;
    }
}
