package com.multilingo.Message;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {
    List<Message> findSenderId(Long senderId);

    List<Message> findReceiverId(Long receiverId);

    // Find messages by sender and receiver ID (for conversation)
    List<Message> findBySenderIdAndReceiverId(Long senderId, Long receiverId);

    // Find messages by sender or receiver ID (for user's message history)
    List<Message> findSenderIdOrReceiverId(Long senderId, Long receiverId);

    // Find messages by conversation ID
    List<Message> findByConversationId(Long conversationId);
}
