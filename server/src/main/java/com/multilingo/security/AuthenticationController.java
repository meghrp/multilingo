package com.multilingo.security;

import com.multilingo.User.User;
import com.multilingo.User.UserDTO;
import com.multilingo.User.UserRegistrationDTO;
import com.multilingo.User.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Controller for handling authentication
 */
@RestController
@RequestMapping("/api/v1/auth")
public class AuthenticationController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Autowired
    private UserService userService;

    /**
     * Login endpoint
     * 
     * @param authenticationRequest Authentication request
     * @return Authentication response with JWT token
     */
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody AuthenticationRequest authenticationRequest) {
        try {
            // Authenticate user
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            authenticationRequest.getUsername(),
                            authenticationRequest.getPassword()
                    )
            );

            // Generate JWT token
            final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getUsername());
            final String token = jwtTokenUtil.generateToken(userDetails);
            final String refreshToken = jwtTokenUtil.generateRefreshToken(userDetails.getUsername());
            
            // Get user details
            User user = userService.getUserByUsername(authenticationRequest.getUsername());
            UserDTO userDTO = userService.convertToDTO(user);

            // Return authentication response
            return ResponseEntity.ok(new AuthenticationResponse(token, refreshToken, userDTO));
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Invalid username or password");
        }
    }

    /**
     * Registration endpoint
     * 
     * @param registrationDto Registration request
     * @return Authentication response with JWT token
     */
    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody UserRegistrationDTO registrationDto) {
        try {
            // Register user
            User user = userService.registerUser(
                    registrationDto.username(),
                    registrationDto.name(),
                    registrationDto.email(),
                    registrationDto.password(),
                    registrationDto.preferredLanguage()
            );
            
            // Generate JWT token
            final UserDetails userDetails = userDetailsService.loadUserByUsername(user.getUsername());
            final String token = jwtTokenUtil.generateToken(userDetails);
            final String refreshToken = jwtTokenUtil.generateRefreshToken(userDetails.getUsername());
            
            // Convert to DTO
            UserDTO userDTO = userService.convertToDTO(user);

            // Return authentication response
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new AuthenticationResponse(token, refreshToken, userDTO));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(e.getMessage());
        }
    }

    /**
     * Refresh token endpoint
     * 
     * @param refreshTokenRequest Refresh token request
     * @return Authentication response with new JWT token
     */
    @PostMapping("/refresh")
    public ResponseEntity<?> refreshToken(@RequestBody RefreshTokenRequest refreshTokenRequest) {
        try {
            // Extract username from refresh token
            String username = jwtTokenUtil.extractUsername(refreshTokenRequest.getRefreshToken());
            
            // Validate token
            if (username != null) {
                UserDetails userDetails = userDetailsService.loadUserByUsername(username);
                
                // Generate new tokens
                String token = jwtTokenUtil.generateToken(userDetails);
                String refreshToken = jwtTokenUtil.generateRefreshToken(username);
                
                // Get user details
                User user = userService.getUserByUsername(username);
                UserDTO userDTO = userService.convertToDTO(user);
                
                // Return new tokens
                return ResponseEntity.ok(new AuthenticationResponse(token, refreshToken, userDTO));
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body("Invalid refresh token");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Invalid refresh token");
        }
    }
} 