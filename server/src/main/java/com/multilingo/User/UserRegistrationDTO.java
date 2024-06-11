package com.multilingo.User;

public record UserRegistrationDTO(
        String name,
        String email,
        String username,
        String password,
        String preferredLanguage
) {
}
