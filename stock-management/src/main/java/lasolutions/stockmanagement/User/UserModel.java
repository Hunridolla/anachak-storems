package lasolutions.stockmanagement.User;

import lasolutions.stockmanagement.Profile.ProfileModel;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Set;

@Entity
@Table(name = "sys_users")
@NamedStoredProcedureQueries({
        @NamedStoredProcedureQuery(name = "getUserById",
                procedureName = "FI_SV_GET_USER_BY_ID",
                resultClasses = UserModel.class)
})
public class UserModel implements Serializable {
    @Id
    @Column(name = "user_id", insertable = false, updatable = false)
    private String user_id;

    @Column(name = "user_name")
    private String user_name;

    @Column(name = "login_name")
    private String login_name;

    @Column(name = "password")
    private String password;

    @Column(name = "profile_id")
    private String profile_id;

    @Column(name = "remark")
    private String remark;

    @Column(name = "inactive")
    private boolean inactive;

    @Column(name = "pwd_expiry")
    private boolean pwd_expiry;

    public UserModel() {

    }

    public String getUser_id() {
        return user_id;
    }

    public void setUser_id(String user_id) {
        this.user_id = user_id;
    }

    public String getUser_name() {
        return user_name;
    }

    public void setUser_name(String user_name) {
        this.user_name = user_name;
    }

    public String getLogin_name() {
        return login_name;
    }

    public void setLogin_name(String login_name) {
        this.login_name = login_name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getProfile_id() {
        return profile_id;
    }

    public void setProfile_id(String profile_id) {
        this.profile_id = profile_id;
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

    public boolean isPwd_expiry() {
        return pwd_expiry;
    }

    public void setPwd_expiry(boolean pwd_expiry) {
        this.pwd_expiry = pwd_expiry;
    }
}
