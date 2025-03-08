package com.multilingo;

import com.multilingo.Conversation.ConversationRepository;
import com.multilingo.Conversation.ConversationService;
import com.multilingo.User.User;
import com.multilingo.User.UserRepository;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;

import java.util.HashSet;
import java.util.Set;

@SpringBootApplication
public class MultilingoApplication {

    public static void main(String[] args) {
        ApplicationContext context = SpringApplication.run(MultilingoApplication.class, args);

        UserRepository userRepository = context.getBean(UserRepository.class);
        ConversationRepository conversationRepository =
                context.getBean(ConversationRepository.class);
        ConversationService conversationService = context.getBean(ConversationService.class);

        // Create a user
        User user = new User();
        User user2 = new User();
        user.setName("John Doe");
        user.setEmail("a@b.com");
        user.setUsername("a");
        user.setPassword("123");
        user.setPreferredLanguage("en");
        user2.setName("Jane Doe");
        user2.setEmail("b@a.com");
        user2.setUsername("b");
        user2.setPassword("123");
        user2.setPreferredLanguage("en");
        userRepository.save(user);
        userRepository.save(user2);

        Set<String> users = new HashSet<>();
        users.add("a");
        users.add("b");
        conversationService.createConversation(users);
    }
}
