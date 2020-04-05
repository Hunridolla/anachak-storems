package lasolutions.stockmanagement.SaleOrder;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Date;

@Entity
@Table(name = "tbl_sale_orders")
public class SaleOrderModel {
    public  SaleOrderModel(){

    }
    @Id
    @Column(name = "sale_order_id", insertable = false, updatable = false)
    private String sale_order_id;

    @Column(name = "sale_order_date")
    private Date sale_order_date;

    @Column(name = "customer_id")
    private String customer_id;

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

    public String getSale_order_id() {
        return sale_order_id;
    }

    public void setSale_order_id(String sale_order_id) {
        this.sale_order_id = sale_order_id;
    }

    public Date getSale_order_date() {
        return sale_order_date;
    }

    public void setSale_order_date(Date sale_order_date) {
        this.sale_order_date = sale_order_date;
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
