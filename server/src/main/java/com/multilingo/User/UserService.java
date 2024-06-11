package com.multilingo.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public UserDTO registerUser(UserRegistrationDTO user) {
        if (userRepository.existsUserByUsername(user.username())) {
            throw new IllegalStateException("username taken");
        }
        if (userRepository.existsUserByEmail(user.email())) {
            throw new IllegalStateException("email taken");
        }
        User newUser = new User(user.name(), user.email(), user.username(), passwordEncoder.encode(user.password()), user.preferredLanguage());
        userRepository.save(newUser);

        return new UserDTO(newUser.getId(), newUser.getUsername(), newUser.getName(), newUser.getEmail(), newUser.getPreferredLanguage());
    }

    public UserDTO findUserByUsername(String username) {
        return userRepository.findUserByUsername(username)
                .map(user -> new UserDTO(user.getId(), user.getUsername(), user.getName(), user.getEmail(), user.getPreferredLanguage()))
                .orElse(null);
    }
}
