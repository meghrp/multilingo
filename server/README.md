# Multilingo Server - Simplified Architecture

This document outlines the simplified architecture of the Multilingo server, focusing on the core functionality of user authentication and real-time messaging.

## Core Components

### 1. Authentication System

The authentication system has been simplified to provide essential JWT-based authentication:

- **JwtTokenUtil**: Handles token generation, validation, and parsing
- **AuthenticationController**: Provides endpoints for login, registration, and token refresh
- **JwtRequestFilter**: Intercepts HTTP requests to validate JWT tokens
- **SecurityConfig**: Configures security rules and CORS settings

### 2. WebSocket Messaging

The WebSocket implementation has been streamlined to focus on core messaging functionality:

- **WebSocketConfig**: Combined configuration for WebSocket endpoints and security
- **WebSocketController**: Handles incoming WebSocket messages
- **WebSocketUtil**: Utility for sending messages to users and topics

### 3. Domain Model

The domain model remains unchanged, with the following key entities:

- **User**: Represents application users
- **Conversation**: Represents a chat between users (direct or group)
- **Message**: Represents individual messages within conversations

## Simplified Architecture Benefits

1. **Reduced Complexity**: Removed unnecessary abstractions and duplicate configurations
2. **Improved Maintainability**: Consolidated related functionality into fewer classes
3. **Better Readability**: Simplified code with focused methods and clear responsibilities
4. **Easier Onboarding**: New developers can understand the system more quickly

## API Endpoints

### Authentication

- `POST /api/v1/auth/login`: Authenticate a user
- `POST /api/v1/auth/register`: Register a new user
- `POST /api/v1/auth/refresh`: Refresh an authentication token

### WebSocket

- `/ws`: WebSocket endpoint (with SockJS support)
- `/app/chat.sendMessage`: Send a message
- `/app/chat.markRead`: Mark a message as read
- `/user/queue/messages`: User-specific message queue
- `/topic/conversation.{id}`: Topic for group conversations

## Getting Started

1. Configure application properties (database, JWT secret, etc.)
2. Run the application using `./gradlew bootRun`
3. Access the API at `http://localhost:8080`

## Security Considerations

While the architecture has been simplified, it still maintains essential security features:

- JWT-based authentication
- Password encryption
- CORS configuration
- WebSocket authentication

For production deployment, consider additional security measures such as rate limiting and more restrictive CORS settings. 