package com.multilingo.websocket;

import com.multilingo.Message.MessageDTO;
import com.multilingo.Message.MessageStatusUpdate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Simplified utility for sending WebSocket messages
 */
@Component
public class WebSocketUtil {

    private final SimpMessagingTemplate messagingTemplate;

    @Autowired
    public WebSocketUtil(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    /**
     * Send a message to a specific user
     *
     * @param username The username of the recipient
     * @param message The message to send
     */
    public void sendMessageToUser(String username, MessageDTO message) {
        messagingTemplate.convertAndSendToUser(
                username,
                "/queue/messages",
                message
        );
    }

    /**
     * Send a status update to a specific user
     *
     * @param username The username of the recipient
     * @param statusUpdate The status update to send
     */
    public void sendMessageToUser(String username, MessageStatusUpdate statusUpdate) {
        messagingTemplate.convertAndSendToUser(
                username,
                "/queue/status",
                statusUpdate
        );
    }

    /**
     * Send a message to multiple users
     *
     * @param usernames List of usernames to send to
     * @param message The message to send
     */
    public void sendMessageToUsers(List<String> usernames, MessageDTO message) {
        usernames.forEach(username -> sendMessageToUser(username, message));
    }

    /**
     * Send a message to a topic (for group conversations)
     *
     * @param topicId The ID of the topic (usually conversation ID)
     * @param message The message to send
     */
    public void sendMessageToTopic(Long topicId, MessageDTO message) {
        messagingTemplate.convertAndSend(
                "/topic/conversation." + topicId,
                message
        );
    }
} 