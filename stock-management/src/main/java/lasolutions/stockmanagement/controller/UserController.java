package lasolutions.stockmanagement.controller;

import lasolutions.stockmanagement.Profile.ProfileService;
import lasolutions.stockmanagement.User.UserModel;
import lasolutions.stockmanagement.User.UserRepository;
import lasolutions.stockmanagement.User.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;


@Controller
public class UserController {

    @Autowired
    private UserRepository userRepository;
    private UserService userService;
    private ProfileService profileService;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
        return bCryptPasswordEncoder;
    }

    @Autowired
    public UserController(UserRepository userRepository, UserService userService, ProfileService profileService) {
        this.userRepository = userRepository;
        this.userService = userService;
        this.profileService = profileService;
    }

    @RequestMapping(value = "/users", method = RequestMethod.GET)
    public ModelAndView users() {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("users");
        modelAndView.addObject("users", userRepository.getUsers());
        modelAndView.addObject("profiles", profileService.getProfiles());
        return modelAndView;
    }

    @RequestMapping(value = "/save-user", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<Object> saveUser(
            @RequestParam("user_id") String user_id,
            @RequestParam("user_name") String user_name,
            @RequestParam("login_name") String login_name,
            @RequestParam("password") String password,
            @RequestParam("profile_id") String profile_id,
            @RequestParam("remark") String remark,
            @RequestParam("inactive") boolean inactive,
            @RequestParam("pwd_expiry") boolean pwd_expiry
    ) {
        UserModel userModel;
        userModel = new UserModel();
        if (user_id.isEmpty()) {
            user_id = userRepository.getUserId();
            userModel.setPassword(bCryptPasswordEncoder.encode(password));
        } else {
            UserModel existUserModel = userRepository.getUserById(user_id);
            userModel.setPassword(existUserModel.getPassword());
        }
        userModel.setUser_id(user_id);
        userModel.setUser_name(user_name);
        userModel.setLogin_name(login_name);
        userModel.setProfile_id(profile_id);
        userModel.setRemark(remark);
        userModel.setInactive(inactive);
        userModel.setPwd_expiry(pwd_expiry);
        userRepository.save(userModel);
        return new ResponseEntity<>(userRepository.getUsers(), HttpStatus.OK);
    }

    @RequestMapping(value = "/users/edit/{user_id}", method = RequestMethod.GET)
    public ResponseEntity<Object> getUserById(@PathVariable("user_id") String user_id) {
        UserModel userModel = userService.getUserById(user_id);
        return new ResponseEntity<>(userModel, HttpStatus.OK);
    }

    @RequestMapping(value = "/users/view/{user_id}", method = RequestMethod.GET)
    public ResponseEntity<Object> viewUser(@PathVariable("user_id") String user_id) {
        UserModel userModel = userService.getUserById(user_id);
        return new ResponseEntity<>(userModel, HttpStatus.OK);
    }
}
