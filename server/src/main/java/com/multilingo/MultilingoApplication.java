package com.multilingo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class MultilingoApplication {

    public static void main(String[] args) {
        SpringApplication.run(MultilingoApplication.class, args);
    }

    // @Bean
    // public CommandLineRunner demo(UserRepository userRepository, 
    //                               ConversationService conversationService,
    //                               PasswordEncoder passwordEncoder) {
    //     return args -> {
    //         // Create some users if none exist
    //         if (userRepository.count() == 0) {
    //             User user1 = new User(
    //                     "testuser", 
    //                     "Test User", 
    //                     "test@example.com", 
    //                     passwordEncoder.encode("password"), 
    //                     "en");
                
    //             User user2 = new User(
    //                     "testuser2", 
    //                     "Test User 2", 
    //                     "test2@example.com", 
    //                     passwordEncoder.encode("password"), 
    //                     "es");
                
    //             User adminUser = new User(
    //                     "admin", 
    //                     "Admin User", 
    //                     "admin@example.com", 
    //                     passwordEncoder.encode("password"), 
    //                     "en",
    //                     UserRole.ADMIN);
                
    //             userRepository.saveAll(Arrays.asList(user1, user2, adminUser));
                
    //             // Create a conversation between these users
    //             conversationService.createConversationFromUserIds(
    //                     Arrays.asList(user1.getId(), user2.getId()));
    //         }
    //     };
    // }
}
