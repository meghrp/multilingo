package com.multilingo.Conversation;

import com.multilingo.Message.Message;
import com.multilingo.User.User;

import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Set;

@Entity
public class Conversation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Enumerated(EnumType.STRING)
    private ConversationType type;

    @ManyToMany(mappedBy = "conversations")
    private Set<User> users = new HashSet<>();

    @OneToMany(mappedBy = "conversation", cascade = CascadeType.ALL)
    private Set<Message> messages = new HashSet<>();

    public Conversation() {}

    public Conversation(Long id, Set<User> users, ConversationType type) {
        this.id = id;
        this.users = users;
        this.type = type;
    }

    public Conversation(Long id, Set<User> users, ConversationType type, Set<Message> messages) {
        this.id = id;
        this.users = users;
        this.type = type;
        this.messages = messages;
    }

    public Conversation(Set<User> users, ConversationType type) {
        this.users = users;
        this.type = type;
    }

    public Conversation(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public void addUser(User user) {
        this.users.add(user);
    }

    public void addMessage(Message message) {
        this.messages.add(message);
    }

    public Set<Message> getMessages() {
        return messages;
    }

    public void setMessages(Set<Message> messages) {
        this.messages = messages;
    }
}
