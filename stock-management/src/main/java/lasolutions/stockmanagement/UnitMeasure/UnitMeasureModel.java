package lasolutions.stockmanagement.UnitMeasure;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "tbl_unit_measures")
public class UnitMeasureModel {

    @Id
    @Column(name = "unit_measure_id", insertable = false, updatable = false)
    private String unit_measure_id;

    @Column(name = "unit_measure_name")
    private String unit_measure_name;

    @Column(name = "remark")
    private String remark;

    @Column(name = "inactive")
    private boolean inactive;

    public String getUnit_measure_id() {
        return unit_measure_id;
    }

    public void setUnit_measure_id(String unit_measure_id) {
        this.unit_measure_id = unit_measure_id;
    }

    public String getUnit_measure_name() {
        return unit_measure_name;
    }

    public void setUnit_measure_name(String unit_measure_name) {
        this.unit_measure_name = unit_measure_name;
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
}
