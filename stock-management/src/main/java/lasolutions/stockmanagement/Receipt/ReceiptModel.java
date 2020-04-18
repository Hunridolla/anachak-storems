package lasolutions.stockmanagement.Receipt;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Date;

@Entity
@Table(name = "tbl_receipts")
public class ReceiptModel {
    public ReceiptModel() {
    }
    @Id
    @Column(name = "receipt_id", insertable = false, updatable = false)
    private String receipt_id;

    @Column(name = "receipt_date")
    private Date receipt_date;

    @Column(name = "customer_id")
    private String customer_id;

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

    public String getReceipt_id() {
        return receipt_id;
    }

    public void setReceipt_id(String receipt_id) {
        this.receipt_id = receipt_id;
    }

    public Date getReceipt_date() {
        return receipt_date;
    }

    public void setReceipt_date(Date receipt_date) {
        this.receipt_date = receipt_date;
    }

    public String getCustomer_id() {
        return customer_id;
    }

    public void setCustomer_id(String customer_id) {
        this.customer_id = customer_id;
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
