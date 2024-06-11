package com.multilingo.User;

public record UserDTO(
        Long id,
        String username,
        String name,
        String email,
        String preferredLanguage
) {}