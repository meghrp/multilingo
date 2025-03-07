package com.multilingo.websocket;

import com.multilingo.Message.Message;
import com.multilingo.Message.MessageService;
import com.multilingo.Message.MessageType;
import com.multilingo.User.User;
import com.multilingo.User.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;

/**
 * Controller for handling WebSocket messages
 */
@Controller
public class WebSocketController {

    private static final Logger logger = LoggerFactory.getLogger(WebSocketController.class);

    @Autowired
    private MessageService messageService;

    @Autowired
    private UserService userService;

    @Autowired
    private WebSocketUtil webSocketUtil;

    /**
     * Handle chat messages sent via WebSocket
     *
     * @param chatMessage The chat message
     * @param headerAccessor Header accessor for getting authentication
     * @return The sent message
     */
    @MessageMapping("/chat.sendMessage")
    public Message sendMessage(@Payload ChatMessage chatMessage, SimpMessageHeaderAccessor headerAccessor) {
        if (headerAccessor == null) {
            logger.warn("Header accessor is null");
            throw new IllegalStateException("Header accessor is null");
        }
        
        Authentication authentication = (Authentication) headerAccessor.getUser();
        if (authentication != null && authentication.isAuthenticated()) {
            String username = authentication.getName();
            logger.debug("Received message from {}: {}", username, chatMessage.getContent());
            
            User sender = userService.getUserByUsername(username);
            return messageService.sendMessage(
                    sender,
                    chatMessage.getConversationId(),
                    chatMessage.getContent(),
                    chatMessage.getMessageType()
            );
        } else {
            logger.warn("Unauthenticated message received");
            throw new IllegalStateException("User not authenticated");
        }
    }

    /**
     * Handle message read status updates
     *
     * @param readStatus The read status update
     * @param headerAccessor Header accessor for getting authentication
     */
    @MessageMapping("/chat.markRead")
    public void markMessageAsRead(@Payload ReadStatus readStatus, SimpMessageHeaderAccessor headerAccessor) {
        if (headerAccessor == null) {
            logger.warn("Header accessor is null");
            throw new IllegalStateException("Header accessor is null");
        }
        
        Authentication authentication = (Authentication) headerAccessor.getUser();
        if (authentication != null && authentication.isAuthenticated()) {
            String username = authentication.getName();
            logger.debug("Marking message {} as read by {}", readStatus.getMessageId(), username);
            
            User user = userService.getUserByUsername(username);
            messageService.markAsRead(readStatus.getMessageId(), user);
        } else {
            logger.warn("Unauthenticated read status update received");
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