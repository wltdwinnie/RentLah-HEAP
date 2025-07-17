export interface ChatUser {
  id: string;
  username: string;
  imageUrl: string;
  name?: string;     
}

export interface ChatFormProps {
  onSendMessage: (message: string) => void;
}

export interface ChatLayoutProps {
  children: React.ReactNode;
}

export interface ChatMessageProps {
  sender: string;
  message: string;
  isOwnMessage: boolean;
  otherUserImage?: string;
  created_at: string;
}

export interface HeaderProps {
  imageUrl?: string;
  name: string;
}

export interface TimestampHeaderProps {
  timestamp: string;
}

export interface MessageType {
  sender: string;
  message: string;
  created_at: string;
  sender_id?: string;
}