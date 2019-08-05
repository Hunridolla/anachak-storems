package lasolutions.stockmanagement.Bill;

import com.sun.javafx.beans.IDProperty;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "tbl_bills")
public class BillModel {

    @Id
    @Column(name = "bill_id", insertable = false, updatable = false)
    private String bill_id;

    @Column(name = "bill_date")
    private Date bill_date;

    @Column(name = "bill_due")
    private Date bill_due;

    @Column(name = "vendor_id")
    private  String vendor_id;

    @Column (name = "ref_no")
    private String ref_no;

    @Column (name = "remark")
    private String remark;

    @Column (name = "address")
    private String address;

    @Column (name = "sub_amt")
    private float sub_amt;

    @Column (name = "disc_amt")
    private float disc_amt;

    @Column (name = "total_amt")
    private float total_amt;

    @Column (name = "inactive")
    private boolean inactive;

    @Column (name = "inactive_date")
    private  Date inactive_date;

    public BillModel(){

    }

    public String getBill_id() {
        return bill_id;
    }

    public void setBill_id(String bill_id) {
        this.bill_id = bill_id;
    }

    public Date getBill_date() {
        return bill_date;
    }

    public void setBill_date(Date bill_date) {
        this.bill_date = bill_date;
    }

    public Date getBill_due() {
        return bill_due;
    }

    public void setBill_due(Date bill_due) {
        this.bill_due = bill_due;
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

    public void setInactive(boolean inaction) {
        this.inactive = inaction;
    }

    public Date getInactive_date() {
        return inactive_date;
    }

    public void setInactive_date(Date inactive_date) {
        this.inactive_date = inactive_date;
    }
}
