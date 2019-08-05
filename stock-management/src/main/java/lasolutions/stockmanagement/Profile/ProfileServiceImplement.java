package lasolutions.stockmanagement.Profile;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("ProfileService")
public class ProfileServiceImplement implements ProfileService {
    @Autowired
    private ProfileRepository profileRepository;

    @Override
    public List<ProfileModel> getProfiles() {
        return profileRepository.getProfiles();
    }

    @Override
    public ProfileModel getProfileById(String profile_id) {
        return profileRepository.getProfileById(profile_id);
    }

    @Override
    public String getProfileId() {
        return profileRepository.getProfileId();
    }
}
