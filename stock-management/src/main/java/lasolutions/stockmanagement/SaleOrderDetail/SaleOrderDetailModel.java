package lasolutions.stockmanagement.SaleOrderDetail;

import javax.persistence.*;

@Entity
@Table(name = "tbl_sale_order_details")
public class SaleOrderDetailModel {
    public  SaleOrderDetailModel(){

    }
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "sale_order_id")
    private String sale_order_id;

    @Column(name = "item_id")
    private String item_id;

    @Column (name = "item_name")
    private String item_name;

    @Column (name = "qty")
    private  int qty;

    @Column (name = "rate")
    private float rate;

    @Column (name = "disc_amt")
    private float disc_amt;

    @Column (name = "sub_amt")
    private float sub_amt;

    @Column (name = "total_amt")
    private float total_amt;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getSale_order_id() {
        return sale_order_id;
    }

    public void setSale_order_id(String sale_order_id) {
        this.sale_order_id = sale_order_id;
    }

    public String getItem_id() {
        return item_id;
    }

    public void setItem_id(String item_id) {
        this.item_id = item_id;
    }

    public String getItem_name() {
        return item_name;
    }

    public void setItem_name(String item_name) {
        this.item_name = item_name;
    }

    public int getQty() {
        return qty;
    }

    public void setQty(int qty) {
        this.qty = qty;
    }

    public float getRate() {
        return rate;
    }

    public void setRate(float rate) {
        this.rate = rate;
    }

    public float getDisc_amt() {
        return disc_amt;
    }

    public void setDisc_amt(float disc_amt) {
        this.disc_amt = disc_amt;
    }

    public float getSub_amt() {
        return sub_amt;
    }

    public void setSub_amt(float sub_amt) {
        this.sub_amt = sub_amt;
    }

    public float getTotal_amt() {
        return total_amt;
    }

    public void setTotal_amt(float total_amt) {
        this.total_amt = total_amt;
    }
}
