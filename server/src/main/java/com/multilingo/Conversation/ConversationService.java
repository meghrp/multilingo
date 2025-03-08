package com.multilingo.Conversation;

import com.multilingo.User.User;
import com.multilingo.User.UserRepository;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * Service for handling conversation operations.
 */
@Service
public class ConversationService {

    private final ConversationRepository conversationRepository;
    private final UserRepository userRepository;

    @Autowired
    public ConversationService(
            ConversationRepository conversationRepository, UserRepository userRepository) {
        this.conversationRepository = conversationRepository;
        this.userRepository = userRepository;
    }

    /**
     * Creates a new conversation with the given user IDs.
     *
     * @param userIds The IDs of the users to include in the conversation
     * @return The ID of the created conversation
     */
    @Transactional
    public Long createConversationFromUserIds(List<Long> userIds) {
        List<User> users = userRepository.findAllById(userIds);
        if (users.size() < 2) {
            throw new IllegalArgumentException(
                    "At least two users are required to create a conversation");
        }
        Set<User> userSet = new HashSet<>(users);
        Conversation conversation = new Conversation(userSet);
        
        // Set name for group conversations
        if (users.size() > 2) {
            conversation.setName("Group Chat");
        }
        
        conversationRepository.save(conversation);
        return conversation.getId();
    }

    /**
     * Creates a new named conversation with the given user IDs.
     *
     * @param name The name of the conversation
     * @param userIds The IDs of the users to include in the conversation
     * @return The ID of the created conversation
     */
    @Transactional
    public Long createNamedConversationFromUserIds(String name, List<Long> userIds) {
        List<User> users = userRepository.findAllById(userIds);
        if (users.size() < 2) {
            throw new IllegalArgumentException(
                    "At least two users are required to create a conversation");
        }
        Set<User> userSet = new HashSet<>(users);
        Conversation conversation = new Conversation(name, userSet);
        conversationRepository.save(conversation);
        return conversation.getId();
    }

    /**
     * Gets a conversation by ID.
     *
     * @param id The ID of the conversation
     * @return The conversation
     */
    public Optional<Conversation> getConversation(Long id) {
        return conversationRepository.findConversationById(id);
    }
    
    /**
     * Gets all conversations for a user.
     *
     * @param username The username of the user
     * @return The conversations
     */
    public List<Conversation> getUserConversations(String username) {
        User user = userRepository.findUserByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        return conversationRepository.findByUsers(user);
    }
    
    /**
     * Adds a user to a conversation.
     *
     * @param conversationId The ID of the conversation
     * @param username The username of the user
     */
    @Transactional
    public void addUserToConversation(Long conversationId, String username) {
        Conversation conversation = conversationRepository.findConversationById(conversationId)
                .orElseThrow(() -> new IllegalArgumentException("Conversation not found"));
        
        User user = userRepository.findUserByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        
        conversation.addUser(user);
        conversationRepository.save(conversation);
    }
}
