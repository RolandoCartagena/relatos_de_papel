export { authService } from './authService';
export type { LoginCredentials, LoginResponse, UserProfile } from './authService';
export { catalogueService } from './catalogueService';
export type { Book, BookFilters, AIRecommendation } from './catalogueService';
export { orderService } from './orderService';
export type { Order, CreateOrderRequest } from './orderService';
export { wsService, WebSocketService } from './websocketService';
export type { ChatMessage, WebSocketMessage } from './websocketService';
export { default as api } from './api';