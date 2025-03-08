package com.multilingo.Conversation;

import com.multilingo.Message.Message;
import com.multilingo.User.UserDTO;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

/**
 * Data Transfer Object for Conversation entity.
 */
public class ConversationDTO {
    private Long id;
    private String name;
    private ConversationType type;
    private LocalDateTime lastMessageAt;
    private Set<UserDTO> users = new HashSet<>();
    private Set<Message> messages = new HashSet<>();
    
    public ConversationDTO() {}
    
    public ConversationDTO(Long id, String name, ConversationType type, LocalDateTime lastMessageAt) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.lastMessageAt = lastMessageAt;
    }
    
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public ConversationType getType() {
        return type;
    }
    
    public void setType(ConversationType type) {
        this.type = type;
    }
    
    public LocalDateTime getLastMessageAt() {
        return lastMessageAt;
    }
    
    public void setLastMessageAt(LocalDateTime lastMessageAt) {
        this.lastMessageAt = lastMessageAt;
    }
    
    public Set<UserDTO> getUsers() {
        return users;
    }
    
    public void setUsers(Set<UserDTO> users) {
        this.users = users;
    }
    
    public Set<Message> getMessages() {
        return messages;
    }
    
    public void setMessages(Set<Message> messages) {
        this.messages = messages;
    }
}
