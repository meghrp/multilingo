package com.multilingo.security;

import com.multilingo.User.UserDTO;

/**
 * DTO for authentication responses
 */
public class AuthenticationResponse {
    
    private String token;
    private String refreshToken;
    private UserDTO user;

    public AuthenticationResponse() {
    }

    public AuthenticationResponse(String token, String refreshToken, UserDTO user) {
        this.token = token;
        this.refreshToken = refreshToken;
        this.user = user;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getRefreshToken() {
        return refreshToken;
    }

    public void setRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }

    public UserDTO getUser() {
        return user;
    }

    public void setUser(UserDTO user) {
        this.user = user;
    }
} 