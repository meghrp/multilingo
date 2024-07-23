package com.multilingo.Conversation;

import com.multilingo.User.User;
import com.multilingo.User.UserRepository;

import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class ConversationService {

    private final ConversationRepository conversationRepository;
    private final UserRepository userRepository;

    public ConversationService(
            ConversationRepository conversationRepository, UserRepository userRepository) {
        this.conversationRepository = conversationRepository;
        this.userRepository = userRepository;
    }

    public Long createConversation(Set<String> users) {
        Set<User> usersSet = new HashSet<>();
        for (String username : users) {
            usersSet.add(userRepository.findUserByUsername(username).orElseThrow());
        }
        if (usersSet.size() < 2) {
            throw new IllegalArgumentException(
                    "At least two users are required to create a conversation");
        }
        Conversation conversation =
                new Conversation(
                        usersSet,
                        (users.size() > 2) ? ConversationType.GROUP : ConversationType.PRIVATE);
        conversationRepository.save(conversation);
        return conversation.getId();
    }

    public Conversation getConversation(Long conversationId) {
        return conversationRepository.findConversationById(conversationId).orElseThrow();
    }
}
