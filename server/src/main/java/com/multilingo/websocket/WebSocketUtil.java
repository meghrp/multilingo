package com.multilingo.websocket;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.util.Objects;

/**
 * Utility class for WebSocket messaging
 */
@Component
public class WebSocketUtil {

    private static final Logger logger = LoggerFactory.getLogger(WebSocketUtil.class);

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    /**
     * Send a message to a specific user
     *
     * @param username Username of the recipient
     * @param destination Destination endpoint
     * @param payload Message payload
     */
    public void sendToUser(String username, String destination, Object payload) {
        Objects.requireNonNull(username, "Username cannot be null");
        Objects.requireNonNull(destination, "Destination cannot be null");
        Objects.requireNonNull(payload, "Payload cannot be null");
        
        if (username.trim().isEmpty()) {
            throw new IllegalArgumentException("Username cannot be empty");
        }
        
        if (destination.trim().isEmpty()) {
            throw new IllegalArgumentException("Destination cannot be empty");
        }
        
        logger.debug("Sending message to user: {} at destination: {}", username, destination);
        messagingTemplate.convertAndSendToUser(username, destination, payload);
    }

    /**
     * Send a message to all users subscribed to a topic
     *
     * @param destination Topic destination
     * @param payload Message payload
     */
    public void sendToTopic(String destination, Object payload) {
        Objects.requireNonNull(destination, "Destination cannot be null");
        Objects.requireNonNull(payload, "Payload cannot be null");
        
        if (destination.trim().isEmpty()) {
            throw new IllegalArgumentException("Destination cannot be empty");
        }
        
        logger.debug("Sending message to topic: {}", destination);
        messagingTemplate.convertAndSend(destination, payload);
    }

    /**
     * Get the currently authenticated user's username
     *
     * @return Username of the authenticated user or null if not authenticated
     */
    public String getCurrentUsername() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            return authentication.getName();
        }
        return null;
    }

    /**
     * Check if the current user is authenticated
     *
     * @return True if authenticated, false otherwise
     */
    public boolean isAuthenticated() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication != null && authentication.isAuthenticated();
    }
} 