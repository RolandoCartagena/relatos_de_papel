// ============================================
// 1. DEFINICIÓN DE TIPOS
// ============================================

export interface ChatMessage {
  type: 'message' | 'typing' | 'error' | 'connected';
  content: string;
  sender: 'user' | 'assistant' | 'system';
  timestamp?: string;
}

export interface WebSocketMessage {
  action: 'send' | 'typing' | 'ping' | 'close' | 'connected';
  payload: Record<string, string | number | boolean | null | undefined>;
}

// ============================================
// 2. CLASE PRINCIPAL
// ============================================

export class WebSocketService {
  private socket: WebSocket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectTimeout: ReturnType<typeof setTimeout> | null = null; // ✅ Solución NodeJS.Timeout
  private onMessageCallback: ((data: ChatMessage) => void) | null = null; // ✅ Tipado específico
  private isConnecting = false;

  /**
   * Conecta al WebSocket del servidor
   */
  connect(token: string, onMessage: (data: ChatMessage) => void): void {
    if (this.isConnecting) return;
    this.isConnecting = true;
    this.onMessageCallback = onMessage;

    const wsUrl = `ws://localhost:8762/ws/chat?token=${token}`;

    try {
      this.socket = new WebSocket(wsUrl);

      this.socket.onopen = () => {
        console.log('🟢 WebSocket conectado');
        this.reconnectAttempts = 0;
        this.isConnecting = false;

        // Enviar mensaje de inicio de sesión
        this.sendMessage({
          action: 'connected', // ✅ Ahora está incluido en el tipo
          payload: {
            userId: localStorage.getItem('userId') || 'anonymous'
          }
        });
      };

      this.socket.onmessage = (event) => {
        try {
          const rawData = JSON.parse(event.data) as Record<string, unknown>;
          console.log('📩 Mensaje WebSocket recibido:', rawData);

          // Extraer datos de forma segura
          const type = this.mapMessageType(String(rawData.type || 'message'));
          const content = String(rawData.content || rawData.message || '');
          const sender = this.mapSender(String(rawData.sender || 'system'));
          const timestamp = String(rawData.timestamp || new Date().toISOString());

          const chatMessage: ChatMessage = {
            type,
            content,
            sender,
            timestamp
          };

          if (this.onMessageCallback) {
            this.onMessageCallback(chatMessage);
          }
        } catch (error) {
          console.error('❌ Error parseando mensaje WebSocket:', error);
        }
      };

      this.socket.onclose = (event) => {
        console.log('🔴 WebSocket desconectado:', event.code, event.reason);
        this.isConnecting = false;
        this.socket = null;
        this.reconnect();
      };

      this.socket.onerror = (error) => {
        console.error('❌ Error en WebSocket:', error);
        this.isConnecting = false;
      };
    } catch (error) {
      console.error('❌ Error conectando WebSocket:', error);
      this.isConnecting = false;
    }
  }

  /**
   * Mapea el tipo de mensaje del servidor
   */
  private mapMessageType(type: string): ChatMessage['type'] {
    const typeMap: Record<string, ChatMessage['type']> = {
      message: 'message',
      typing: 'typing',
      error: 'error',
      connected: 'connected',
      text: 'message',
      notification: 'message'
    };
    return typeMap[type] || 'message';
  }

  /**
   * Mapea el remitente del mensaje
   */
  private mapSender(sender: string): ChatMessage['sender'] {
    const senderMap: Record<string, ChatMessage['sender']> = {
      user: 'user',
      assistant: 'assistant',
      system: 'system',
      bot: 'assistant',
      ai: 'assistant'
    };
    return senderMap[sender] || 'system';
  }

  /**
   * Reintenta la conexión si falla
   */
  private reconnect(): void {
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
      this.reconnectTimeout = null;
    }

    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      const delay = 3000 * this.reconnectAttempts;
      console.log(`🔄 Reintentando conexión en ${delay}ms (intento ${this.reconnectAttempts}/${this.maxReconnectAttempts})`);

      this.reconnectTimeout = setTimeout(() => {
        const token = localStorage.getItem('token');
        if (token && this.onMessageCallback) {
          this.connect(token, this.onMessageCallback);
        }
      }, delay);
    } else {
      console.log('❌ Máximo de reintentos alcanzado');
      if (this.onMessageCallback) {
        this.onMessageCallback({
          type: 'error',
          content: 'No se pudo conectar al servidor de chat. Por favor, recarga la página.',
          sender: 'system',
          timestamp: new Date().toISOString()
        });
      }
    }
  }

  /**
   * Envía un mensaje al servidor (tipado seguro)
   */
  sendMessage(message: Partial<WebSocketMessage> | string): void {
    let payload: WebSocketMessage;

    if (typeof message === 'string') {
      payload = {
        action: 'send',
        payload: { message }
      };
    } else {
      payload = {
        action: message.action || 'send',
        payload: message.payload || {}
      };
    }

    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(payload));
      console.log('📤 Mensaje enviado:', payload);
    } else {
      console.warn('⚠️ WebSocket no está conectado');
    }
  }

  /**
   * Envía un mensaje de "escribiendo..."
   */
  sendTyping(isTyping: boolean): void {
    this.sendMessage({
      action: 'typing',
      payload: { typing: isTyping }
    });
  }

  /**
   * Desconecta el WebSocket
   */
  disconnect(): void {
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
      this.reconnectTimeout = null;
    }
    if (this.socket) {
      this.socket.close(1000, 'Desconexión manual');
      this.socket = null;
    }
    this.isConnecting = false;
    this.onMessageCallback = null;
    console.log('🔌 WebSocket desconectado manualmente');
  }

  /**
   * Verifica si el WebSocket está conectado
   */
  isConnected(): boolean {
    return this.socket !== null && this.socket.readyState === WebSocket.OPEN;
  }

  /**
   * Obtiene el estado actual de la conexión
   */
  getConnectionState(): string {
    if (!this.socket) return 'disconnected';
    const states: Record<number, string> = {
      [WebSocket.CONNECTING]: 'connecting',
      [WebSocket.OPEN]: 'connected',
      [WebSocket.CLOSING]: 'closing',
      [WebSocket.CLOSED]: 'disconnected'
    };
    return states[this.socket.readyState] || 'unknown';
  }
}

// ============================================
// 3. INSTANCIA SINGLETON
// ============================================

export const wsService = new WebSocketService();