package lasolutions.stockmanagement.controller;

import com.sun.tools.javac.util.List;
import lasolutions.stockmanagement.Profile.ProfileModel;
import lasolutions.stockmanagement.Profile.ProfileRepository;
import lasolutions.stockmanagement.Profile.ProfileService;
import org.hibernate.validator.constraints.NotEmpty;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.ArrayList;


@Controller
public class ProfileController {
    @Autowired
    private ProfileService profileService;
    private ProfileRepository profileRepository;

    @Autowired
    public ProfileController(ProfileService profileService, ProfileRepository profileRepository) {
        this.profileService = profileService;
        this.profileRepository = profileRepository;
    }

    @RequestMapping(value = "/profiles", method = RequestMethod.GET)
    public ModelAndView showProfiles() {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("profiles");
        modelAndView.addObject("profiles", profileRepository.getProfiles());
        return modelAndView;
    }

    @RequestMapping(value = "/save-profile", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<Object> saveProfile(
            @RequestParam("profile_id") String profile_id,
            @RequestParam("profile_name") String profile_name,
            @RequestParam("remark") String remark,
            @RequestParam("inactive") Boolean inactive) {
        ProfileModel profileModel;
        profileModel = new ProfileModel();
        if (profile_id.isEmpty()) {
            profile_id = profileRepository.getProfileId();
        }
        profileModel.setProfile_id(profile_id);
        profileModel.setProfile_name(profile_name);
        profileModel.setRemark(remark);
        profileModel.setInactive(inactive);
        profileRepository.save(profileModel);
        return new ResponseEntity<>(profileRepository.getProfiles(), HttpStatus.OK);
    }

    @RequestMapping(value = "/profiles/edit/{profile_id}", method = RequestMethod.GET)
    public ResponseEntity<Object> getProfileById(@PathVariable("profile_id") String profile_id) {
        ProfileModel profile = profileService.getProfileById(profile_id);
        return new ResponseEntity<>(profile, HttpStatus.OK);
    }

    @RequestMapping(value = "/profiles/view/{profile_id}", method = RequestMethod.GET)
    public ResponseEntity<Object> viewProfile(@PathVariable("profile_id") String profile_id) {
        ProfileModel profile = profileService.getProfileById(profile_id);
        return new ResponseEntity<>(profile, HttpStatus.OK);
    }

    @RequestMapping (value = "/get-profiles", method = RequestMethod.GET)
    public  ResponseEntity<Object> getProfiles(){
        return new ResponseEntity<>(profileRepository.getProfiles(),HttpStatus.OK);
    }

}
