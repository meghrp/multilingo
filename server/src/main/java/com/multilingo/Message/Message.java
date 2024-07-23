package com.multilingo.Message;

import com.multilingo.Conversation.Conversation;
import com.multilingo.User.User;

import jakarta.persistence.*;

import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.Set;

@Entity
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "sender_id")
    private User sender;

    @ElementCollection private Set<Long> receiverIds;

    @ManyToOne
    @JoinColumn(name = "conversation_id")
    private Conversation conversation;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String content;

    private String translatedContent;

    @Column(nullable = false)
    private String messageLanguage;

    @Column(nullable = false)
    @CreationTimestamp
    private LocalDateTime timeStamp;

    public Message() {}

    public Message(
            Long id,
            User sender,
            Set<Long> receiverIds,
            Conversation conversation,
            String content,
            String translatedContent,
            String messageLanguage,
            LocalDateTime timeStamp) {
        this.id = id;
        this.sender = sender;
        this.receiverIds = receiverIds;
        this.conversation = conversation;
        this.content = content;
        this.translatedContent = translatedContent;
        this.messageLanguage = messageLanguage;
        this.timeStamp = timeStamp;
    }

    public Message(
            User sender,
            Set<Long> receiverIds,
            String content,
            Conversation conversation,
            String translatedContent,
            String messageLanguage,
            LocalDateTime timeStamp) {
        this.sender = sender;
        this.receiverIds = receiverIds;
        this.conversation = conversation;
        this.content = content;
        this.translatedContent = translatedContent;
        this.messageLanguage = messageLanguage;
        this.timeStamp = timeStamp;
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

    public Set<Long> getReceiverIds() {
        return receiverIds;
    }

    public void setReceiverIds(Set<Long> receiverIds) {
        this.receiverIds = receiverIds;
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

    public LocalDateTime getTimeStamp() {
        return timeStamp;
    }

    public void setTimeStamp(LocalDateTime timeStamp) {
        this.timeStamp = timeStamp;
    }
}
