package com.multilingo.config;

import com.multilingo.security.CustomUserDetailsService;
import com.multilingo.security.JwtTokenUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

/**
 * WebSocket security configuration to implement JWT authentication for WebSockets
 */
@Configuration
@EnableWebSocketMessageBroker
@Order(Ordered.HIGHEST_PRECEDENCE + 99)
public class WebSocketSecurityConfig implements WebSocketMessageBrokerConfigurer {

    private static final Logger logger = LoggerFactory.getLogger(WebSocketSecurityConfig.class);

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        // Endpoints are already registered in WebSocketConfig
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        // Message broker is already configured in WebSocketConfig
    }

    @Override
    public void configureClientInboundChannel(ChannelRegistration registration) {
        registration.interceptors(new ChannelInterceptor() {
            @Override
            public Message<?> preSend(Message<?> message, MessageChannel channel) {
                StompHeaderAccessor accessor = MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);

                if (accessor != null && StompCommand.CONNECT.equals(accessor.getCommand())) {
                    logger.debug("Processing WebSocket CONNECT command");
                    
                    // Extract JWT token from headers
                    String authorizationHeader = accessor.getFirstNativeHeader("Authorization");
                    String jwt = null;

                    if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
                        jwt = authorizationHeader.substring(7);
                        logger.debug("JWT token found in Authorization header");
                    } else {
                        // Try to get token from session attributes (for SockJS fallback)
                        Object sessionToken = accessor.getSessionAttributes() != null ? 
                                accessor.getSessionAttributes().get("token") : null;
                        
                        if (sessionToken != null) {
                            jwt = sessionToken.toString();
                            logger.debug("JWT token found in session attributes");
                        }
                    }

                    if (jwt != null) {
                        try {
                            String username = jwtTokenUtil.extractUsername(jwt);
                            
                            if (username != null) {
                                logger.debug("Extracted username from JWT: {}", username);
                                UserDetails userDetails = userDetailsService.loadUserByUsername(username);
                                
                                if (jwtTokenUtil.validateToken(jwt, userDetails)) {
                                    logger.debug("JWT token is valid for user: {}", username);
                                    UsernamePasswordAuthenticationToken authentication = 
                                        new UsernamePasswordAuthenticationToken(
                                            userDetails, null, userDetails.getAuthorities());
                                    
                                    accessor.setUser(authentication);
                                    logger.debug("Authentication set for WebSocket connection");
                                } else {
                                    logger.warn("Invalid JWT token for user: {}", username);
                                }
                            }
                        } catch (Exception e) {
                            logger.error("Error validating JWT token", e);
                        }
                    } else {
                        logger.warn("No JWT token found in WebSocket connection request");
                    }
                }
                
                return message;
            }
        });
    }
} 