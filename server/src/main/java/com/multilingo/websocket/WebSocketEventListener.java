package com.multilingo.websocket;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

/**
 * Event listener for WebSocket connection events
 */
@Component
public class WebSocketEventListener {

    private static final Logger logger = LoggerFactory.getLogger(WebSocketEventListener.class);

    @Autowired
    private SimpMessageSendingOperations messagingTemplate;

    /**
     * Handle WebSocket connection events
     *
     * @param event The connection event
     */
    @EventListener
    public void handleWebSocketConnectListener(SessionConnectedEvent event) {
        if (event == null || event.getMessage() == null) {
            logger.warn("Received null event or message in handleWebSocketConnectListener");
            return;
        }
        
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
        if (headerAccessor == null) {
            logger.warn("Failed to wrap message with StompHeaderAccessor");
            return;
        }
        
        Authentication authentication = (Authentication) headerAccessor.getUser();
        
        if (authentication != null && authentication.isAuthenticated()) {
            String username = authentication.getName();
            logger.info("User connected: {}", username);
            
            // You could notify other users or update online status here
        }
    }

    /**
     * Handle WebSocket disconnection events
     *
     * @param event The disconnection event
     */
    @EventListener
    public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
        if (event == null || event.getMessage() == null) {
            logger.warn("Received null event or message in handleWebSocketDisconnectListener");
            return;
        }
        
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
        if (headerAccessor == null) {
            logger.warn("Failed to wrap message with StompHeaderAccessor");
            return;
        }
        
        Authentication authentication = (Authentication) headerAccessor.getUser();
        
        if (authentication != null && authentication.isAuthenticated()) {
            String username = authentication.getName();
            logger.info("User disconnected: {}", username);
            
            // You could notify other users or update online status here
            // For example, broadcast a user left message to relevant conversations
            // messagingTemplate.convertAndSend("/topic/public", new ChatMessage(...));
        }
    }
} 