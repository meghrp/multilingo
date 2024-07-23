package com.multilingo.User;

import com.multilingo.Conversation.Conversation;

import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Set;

@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(nullable = false)
    private String name;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String preferredLanguage;

    @ManyToMany
    @JoinTable(
            name = "user_conversations",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "conversation_id"))
    private Set<Conversation> conversations = new HashSet<>();

    public User() {}

    public User(
            Long id,
            String username,
            String name,
            String email,
            String password,
            String preferredLanguage,
            Conversation conversation) {
        this.id = id;
        this.username = username;
        this.name = name;
        this.email = email;
        this.password = password;
        this.preferredLanguage = preferredLanguage;
        this.conversations.add(conversation);
    }

    public User(
            String username, String name, String email, String password, String preferredLanguage) {
        this.username = username;
        this.name = name;
        this.email = email;
        this.password = password;
        this.preferredLanguage = preferredLanguage;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPreferredLanguage() {
        return preferredLanguage;
    }

    public void setPreferredLanguage(String preferredLanguage) {
        this.preferredLanguage = preferredLanguage;
    }

    public Set<Conversation> getConversations() {
        return conversations;
    }

    public void setConversations(Set<Conversation> conversations) {
        this.conversations = conversations;
    }

    @Override
    public String toString() {
        return "User{"
                + "username='"
                + username
                + '\''
                + ", name='"
                + name
                + '\''
                + ", email='"
                + email
                + '\''
                + ", preferredLanguage='"
                + preferredLanguage
                + '\''
                + '}';
    }
}
