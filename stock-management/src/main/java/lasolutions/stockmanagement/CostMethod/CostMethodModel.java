package lasolutions.stockmanagement.CostMethod;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "sys_cost_methods")
public class CostMethodModel {

    @Id
    @Column(name = "cost_method_id", insertable = false, updatable = false)
    private int cost_method_id;

    @Column(name = "cost_method_name")
    private String cost_method_name;

    @Column(name = "remark")
    private String remark;

    public int getCost_method_id() {
        return cost_method_id;
    }

    public void setCost_method_id(int cost_method_id) {
        this.cost_method_id = cost_method_id;
    }

    public String getCost_method_name() {
        return cost_method_name;
    }

    public void setCost_method_name(String cost_method_name) {
        this.cost_method_name = cost_method_name;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }
}
