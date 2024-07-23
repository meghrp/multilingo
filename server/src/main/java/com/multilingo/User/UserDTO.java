package com.multilingo.User;

public record UserDTO(
        Long id, String username, String name, String email, String preferredLanguage) {
    public static UserDTO toDTO(User user) {
        return new UserDTO(
                user.getId(),
                user.getUsername(),
                user.getName(),
                user.getEmail(),
                user.getPreferredLanguage());
    }
}
