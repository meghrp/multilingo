package com.multilingo.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import jakarta.transaction.Transactional;

/**
 * Service for user-related operations
 */
@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    /**
     * Register a user with DTO
     * 
     * @param user Registration DTO
     * @return User DTO
     */
    @Transactional
    public UserDTO registerUser(UserRegistrationDTO user) {
        if (userRepository.existsUserByUsername(user.username())) {
            throw new IllegalStateException("username taken");
        }
        if (userRepository.existsUserByEmail(user.email())) {
            throw new IllegalStateException("email taken");
        }
        User newUser =
                new User(
                        user.username(),
                        user.name(),
                        user.email(),
                        passwordEncoder.encode(user.password()),
                        user.preferredLanguage());
        userRepository.save(newUser);

        return convertToDTO(newUser);
    }

    /**
     * Register a user with individual fields
     * 
     * @param username Username
     * @param name Full name
     * @param email Email address
     * @param password Password (will be encoded)
     * @param preferredLanguage Preferred language
     * @return User entity
     */
    @Transactional
    public User registerUser(String username, String name, String email, String password, String preferredLanguage) {
        if (userRepository.existsUserByUsername(username)) {
            throw new IllegalArgumentException("Username is already taken");
        }
        if (userRepository.existsUserByEmail(email)) {
            throw new IllegalArgumentException("Email is already taken");
        }
        
        User newUser = new User(
                username,
                name,
                email,
                passwordEncoder.encode(password),
                preferredLanguage);
        
        return userRepository.save(newUser);
    }

    /**
     * Find a user by username and return as DTO
     * 
     * @param username Username to find
     * @return User DTO or null if not found
     */
    public UserDTO findUserByUsername(String username) {
        return userRepository
                .findUserByUsername(username)
                .map(this::convertToDTO)
                .orElse(null);
    }
    
    /**
     * Get a user by username
     * 
     * @param username Username to find
     * @return User entity
     * @throws IllegalArgumentException if user not found
     */
    public User getUserByUsername(String username) {
        return userRepository.findUserByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
    }
    
    /**
     * Convert a User entity to UserDTO
     * 
     * @param user User entity
     * @return User DTO
     */
    public UserDTO convertToDTO(User user) {
        return new UserDTO(
                user.getId(),
                user.getUsername(),
                user.getName(),
                user.getEmail(),
                user.getPreferredLanguage());
    }
}
