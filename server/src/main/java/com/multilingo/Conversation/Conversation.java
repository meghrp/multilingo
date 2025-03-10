package com.multilingo.Conversation;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.multilingo.Message.Message;
import com.multilingo.User.User;
import com.multilingo.common.BaseEntity;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

/**
 * Entity representing a conversation between users.
 */
@Entity
@Table(name = "conversations", indexes = {
    @Index(name = "idx_conversation_last_message", columnList = "last_message_at")
})
public class Conversation extends BaseEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", length = 100)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(name = "type", nullable = false)
    private ConversationType type;

    @ManyToMany
    @JoinTable(
        name = "user_conversations",
        joinColumns = @JoinColumn(name = "conversation_id"),
        inverseJoinColumns = @JoinColumn(name = "user_id"),
        indexes = {
            @Index(name = "idx_user_conversations_conversation", columnList = "conversation_id"),
            @Index(name = "idx_user_conversations_user", columnList = "user_id")
        }
    )
    private Set<User> users = new HashSet<>();

    @OneToMany(mappedBy = "conversation", cascade = CascadeType.ALL)
    @JsonIgnore
    private Set<Message> messages = new HashSet<>();

    @Column(name = "last_message_at")
    private LocalDateTime lastMessageAt;

    public Conversation() {}

    public Conversation(Long id) {
        this.id = id;
    }

    public Conversation(Set<User> users) {
        this.users = users;
        this.type = ConversationType.PRIVATE; // Default to PRIVATE
    }

    public Conversation(String name, Set<User> users) {
        this.name = name;
        this.users = users;
        this.type = users.size() > 2 ? ConversationType.GROUP : ConversationType.PRIVATE;
    }

    public Conversation(Set<User> users, ConversationType type) {
        this.users = users;
        this.type = type;
    }

    public Conversation(String name, Set<User> users, ConversationType type) {
        this.name = name;
        this.users = users;
        this.type = type;
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

    public Set<User> getUsers() {
        return users;
    }

    public void setUsers(Set<User> users) {
        this.users = users;
    }

    public Set<Message> getMessages() {
        return messages;
    }

    public void setMessages(Set<Message> messages) {
        this.messages = messages;
    }

    public LocalDateTime getLastMessageAt() {
        return lastMessageAt;
    }

    public void setLastMessageAt(LocalDateTime lastMessageAt) {
        this.lastMessageAt = lastMessageAt;
    }

    public void addUser(User user) {
        this.users.add(user);
        user.getConversations().add(this);
    }

    public void removeUser(User user) {
        this.users.remove(user);
        user.getConversations().remove(this);
    }

    public void addMessage(Message message) {
        this.messages.add(message);
        message.setConversation(this);
        this.lastMessageAt = LocalDateTime.now();
    }

    public boolean isGroupConversation() {
        return this.users.size() > 2;
    }

    public boolean hasUser(User user) {
        return this.users.contains(user);
    }

    public ConversationType getType() {
        return type;
    }

    public void setType(ConversationType type) {
        this.type = type;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Conversation that = (Conversation) o;
        return getId() != null && getId().equals(that.getId());
    }

    @Override
    public int hashCode() {
        return getId() != null ? getId().hashCode() : 0;
    }

    @Override
    public String toString() {
        return "Conversation{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", lastMessageAt=" + lastMessageAt +
                '}';
    }
}
