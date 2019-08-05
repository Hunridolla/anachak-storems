package lasolutions.stockmanagement.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<UserModel, String> {


    String getUsers = "CALL FI_SV_GET_USERS";

    @Query(value = getUsers, nativeQuery = true)
    List<UserModel> getUsers();

    String getUserById = "SELECT a.user_id,a.user_name,a.login_name,a.password,a.profile_id,a.remark,a.inactive," +
            "a.pwd_expiry FROM sys_users a inner join sys_profiles b on a.profile_id = b.profile_id WHERE a.user_id= :user_id";

    @Query(value = getUserById, nativeQuery = true)
    UserModel getUserById(@Param("user_id") String user_id);


    String getUserId = "CALL FI_SV_GET_USER_ID";

    @Query(value = getUserId, nativeQuery = true)
    String getUserId();

}
