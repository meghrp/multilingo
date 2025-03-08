package com.multilingo.Message;

/**
 * DTO for message status updates via WebSocket
 */
public class MessageStatusUpdate {
    private Long messageId;
    private boolean read;
    
    public MessageStatusUpdate() {
    }
    
    public MessageStatusUpdate(Long messageId, boolean read) {
        this.messageId = messageId;
        this.read = read;
    }
    
    public Long getMessageId() {
        return messageId;
    }
    
    public void setMessageId(Long messageId) {
        this.messageId = messageId;
    }
    
    public boolean isRead() {
        return read;
    }
    
    public void setRead(boolean read) {
        this.read = read;
    }
} 