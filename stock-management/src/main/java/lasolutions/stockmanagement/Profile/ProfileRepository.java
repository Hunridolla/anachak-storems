package lasolutions.stockmanagement.Profile;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProfileRepository extends JpaRepository<ProfileModel, String> {
    String getProfiles = "SELECT profile_id, profile_name, remark, inactive FROM sys_profiles";

    @Query(value = getProfiles, nativeQuery = true)
    List<ProfileModel> getProfiles();

    String getProfileById = "SELECT profile_id, profile_name, remark, inactive FROM sys_profiles WHERE profile_id= :profile_id";

    @Query(value = getProfileById, nativeQuery = true)
    ProfileModel getProfileById(@Param("profile_id") String profile_id);

    String getProfileId = "SELECT CONCAT('PRF-' , LPAD(RIGHT(MAX(profile_id),3) + 1,3,0)) as profile_id FROM sys_profiles";

    @Query(value = getProfileId, nativeQuery = true)
    String getProfileId();
}
