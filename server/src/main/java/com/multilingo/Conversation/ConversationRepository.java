package com.multilingo.Conversation;

import com.multilingo.User.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.Set;

@Repository
public interface ConversationRepository extends JpaRepository<Conversation, Long> {
    Optional<Conversation> findConversationByUsers(Set<User> users);

    Optional<ConversationType> findTypeById(Long conversationId);

    Optional<Conversation> findConversationById(Long conversationId);
}
