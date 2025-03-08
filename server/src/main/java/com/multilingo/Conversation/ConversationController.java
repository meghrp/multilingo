package com.multilingo.Conversation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

/**
 * Controller for conversation-related endpoints.
 */
@RestController
@RequestMapping("/api/v1/conversations")
public class ConversationController {
    private final ConversationService conversationService;
    private final SimpMessagingTemplate messagingTemplate;

    @Autowired
    public ConversationController(
            ConversationService conversationService, SimpMessagingTemplate messagingTemplate) {
        this.conversationService = conversationService;
        this.messagingTemplate = messagingTemplate;
    }

    /**
     * Get a conversation by ID.
     */
    @GetMapping("/{conversationId}")
    public ResponseEntity<Conversation> getConversation(@PathVariable Long conversationId) {
        return ResponseEntity.ok(conversationService.getConversation(conversationId));
    }

    /**
     * Create a new conversation.
     */
    @PostMapping
    public ResponseEntity<Long> createConversation(@RequestBody ConversationRequest request) {
        return ResponseEntity.ok(conversationService.createConversation(request.getUsers()));
    }
    
    /**
     * Get all conversations for a user.
     */
    @GetMapping("/user/{username}")
    public ResponseEntity<List<ConversationDTO>> getUserConversations(@PathVariable String username) {
        return ResponseEntity.ok(conversationService.getUserConversations(username));
    }
    
    /**
     * Add a user to a conversation.
     */
    @PostMapping("/{conversationId}/users")
    public ResponseEntity<Void> addUserToConversation(
            @PathVariable Long conversationId, 
            @RequestBody String username) {
        conversationService.addUserToConversation(conversationId, username);
        return ResponseEntity.ok().build();
    }
    
    /**
     * Request class for creating conversations.
     */
    static class ConversationRequest {
        private Set<String> users;
        private String name;
        private ConversationType type;
        
        public ConversationRequest() {}
        
        public Set<String> getUsers() {
            return users;
        }
        
        public void setUsers(Set<String> users) {
            this.users = users;
        }
        
        public String getName() {
            return name;
        }
        
        public void setName(String name) {
            this.name = name;
        }
        
        public ConversationType getType() {
            return type;
        }
        
        public void setType(ConversationType type) {
            this.type = type;
        }
    }
}
