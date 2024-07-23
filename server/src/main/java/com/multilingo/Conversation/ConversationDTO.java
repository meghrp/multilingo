package com.multilingo.Conversation;

import com.multilingo.Message.Message;
import com.multilingo.User.UserDTO;

import java.util.Set;

public record ConversationDTO(Set<UserDTO> users, ConversationType type, Set<Message> messages) {}
