package lasolutions.stockmanagement.PayBill;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Date;

@Entity
@Table(name = "tbl_payments")
public class PayBillModel {
    public PayBillModel(){

    }
    @Id
    @Column(name = "paid_id", insertable = false, updatable = false)
    private String paid_id;

    @Column(name = "paid_date")
    private Date paid_date;

    @Column(name = "vendor_id")
    private String vendor_id;

    @Column(name = "ref_no")
    private String ref_no;

    @Column(name = "remark")
    private String remark;

    @Column(name = "sub_amt")
    private float sub_amt;

    @Column(name = "disc_amt")
    private float disc_amt;

    @Column(name = "total_amt")
    private float total_amt;

    public String getPaid_id() {
        return paid_id;
    }

    public void setPaid_id(String paid_id) {
        this.paid_id = paid_id;
    }

    public Date getPaid_date() {
        return paid_date;
    }

    public void setPaid_date(Date paid_date) {
        this.paid_date = paid_date;
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
}

