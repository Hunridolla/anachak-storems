package lasolutions.stockmanagement.StockType;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "sys_stock_types")
public class StockTypeModel {

    @Id
    @Column(name = "stock_type_id", insertable = false, updatable = false)
    private int stock_type_id;

    @Column(name = "stock_type_name")
    private String stock_type_name;

    @Column(name = "remark")
    private String remark;

    public int getStock_type_id() {
        return stock_type_id;
    }

    public void setStock_type_id(int stock_type_id) {
        this.stock_type_id = stock_type_id;
    }

    public String getStock_type_name() {
        return stock_type_name;
    }

    public void setStock_type_name(String stock_type_name) {
        this.stock_type_name = stock_type_name;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }
}
