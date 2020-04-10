package lasolutions.stockmanagement.Invoice;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Date;

@Entity
@Table(name = "tbl_invoices")
public class InvoiceModel {
    public InvoiceModel() {

    }
    @Id
    @Column(name = "inv_id", insertable = false, updatable = false)
    private String inv_id;

    @Column(name = "inv_date")
    private Date inv_date;

    @Column(name = "customer_id")
    private String customer_id;

    @Column(name = "seller")
    private String seller;

    @Column(name = "ship_date")
    private Date ship_date;

    @Column(name = "ship_to")
    private String ship_to;

    @Column(name = "remark")
    private String remark;

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

    public String getInv_id() {
        return inv_id;
    }

    public void setInv_id(String inv_id) {
        this.inv_id = inv_id;
    }

    public Date getInv_date() {
        return inv_date;
    }

    public void setInv_date(Date inv_date) {
        this.inv_date = inv_date;
    }

    public String getCustomer_id() {
        return customer_id;
    }

    public void setCustomer_id(String customer_id) {
        this.customer_id = customer_id;
    }

    public String getSeller() {
        return seller;
    }

    public void setSeller(String seller) {
        this.seller = seller;
    }

    public Date getShip_date() {
        return ship_date;
    }

    public void setShip_date(Date ship_date) {
        this.ship_date = ship_date;
    }

    public String getShip_to() {
        return ship_to;
    }

    public void setShip_to(String ship_to) {
        this.ship_to = ship_to;
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
