package com.multilingo.Message;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository for Message entity.
 */
@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {
    /**
     * Find messages by sender ID.
     */
    List<Message> findBySenderId(Long senderId);

    //    // Find messages by sender and receiver ID (for conversation)
    //    List<Message> findBySenderIdAndReceiverId(Long senderId, Long receiverId);
    //
    //    // Find messages by sender or receiver ID (for user's message history)
    //    List<Message> findSenderIdOrReceiverId(Long senderId, Long receiverId);

    /**
     * Find messages by conversation ID.
     */
    List<Message> findByConversationId(Long conversationId);
    
    /**
     * Find messages by conversation ID ordered by sent time ascending.
     */
    List<Message> findByConversationIdOrderBySentAtAsc(Long conversationId);
    
    /**
     * Find unread messages for a conversation.
     */
    List<Message> findByConversationIdAndReadFalse(Long conversationId);
}
