package com.multilingo.Message;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.multilingo.Conversation.Conversation;
import com.multilingo.User.User;
import com.multilingo.common.BaseEntity;

import jakarta.persistence.*;

import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

/**
 * Entity representing a message in a conversation.
 */
@Entity
@Table(name = "messages", indexes = {
    @Index(name = "idx_messages_conversation", columnList = "conversation_id"),
    @Index(name = "idx_messages_sender", columnList = "sender_id")
})
public class Message extends BaseEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "sender_id", nullable = false)
    @JsonIgnoreProperties({"email", "password", "conversations", "createdAt", "updatedAt", "deleted"})
    private User sender;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "conversation_id", nullable = false)
    @JsonIgnoreProperties({"users", "messages", "createdAt", "updatedAt", "deleted"})
    private Conversation conversation;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;

    @Column(name = "translated_content", columnDefinition = "TEXT")
    private String translatedContent;

    @Column(name = "message_language", nullable = false)
    private String messageLanguage;

    @Column(name = "message_type", nullable = false)
    @Enumerated(EnumType.STRING)
    private MessageType messageType = MessageType.TEXT;

    @Column(name = "sent_at", nullable = false)
    private LocalDateTime sentAt;

    @Column(nullable = false)
    private boolean read = false;

    @Column(name = "translation_status", nullable = false)
    @Enumerated(EnumType.STRING)
    private TranslationStatus translationStatus = TranslationStatus.PENDING;

    public Message() {
    }

    public Message(User sender, Conversation conversation, String content, String messageLanguage) {
        this.sender = sender;
        this.conversation = conversation;
        this.content = content;
        this.messageLanguage = messageLanguage;
        this.sentAt = LocalDateTime.now();
    }

    public Message(
            User sender,
            Conversation conversation,
            String content,
            String translatedContent,
            String messageLanguage,
            MessageType messageType) {
        this.sender = sender;
        this.conversation = conversation;
        this.content = content;
        this.translatedContent = translatedContent;
        this.messageLanguage = messageLanguage;
        this.messageType = messageType;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getSender() {
        return sender;
    }

    public void setSender(User sender) {
        this.sender = sender;
    }

    public Conversation getConversation() {
        return conversation;
    }

    public void setConversation(Conversation conversation) {
        this.conversation = conversation;
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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Message message = (Message) o;
        return getId() != null && getId().equals(message.getId());
    }

    @Override
    public int hashCode() {
        return getId() != null ? getId().hashCode() : 0;
    }

    @Override
    public String toString() {
        return "Message{" +
                "id=" + id +
                ", sender=" + sender.getUsername() +
                ", conversation=" + conversation.getId() +
                ", messageType=" + messageType +
                ", translationStatus=" + translationStatus +
                ", sentAt=" + sentAt +
                '}';
    }
}
