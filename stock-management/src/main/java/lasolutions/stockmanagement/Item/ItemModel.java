package lasolutions.stockmanagement.Item;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "tbl_items")
public class ItemModel {

    @Id
    @Column(name = "item_id", insertable = false, updatable = false)
    private String item_id;

    @Column(name = "stock_type")
    private String stock_type;

    @Column(name = "item_name")
    private String item_name;

    @Column(name = "category_id")
    private String category_id;

    @Column(name = "um")
    private String um;

    @Column(name = "cost_method")
    private String cost_method;

    @Column(name = "cost")
    private double cost;

    @Column(name = "sale_price")
    private double sale_price;

    @Column(name = "prefered_supplier")
    private String prefered_supplier;

    @Column(name = "min_balance")
    private Integer min_balance;

    @Column(name = "max_balance")
    private Integer max_balance;

    @Column(name = "barcode")
    private String barcode;

    @Column(name = "remark")
    private String remark;

    @Column(name = "inactive")
    private boolean inactive;

    public ItemModel() {

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

    public String getCategory_id() {
        return category_id;
    }

    public void setCategory_id(String category_id) {
        this.category_id = category_id;
    }

    public String getUM() {
        return um;
    }

    public void setUM(String UM) {
        this.um = UM;
    }

    public String getCost_method() {
        return cost_method;
    }

    public void setCost_method(String cost_method) {
        this.cost_method = cost_method;
    }

    public double getCost() {
        return cost;
    }

    public void setCost(double cost) {
        this.cost = cost;
    }

    public double getSale_price() {
        return sale_price;
    }

    public void setSale_price(double sale_price) {
        this.sale_price = sale_price;
    }

    public String getPrefered_supplier() {
        return prefered_supplier;
    }

    public void setPrefered_supplier(String prefered_supplier) {
        this.prefered_supplier = prefered_supplier;
    }

    public Integer getMin_balance() {
        return min_balance;
    }

    public void setMin_balance(Integer min_balance) {
        this.min_balance = min_balance;
    }

    public Integer getMax_balance() {
        return max_balance;
    }

    public void setMax_balance(Integer max_balance) {
        this.max_balance = max_balance;
    }

    public String getBarcode() {
        return barcode;
    }

    public void setBarcode(String barcode) {
        this.barcode = barcode;
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

    public String getStock_type() {
        return stock_type;
    }

    public void setStock_type(String stock_type) {
        this.stock_type = stock_type;
    }
}

