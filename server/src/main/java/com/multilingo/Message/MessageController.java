package com.multilingo.Message;

import com.multilingo.User.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controller for message-related endpoints.
 */
@RestController
@RequestMapping("/api/v1/messages")
public class MessageController {
    private final MessageService messageService;

    @Autowired
    public MessageController(MessageService messageService) {
        this.messageService = messageService;
    }

    /**
     * Endpoint for sending a message.
     */
    @PostMapping("/send")
    public ResponseEntity<Message> sendMessage(@RequestBody MessageRequest request) {
        return ResponseEntity.ok(messageService.sendMessage(
                request.getSender(), 
                request.getConversationId(), 
                request.getContent(),
                request.getMessageType()
        ));
    }
    
    /**
     * Endpoint for getting messages for a conversation.
     */
    @GetMapping("/conversation/{conversationId}")
    public ResponseEntity<List<Message>> getMessagesForConversation(@PathVariable Long conversationId) {
        return ResponseEntity.ok(messageService.getMessagesForConversation(conversationId));
    }
    
    /**
     * Endpoint for marking a message as read.
     */
    @PostMapping("/{messageId}/read")
    public ResponseEntity<Void> markAsRead(@PathVariable Long messageId, @RequestBody User user) {
        messageService.markAsRead(messageId, user);
        return ResponseEntity.ok().build();
    }
    
    /**
     * Request class for sending messages.
     */
    static class MessageRequest {
        private User sender;
        private Long conversationId;
        private String content;
        private MessageType messageType;
        
        public MessageRequest() {}
        
        public User getSender() {
            return sender;
        }
        
        public void setSender(User sender) {
            this.sender = sender;
        }
        
        public Long getConversationId() {
            return conversationId;
        }
        
        public void setConversationId(Long conversationId) {
            this.conversationId = conversationId;
        }
        
        public String getContent() {
            return content;
        }
        
        public void setContent(String content) {
            this.content = content;
        }
        
        public MessageType getMessageType() {
            return messageType;
        }
        
        public void setMessageType(MessageType messageType) {
            this.messageType = messageType;
        }
    }
}
