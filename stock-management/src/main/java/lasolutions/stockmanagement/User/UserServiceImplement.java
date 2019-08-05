package lasolutions.stockmanagement.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("UserService")
public class UserServiceImplement implements UserService {
    @Autowired
    private UserRepository userRepository;

    @Override
    public List<UserModel> getUsers() {
        return userRepository.getUsers();
    }

    @Override
    public UserModel getUserById(String user_id) {
        return userRepository.getUserById(user_id);
    }

    @Override
    public String getUserId() {
        return userRepository.getUserId();
    }
}
