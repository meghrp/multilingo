package com.multilingo;

import com.multilingo.Conversation.ConversationService;
import com.multilingo.User.User;
import com.multilingo.User.UserRepository;
import com.multilingo.User.UserRole;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

@SpringBootApplication
public class MultilingoApplication {

    public static void main(String[] args) {
        SpringApplication.run(MultilingoApplication.class, args);
    }

    @Bean
    public CommandLineRunner demo(UserRepository userRepository, 
                                  ConversationService conversationService,
                                  PasswordEncoder passwordEncoder) {
        return args -> {
            // Create some users if none exist
            if (userRepository.count() == 0) {
                User user1 = new User(
                        "testuser", 
                        "Test User", 
                        "test@example.com", 
                        passwordEncoder.encode("password"), 
                        "en");
                
                User user2 = new User(
                        "testuser2", 
                        "Test User 2", 
                        "test2@example.com", 
                        passwordEncoder.encode("password"), 
                        "es");
                
                User adminUser = new User(
                        "admin", 
                        "Admin User", 
                        "admin@example.com", 
                        passwordEncoder.encode("password"), 
                        "en",
                        UserRole.ADMIN);
                
                userRepository.saveAll(Arrays.asList(user1, user2, adminUser));
                
                // Create a conversation between these users
                conversationService.createConversationFromUserIds(
                        Arrays.asList(user1.getId(), user2.getId()));
            }
        };
    }
}
