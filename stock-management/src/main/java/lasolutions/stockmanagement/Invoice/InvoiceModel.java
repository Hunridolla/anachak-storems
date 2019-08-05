package lasolutions.stockmanagement.Invoice;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "tbl_invoices")
public class InvoiceModel {
    @Id
    @Column(name = "inv_id", insertable = false, updatable = false)
    private String inv_id;

    @Column(name = "inv_date")
    private String inv_date;

    @Column(name = "customer_id")
    private String customer_id;

    @Column(name = "seller")
    private String seller;

    @Column(name = "ship_date")
    private String ship_date;

    @Column(name = "ship_to")
    private String ship_to;

    @Column(name = "remark")
    private Double remark;

    @Column(name = "sub_amt")
    private Double sub_amt;

    @Column(name = "disc_amt")
    private Double disc_amt;

    @Column(name = "total_amt")
    private Double total_amt;

    @Column(name = "inactive")
    private Integer inactive;

    @Column(name = "inactive_date")
    private String inactive_date;


    public InvoiceModel() {
        this.inv_id = inv_id;
        this.inv_date = inv_date;
        this.customer_id = customer_id;
        this.seller = seller;
        this.ship_date = ship_date;
        this.ship_to = ship_to;
        this.remark = remark;
        this.sub_amt = sub_amt;
        this.disc_amt = disc_amt;
        this.total_amt = total_amt;
        this.inactive = inactive;
        this.inactive_date = inactive_date;
    }

    public String getInv_id() {
        return inv_id;
    }

    public void setInv_id(String inv_id) {
        this.inv_id = inv_id;
    }

    public String getInv_date() {
        return inv_date;
    }

    public void setInv_date(String inv_date) {
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

    public String getShip_date() {
        return ship_date;
    }

    public void setShip_date(String ship_date) {
        this.ship_date = ship_date;
    }

    public String getShip_to() {
        return ship_to;
    }

    public void setShip_to(String ship_to) {
        this.ship_to = ship_to;
    }

    public Double getRemark() {
        return remark;
    }

    public void setRemark(Double remark) {
        this.remark = remark;
    }

    public Double getSub_amt() {
        return sub_amt;
    }

    public void setSub_amt(Double sub_amt) {
        this.sub_amt = sub_amt;
    }

    public Double getDisc_amt() {
        return disc_amt;
    }

    public void setDisc_amt(Double disc_amt) {
        this.disc_amt = disc_amt;
    }

    public Double getTotal_amt() {
        return total_amt;
    }

    public void setTotal_amt(Double total_amt) {
        this.total_amt = total_amt;
    }

    public Integer getInactive() {
        return inactive;
    }

    public void setInactive(int inactive) {
        this.inactive = inactive;
    }

    public String getInactive_date() {
        return inactive_date;
    }

    public void setInactive_date(String inactive_date) {
        this.inactive_date = inactive_date;
    }
}
