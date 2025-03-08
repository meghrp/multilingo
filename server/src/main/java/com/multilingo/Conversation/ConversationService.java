package com.multilingo.Conversation;

import com.multilingo.User.User;
import com.multilingo.User.UserRepository;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

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
     * Creates a new conversation with the specified users.
     *
     * @param users Set of usernames to include in the conversation
     * @return ID of the created conversation
     */
    @Transactional
    public Long createConversation(Set<String> users) {
        Set<User> usersSet = new HashSet<>();
        for (String username : users) {
            usersSet.add(
                    userRepository
                            .findUserByUsername(username)
                            .orElseThrow(
                                    () ->
                                            new IllegalArgumentException(
                                                    "User with username "
                                                            + username
                                                            + " not found")));
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

    /**
     * Gets a conversation by ID.
     *
     * @param conversationId ID of the conversation to retrieve
     * @return The conversation
     */
    public Conversation getConversation(Long conversationId) {
        return conversationRepository.findConversationById(conversationId)
                .orElseThrow(() -> new IllegalArgumentException("Conversation not found"));
    }
    
    /**
     * Gets all conversations for a user.
     *
     * @param username Username of the user
     * @return List of conversation DTOs
     */
    public List<ConversationDTO> getUserConversations(String username) {
        User user = userRepository.findUserByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        
        List<ConversationDTO> conversationDTOs = new ArrayList<>();
        for (Conversation conversation : user.getConversations()) {
            if (!conversation.isDeleted()) {
                ConversationDTO dto = new ConversationDTO();
                dto.setId(conversation.getId());
                dto.setType(conversation.getType());
                dto.setName(conversation.getName());
                dto.setLastMessageAt(conversation.getLastMessageAt());
                conversationDTOs.add(dto);
            }
        }
        
        return conversationDTOs;
    }
    
    /**
     * Adds a user to a conversation.
     *
     * @param conversationId ID of the conversation
     * @param username Username of the user to add
     */
    @Transactional
    public void addUserToConversation(Long conversationId, String username) {
        Conversation conversation = conversationRepository.findConversationById(conversationId)
                .orElseThrow(() -> new IllegalArgumentException("Conversation not found"));
        
        User user = userRepository.findUserByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        
        // Check if this is a private conversation
        if (conversation.getType() == ConversationType.PRIVATE) {
            throw new IllegalArgumentException("Cannot add users to a private conversation");
        }
        
        // Add the user to the conversation
        conversation.addUser(user);
        conversationRepository.save(conversation);
    }
}
