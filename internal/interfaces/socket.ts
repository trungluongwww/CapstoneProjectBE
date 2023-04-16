interface ISocketConversationSeenPayload {
  conversationId: string;
  userId: string;
}

interface ISocketEventFailedResponse {
  message: string;
  success: boolean;
}

export { ISocketConversationSeenPayload, ISocketEventFailedResponse };
