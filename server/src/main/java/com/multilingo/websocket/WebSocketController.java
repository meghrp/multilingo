package com.multilingo.websocket;

import com.multilingo.Message.Message;
import com.multilingo.Message.MessageDTO;
import com.multilingo.Message.MessageService;
import com.multilingo.Message.MessageType;
import com.multilingo.User.User;
import com.multilingo.User.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;

/**
 * Simplified controller for handling WebSocket messages
 */
@Controller
public class WebSocketController {

    @Autowired
    private MessageService messageService;

    @Autowired
    private UserService userService;

    /**
     * Handle chat messages sent via WebSocket
     */
    @MessageMapping("/chat.sendMessage")
    public MessageDTO sendMessage(@Payload ChatMessage chatMessage, SimpMessageHeaderAccessor headerAccessor) {
        Authentication authentication = (Authentication) headerAccessor.getUser();
        if (authentication != null && authentication.isAuthenticated()) {
            String username = authentication.getName();
            User sender = userService.getUserByUsername(username);
            
            Message message = messageService.sendMessage(
                    sender,
                    chatMessage.getConversationId(),
                    chatMessage.getContent(),
                    chatMessage.getMessageType()
            );
            
            return new MessageDTO(message);
        } else {
            throw new IllegalStateException("User not authenticated");
        }
    }

    /**
     * Handle message read status updates
     */
    @MessageMapping("/chat.markRead")
    public void markMessageAsRead(@Payload ReadStatus readStatus, SimpMessageHeaderAccessor headerAccessor) {
        Authentication authentication = (Authentication) headerAccessor.getUser();
        if (authentication != null && authentication.isAuthenticated()) {
            String username = authentication.getName();
            User user = userService.getUserByUsername(username);
            messageService.markAsRead(readStatus.getMessageId(), user);
        } else {
            throw new IllegalStateException("User not authenticated");
        }
    }

    /**
     * Chat message DTO
     */
    public static class ChatMessage {
        private Long conversationId;
        private String content;
        private MessageType messageType;

        public ChatMessage() {
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

    /**
     * Read status DTO
     */
    public static class ReadStatus {
        private Long messageId;

        public ReadStatus() {
        }

        public Long getMessageId() {
            return messageId;
        }

        public void setMessageId(Long messageId) {
            this.messageId = messageId;
        }
    }
} 