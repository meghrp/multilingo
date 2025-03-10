const API_BASE_URL = 'http://localhost:8080/api/v1';

/**
 * Base function for making API requests
 */
async function fetchApi<T>(
  endpoint: string, 
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  // Get token from localStorage if available
  const token = localStorage.getItem('authToken');
  
  // Set default headers
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {})
  };
  
  // Add authorization header if token exists
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  const response = await fetch(url, {
    ...options,
    headers,
  });
  
  // Handle non-2xx responses
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({
      message: 'An unknown error occurred',
    }));
    
    throw new Error(errorData.message || `API Error: ${response.status}`);
  }
  
  // Parse JSON response (handle empty responses)
  return response.text().then(text => {
    return text ? JSON.parse(text) : {};
  });
}

interface LoginRequest {
  username: string;
  password: string;
}

interface RegisterRequest {
  username: string;
  name: string;
  email: string;
  password: string;
  preferredLanguage: string;
}

interface AuthResponse {
  token: string;
  refreshToken: string;
}

/**
 * Authentication API functions
 */
export const authApi = {
  /**
   * Login user with username and password
   */
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    return fetchApi<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },
  
  /**
   * Register a new user
   */
  register: async (userData: RegisterRequest): Promise<AuthResponse> => {
    return fetchApi<AuthResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },
  
  /**
   * Refresh the authentication token
   */
  refreshToken: async (refreshToken: string): Promise<AuthResponse> => {
    return fetchApi<AuthResponse>('/auth/refresh', {
      method: 'POST',
      body: JSON.stringify({ refreshToken }),
    });
  },
};

/**
 * User API functions
 */
export const userApi = {
  /**
   * Get the current user's profile by extracting from JWT
   */
  getCurrentUser: async () => {
    try {
      // Extract info from token
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('No authentication token found');
      }
      
      try {
        // Extract user data from JWT payload
        // JWT format: header.payload.signature
        const payload = token.split('.')[1];
        const decodedPayload = JSON.parse(atob(payload));
        
        // Get additional user data if username is available
        if (decodedPayload.sub) {
          try {
            // Try to get more details from API
            const userData = await fetchApi(`/user/${decodedPayload.sub}`, {
              method: 'GET',
            }) as any; // Type assertion to handle the unknown structure
            
            return {
              id: userData?.id || decodedPayload.sub,
              username: userData?.username || decodedPayload.sub,
              name: userData?.name || decodedPayload.sub,
              email: userData?.email || '',
              preferredLanguage: userData?.preferredLanguage || 'English',
            };
          } catch (apiError) {
            console.warn('Could not fetch detailed user data, using basic info from token');
          }
        }
        
        // Return basic user info from token
        return {
          id: decodedPayload.sub || decodedPayload.id || '',
          username: decodedPayload.sub || decodedPayload.username || '',
          name: decodedPayload.name || decodedPayload.sub || '',
          email: decodedPayload.email || '',
          preferredLanguage: decodedPayload.preferredLanguage || 'English',
        };
      } catch (tokenError) {
        console.error('Error parsing token:', tokenError);
        throw new Error('Could not retrieve user information');
      }
    } catch (error) {
      console.error('Error getting current user:', error);
      throw error;
    }
  },
  
  /**
   * Get a user by username
   */
  getUserByUsername: async (username: string) => {
    return fetchApi(`/user/${username}`, {
      method: 'GET',
    });
  },
};

/**
 * Conversation API functions
 */
export const conversationApi = {
  /**
   * Get all conversations for the current user
   */
  getConversations: async () => {
    return fetchApi('/conversations', {
      method: 'GET',
    });
  },
  
  /**
   * Get a specific conversation by ID
   */
  getConversation: async (id: string | number) => {
    return fetchApi(`/conversations/${id}`, {
      method: 'GET',
    });
  },
  
  /**
   * Create a new conversation with selected users
   */
  createConversation: async (userIds: string[]) => {
    try {
      // First, we need to get the numeric IDs for these usernames
      const numericIds: string[] = [];
      
      // For each username, try to get their numeric ID
      for (const username of userIds) {
        try {
          // Try to get user details to extract ID
          const userData = await userApi.getUserByUsername(username) as any;
          if (userData && userData.id) {
            numericIds.push(userData.id.toString());
          } else {
            // If we can't get the ID, use a fallback approach
            console.warn(`Could not get ID for username: ${username}, using username as fallback`);
            numericIds.push(username);
          }
        } catch (error) {
          console.warn(`Error getting user data for ${username}:`, error);
          // Use username as fallback
          numericIds.push(username);
        }
      }
      
      // Now create the conversation with numeric IDs and type
      return fetchApi('/conversations', {
        method: 'POST',
        body: JSON.stringify({ 
          users: numericIds,
          type: numericIds.length > 2 ? 'GROUP' : 'PRIVATE'
        }),
      });
    } catch (error) {
      console.error('Error creating conversation:', error);
      throw error;
    }
  },
  
  /**
   * Add a user to an existing conversation
   */
  addUserToConversation: async (conversationId: string | number, username: string) => {
    return fetchApi(`/conversations/${conversationId}/users/${username}`, {
      method: 'POST',
    });
  }
};

/**
 * Message API functions
 */
export const messageApi = {
  /**
   * Get messages for a conversation
   */
  getMessages: async (conversationId: string | number) => {
    return fetchApi(`/messages/conversation/${conversationId}`, {
      method: 'GET',
    });
  },
  
  /**
   * Send a message to a conversation
   */
  sendMessage: async (conversationId: string | number, content: string, messageType: string = 'TEXT') => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('Authentication required');
      }
      
      // For sending messages, we need to get the current user
      // Extract user info from JWT token (basic approach)
      const payload = token.split('.')[1];
      const decodedPayload = JSON.parse(atob(payload));
      
      return fetchApi('/messages/send', {
        method: 'POST',
        body: JSON.stringify({
          sender: {
            id: decodedPayload.sub || decodedPayload.id,
            username: decodedPayload.sub || decodedPayload.username
          },
          conversationId,
          content,
          messageType: messageType
        }),
      });
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  },
  
  /**
   * Mark a message as read
   */
  markAsRead: async (messageId: string | number) => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('Authentication required');
      }
      
      // Extract user info from JWT token
      const payload = token.split('.')[1];
      const decodedPayload = JSON.parse(atob(payload));
      
      return fetchApi(`/messages/${messageId}/read`, {
        method: 'POST',
        body: JSON.stringify({
          id: decodedPayload.sub || decodedPayload.id,
          username: decodedPayload.sub || decodedPayload.username
        }),
      });
    } catch (error) {
      console.error('Error marking message as read:', error);
      throw error;
    }
  },
}; 