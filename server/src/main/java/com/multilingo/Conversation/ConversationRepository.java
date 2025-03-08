package com.multilingo.Conversation;

import com.multilingo.User.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Repository for Conversation entities.
 */
@Repository
public interface ConversationRepository extends JpaRepository<Conversation, Long> {
    
    /**
     * Find a conversation by ID.
     * 
     * @param id The ID of the conversation
     * @return The conversation
     */
    Optional<Conversation> findConversationById(Long id);
    
    /**
     * Find all conversations for a user.
     * 
     * @param user The user
     * @return The conversations
     */
    @Query("SELECT c FROM Conversation c JOIN c.users u WHERE u = :user")
    List<Conversation> findByUsers(@Param("user") User user);
}
