package com.multilingo.Message;

import java.time.LocalDateTime;

/**
 * DTO for Message to be used in WebSocket communication
 */
public class MessageDTO {
    private Long id;
    private Long senderId;
    private String senderUsername;
    private Long conversationId;
    private String content;
    private String translatedContent;
    private String messageLanguage;
    private MessageType messageType;
    private LocalDateTime sentAt;
    private boolean read;
    private TranslationStatus translationStatus;

    public MessageDTO() {
    }

    public MessageDTO(Message message) {
        this.id = message.getId();
        if (message.getSender() != null) {
            this.senderId = message.getSender().getId();
            this.senderUsername = message.getSender().getUsername();
        }
        if (message.getConversation() != null) {
            this.conversationId = message.getConversation().getId();
        }
        this.content = message.getContent();
        this.translatedContent = message.getTranslatedContent();
        this.messageLanguage = message.getMessageLanguage();
        this.messageType = message.getMessageType();
        this.sentAt = message.getSentAt();
        this.read = message.isRead();
        this.translationStatus = message.getTranslationStatus();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getSenderId() {
        return senderId;
    }

    public void setSenderId(Long senderId) {
        this.senderId = senderId;
    }

    public String getSenderUsername() {
        return senderUsername;
    }

    public void setSenderUsername(String senderUsername) {
        this.senderUsername = senderUsername;
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

    public String getTranslatedContent() {
        return translatedContent;
    }

    public void setTranslatedContent(String translatedContent) {
        this.translatedContent = translatedContent;
    }

    public String getMessageLanguage() {
        return messageLanguage;
    }

    public void setMessageLanguage(String messageLanguage) {
        this.messageLanguage = messageLanguage;
    }

    public MessageType getMessageType() {
        return messageType;
    }

    public void setMessageType(MessageType messageType) {
        this.messageType = messageType;
    }

    public LocalDateTime getSentAt() {
        return sentAt;
    }

    public void setSentAt(LocalDateTime sentAt) {
        this.sentAt = sentAt;
    }

    public boolean isRead() {
        return read;
    }

    public void setRead(boolean read) {
        this.read = read;
    }

    public TranslationStatus getTranslationStatus() {
        return translationStatus;
    }

    public void setTranslationStatus(TranslationStatus translationStatus) {
        this.translationStatus = translationStatus;
    }
} 