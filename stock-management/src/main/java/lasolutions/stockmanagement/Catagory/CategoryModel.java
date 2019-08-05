package lasolutions.stockmanagement.Catagory;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "tbl_categories")
public class CategoryModel {

    @Id
    @Column(name = "category_id", insertable = false, updatable = false)
    private String category_id;

    @Column(name = "category_name")
    private String category_name;

    @Column(name = "remark")
    private String remark;

    @Column(name = "inactive")
    private boolean inactive;

    public CategoryModel() {

    }

    public String getCategory_id() {
        return category_id;
    }

    public void setCategory_id(String category_id) {
        this.category_id = category_id;
    }

    public String getCategory_name() {
        return category_name;
    }

    public void setCategory_name(String category_name) {
        this.category_name = category_name;
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
