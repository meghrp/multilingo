package com.multilingo.Conversation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * Controller for conversation operations.
 */
@RestController
@RequestMapping("/api/v1/conversations")
public class ConversationController {
    
    private final ConversationService conversationService;
    
    @Autowired
    public ConversationController(ConversationService conversationService) {
        this.conversationService = conversationService;
    }
    
    /**
     * Get a conversation by ID.
     * 
     * @param conversationId The ID of the conversation
     * @return The conversation
     */
    @GetMapping("/{conversationId}")
    public ResponseEntity<Conversation> getConversation(@PathVariable Long conversationId) {
        return conversationService.getConversation(conversationId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    /**
     * Create a new conversation.
     * 
     * @param request The conversation request
     * @return The ID of the created conversation
     */
    @PostMapping
    public ResponseEntity<Long> createConversation(@RequestBody ConversationRequest request) {
        return ResponseEntity.ok(conversationService.createConversationFromUserIds(
                request.getUsers().stream().map(Long::valueOf).collect(Collectors.toList())
        ));
    }
    
    /**
     * Get all conversations for the authenticated user.
     * 
     * @param authentication The authentication object
     * @return The conversations
     */
    @GetMapping
    public ResponseEntity<List<Conversation>> getUserConversations(Authentication authentication) {
        String username = authentication.getName();
        return ResponseEntity.ok(conversationService.getUserConversations(username));
    }
    
    /**
     * Add a user to a conversation.
     * 
     * @param conversationId The ID of the conversation
     * @param username The username of the user to add
     * @return No content
     */
    @PostMapping("/{conversationId}/users/{username}")
    public ResponseEntity<Void> addUserToConversation(@PathVariable Long conversationId, @PathVariable String username) {
        conversationService.addUserToConversation(conversationId, username);
        return ResponseEntity.noContent().build();
    }
    
    /**
     * Request object for creating a conversation.
     */
    public static class ConversationRequest {
        private Set<String> users;
        
        public ConversationRequest() {
        }
        
        public Set<String> getUsers() {
            return users;
        }
        
        public void setUsers(Set<String> users) {
            this.users = users;
        }
    }
}
