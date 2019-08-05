package lasolutions.stockmanagement.User;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface UserService {
    public List<UserModel> getUsers();

    public UserModel getUserById(String user_id);

    public String getUserId();
}
