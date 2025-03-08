package com.multilingo.Conversation;

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

    @Column(length = 100)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ConversationType type;

    @Column(name = "last_message_at")
    private LocalDateTime lastMessageAt;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "conversation_users",
        joinColumns = @JoinColumn(name = "conversation_id"),
        inverseJoinColumns = @JoinColumn(name = "user_id"),
        indexes = {
            @Index(name = "idx_conversation_users_conversation", columnList = "conversation_id"),
            @Index(name = "idx_conversation_users_user", columnList = "user_id")
        }
    )
    private Set<User> users = new HashSet<>();

    @OneToMany(mappedBy = "conversation", cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private Set<Message> messages = new HashSet<>();

    public Conversation() {}

    public Conversation(Long id) {
        this.id = id;
    }

    public Conversation(Set<User> users, ConversationType type) {
        this.users = users;
        this.type = type;
        if (type == ConversationType.GROUP) {
            this.name = "Group Chat";
        }
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

    public void addUser(User user) {
        this.users.add(user);
    }

    public void addMessage(Message message) {
        this.messages.add(message);
        this.lastMessageAt = LocalDateTime.now();
    }

    public Set<Message> getMessages() {
        return messages;
    }

    public void setMessages(Set<Message> messages) {
        this.messages = messages;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Conversation that = (Conversation) o;
        return id != null && id.equals(that.id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }

    @Override
    public String toString() {
        return "Conversation{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", type=" + type +
                ", lastMessageAt=" + lastMessageAt +
                '}';
    }
}
