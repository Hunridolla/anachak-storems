package lasolutions.stockmanagement.Profile;


import lasolutions.stockmanagement.User.UserModel;

import javax.persistence.*;
import java.util.Set;


@Entity
@Table(name = "sys_profiles")
public class ProfileModel {

    @Id
    @Column(name = "profile_id", insertable = false, updatable = false)
    private String profile_id;

    @Column(name = "profile_name")
    private String profile_name;

    @Column(name = "remark")
    private String remark;

    @Column(name = "inactive")
    private boolean inactive;

    public ProfileModel() {

    }

    public String getProfile_id() {
        return profile_id;
    }

    public void setProfile_id(String profile_id) {
        this.profile_id = profile_id;
    }

    public String getProfile_name() {
        return profile_name;
    }

    public void setProfile_name(String profile_name) {
        this.profile_name = profile_name;
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
