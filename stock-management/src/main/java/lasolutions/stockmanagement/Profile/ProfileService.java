package lasolutions.stockmanagement.Profile;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ProfileService {
    List<ProfileModel> getProfiles();

    ProfileModel getProfileById(String profile_id);

    String getProfileId();
}
