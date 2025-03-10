import { Client, IMessage } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const WS_ENDPOINT = 'http://localhost:8080/ws';

interface MessageCallback {
  (message: any): void;
}

interface StatusUpdateCallback {
  (update: any): void;
}

class WebSocketService {
  private client: Client | null = null;
  private connected: boolean = false;
  private messageListeners: Map<string, Set<MessageCallback>> = new Map();
  private statusUpdateListeners: Set<StatusUpdateCallback> = new Set();

  /**
   * Connect to WebSocket server
   */
  connect(): Promise<void> {
    if (this.connected && this.client?.connected) {
      console.log('WebSocket already connected');
      return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
      // Get auth token from localStorage
      const token = localStorage.getItem('authToken');
      
      if (!token) {
        return reject(new Error('Authentication token not found'));
      }

      // Create a new STOMP client
      this.client = new Client({
        webSocketFactory: () => new SockJS(WS_ENDPOINT),
        connectHeaders: {
          Authorization: `Bearer ${token}`,
        },
        debug: (str) => {
          console.debug(`STOMP: ${str}`);
        },
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
      });

      // On connect handler
      this.client.onConnect = (frame) => {
        console.log('Connected to WebSocket', frame);
        this.connected = true;

        // Subscribe to user-specific queue for private messages
        this.client?.subscribe('/user/queue/messages', (message) => {
          this.handleIncomingMessage(message);
        });

        // Subscribe to user-specific queue for read status updates
        this.client?.subscribe('/user/queue/status', (statusUpdate) => {
          this.handleStatusUpdate(statusUpdate);
        });

        resolve();
      };

      // On error handler
      this.client.onStompError = (error) => {
        console.error('WebSocket error:', error);
        reject(error);
      };

      // Start the connection
      this.client.activate();
    });
  }

  /**
   * Disconnect from WebSocket server
   */
  disconnect(): void {
    if (this.client && this.connected) {
      this.client.deactivate();
      this.connected = false;
      console.log('Disconnected from WebSocket');
    }
  }

  /**
   * Subscribe to a conversation topic
   */
  subscribeToConversation(conversationId: string | number): void {
    if (!this.client || !this.connected) {
      console.error('WebSocket not connected');
      return;
    }

    this.client.subscribe(`/topic/conversation.${conversationId}`, (message) => {
      this.handleIncomingMessage(message);
    });
  }

  /**
   * Send a message to a conversation
   */
  sendMessage(conversationId: string | number, content: string, messageType: string = 'TEXT'): void {
    if (!this.client || !this.connected) {
      console.error('WebSocket not connected');
      return;
    }

    const chatMessage = {
      conversationId,
      content,
      messageType,
    };

    this.client.publish({
      destination: '/app/chat.sendMessage',
      body: JSON.stringify(chatMessage),
    });
  }

  /**
   * Mark a message as read
   */
  markMessageAsRead(messageId: string | number): void {
    if (!this.client || !this.connected) {
      console.error('WebSocket not connected');
      return;
    }

    const readStatus = {
      messageId,
    };

    this.client.publish({
      destination: '/app/chat.markRead',
      body: JSON.stringify(readStatus),
    });
  }

  /**
   * Add a listener for incoming messages
   */
  addMessageListener(conversationId: string, callback: MessageCallback): void {
    if (!this.messageListeners.has(conversationId)) {
      this.messageListeners.set(conversationId, new Set());
    }
    this.messageListeners.get(conversationId)?.add(callback);
  }

  /**
   * Remove a message listener
   */
  removeMessageListener(conversationId: string, callback: MessageCallback): void {
    this.messageListeners.get(conversationId)?.delete(callback);
  }

  /**
   * Add a listener for status updates (like read receipts)
   */
  addStatusUpdateListener(callback: StatusUpdateCallback): void {
    this.statusUpdateListeners.add(callback);
  }

  /**
   * Remove a status update listener
   */
  removeStatusUpdateListener(callback: StatusUpdateCallback): void {
    this.statusUpdateListeners.delete(callback);
  }

  /**
   * Handle incoming message from WebSocket
   */
  private handleIncomingMessage(message: IMessage): void {
    try {
      const parsedMessage = JSON.parse(message.body);
      const conversationId = parsedMessage.conversationId || 'global';
      
      // Notify all listeners for this conversation
      this.messageListeners.get(conversationId)?.forEach(callback => {
        callback(parsedMessage);
      });
      
      // Also notify global listeners
      this.messageListeners.get('global')?.forEach(callback => {
        callback(parsedMessage);
      });
    } catch (error) {
      console.error('Error parsing message:', error);
    }
  }

  /**
   * Handle status update from WebSocket
   */
  private handleStatusUpdate(statusUpdate: IMessage): void {
    try {
      const parsedUpdate = JSON.parse(statusUpdate.body);
      
      // Notify all status update listeners
      this.statusUpdateListeners.forEach(callback => {
        callback(parsedUpdate);
      });
    } catch (error) {
      console.error('Error parsing status update:', error);
    }
  }
}

// Create singleton instance
const websocketService = new WebSocketService();
export default websocketService; 