package com.multilingo.Message;

import com.multilingo.Conversation.Conversation;
import com.multilingo.Conversation.ConversationRepository;
import com.multilingo.User.User;
import com.multilingo.websocket.WebSocketUtil;

import jakarta.transaction.Transactional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

/**
 * Service for handling message operations.
 */
@Service
public class MessageService {
    private static final Logger logger = LoggerFactory.getLogger(MessageService.class);
    
    private final MessageRepository messageRepository;
    private final ConversationRepository conversationRepository;
    private final WebSocketUtil webSocketUtil;

    @Autowired
    public MessageService(
            MessageRepository messageRepository, 
            ConversationRepository conversationRepository,
            WebSocketUtil webSocketUtil) {
        this.messageRepository = messageRepository;
        this.conversationRepository = conversationRepository;
        this.webSocketUtil = webSocketUtil;
    }

    /**
     * Sends a message to a conversation and handles translation for all participants.
     *
     * @param sender The user sending the message
     * @param conversationId The ID of the conversation
     * @param content The message content
     * @param messageType The type of message (default: TEXT)
     * @return The saved message
     */
    @Transactional
    public Message sendMessage(User sender, Long conversationId, String content, MessageType messageType) {
        if (sender == null) {
            throw new IllegalArgumentException("Sender cannot be null");
        }
        
        if (conversationId == null) {
            throw new IllegalArgumentException("Conversation ID cannot be null");
        }
        
        if (content == null || content.trim().isEmpty()) {
            throw new IllegalArgumentException("Message content cannot be null or empty");
        }
        
        Conversation conversation = conversationRepository
                .findConversationById(conversationId)
                .orElseThrow(() -> new IllegalArgumentException("Conversation not found"));

        Message message = new Message();
        message.setSender(sender);
        message.setConversation(conversation);
        message.setContent(content);
        message.setMessageLanguage(sender.getPreferredLanguage());
        message.setMessageType(messageType != null ? messageType : MessageType.TEXT);
        message.setSentAt(LocalDateTime.now());

        // Save the message
        message = messageRepository.save(message);
        
        // Update the conversation's lastMessageAt timestamp
        conversation.setLastMessageAt(message.getSentAt());
        conversationRepository.save(conversation);

        // Process translations for all participants
        processTranslations(message, conversation, sender);

        return message;
    }

    /**
     * Overloaded method for sending a text message.
     */
    @Transactional
    public Message sendMessage(User sender, Long conversationId, String content) {
        return sendMessage(sender, conversationId, content, MessageType.TEXT);
    }

    /**
     * Process translations for all participants in the conversation.
     */
    private void processTranslations(Message message, Conversation conversation, User sender) {
        Objects.requireNonNull(message, "Message cannot be null");
        Objects.requireNonNull(conversation, "Conversation cannot be null");
        Objects.requireNonNull(sender, "Sender cannot be null");
        
        for (User participant : conversation.getUsers()) {
            if (participant == null) {
                logger.warn("Null participant found in conversation {}", conversation.getId());
                continue;
            }
            
            if (!participant.equals(sender)) {
                try {
                    // Translate the message for this participant
                    String translatedContent = translateContent(
                            message.getContent(),
                            message.getMessageLanguage(),
                            participant.getPreferredLanguage()
                    );
                    
                    // Create a message DTO with the translated content for this user
                    MessageDTO translatedMessageDTO = new MessageDTO(message);
                    translatedMessageDTO.setTranslatedContent(translatedContent);
                    translatedMessageDTO.setTranslationStatus(TranslationStatus.COMPLETED);
                    
                    // Send the translated message to the participant using WebSocketUtil
                    webSocketUtil.sendMessageToUser(
                            participant.getUsername(), 
                            translatedMessageDTO
                    );
                } catch (Exception e) {
                    logger.error("Translation failed for message: {}", message.getId(), e);
                    
                    // Create a message DTO with failed translation status
                    MessageDTO failedMessageDTO = new MessageDTO(message);
                    failedMessageDTO.setTranslatedContent(message.getContent());
                    failedMessageDTO.setTranslationStatus(TranslationStatus.FAILED);
                    
                    webSocketUtil.sendMessageToUser(
                            participant.getUsername(), 
                            failedMessageDTO
                    );
                }
            }
        }
    }

    /**
     * Translates content from source language to target language.
     * This is a placeholder for actual translation service integration.
     */
    private String translateContent(String content, String sourceLanguage, String targetLanguage) {
        if (content == null) {
            throw new IllegalArgumentException("Content cannot be null");
        }
        
        if (sourceLanguage == null) {
            throw new IllegalArgumentException("Source language cannot be null");
        }
        
        if (targetLanguage == null) {
            throw new IllegalArgumentException("Target language cannot be null");
        }
        
        // If languages are the same, no translation needed
        if (sourceLanguage.equals(targetLanguage)) {
            return content;
        }
        
        // TODO: Implement actual translation using a translation service API
        // This is a placeholder - in a real implementation, you would call a translation API
        return "Translated: " + content + " (from " + sourceLanguage + " to " + targetLanguage + ")";
    }

    /**
     * Marks a message as read by a user.
     */
    @Transactional
    public void markAsRead(Long messageId, User user) {
        if (messageId == null) {
            throw new IllegalArgumentException("Message ID cannot be null");
        }
        
        if (user == null) {
            throw new IllegalArgumentException("User cannot be null");
        }
        
        Message message = messageRepository.findById(messageId)
                .orElseThrow(() -> new IllegalArgumentException("Message not found"));
        
        // Check if the user is a participant in the conversation
        if (message.getConversation().getUsers().contains(user)) {
            message.setRead(true);
            messageRepository.save(message);
            
            // Notify other participants that the message has been read
            for (User participant : message.getConversation().getUsers()) {
                if (participant != null && !participant.equals(user)) {
                    webSocketUtil.sendMessageToUser(
                            participant.getUsername(),
                            new MessageStatusUpdate(message.getId(), true)
                    );
                }
            }
        }
    }

    /**
     * Gets all messages for a conversation.
     */
    public List<Message> getMessagesForConversation(Long conversationId) {
        if (conversationId == null) {
            throw new IllegalArgumentException("Conversation ID cannot be null");
        }
        
        return messageRepository.findByConversationIdOrderBySentAtAsc(conversationId);
    }
}
