export interface ChatUser {
  id: string;
  username?: string; // Made optional since you're using name in some places
  imageUrl?: string; // Made optional since you're using image in some places
  name?: string;
  image?: string; // Added this since your code uses user.image
  email?: string; // Added since you're using email in fallback
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

export interface DatabaseMessage {
  id: number;
  sender_id: string;
  receiver_id: string;
  room: string;
  message: string;
  created_at: string;
}

export interface Channel {
  name: string;
  id?: string;
  description?: string;
  memberCount?: number;
  lastActivity?: string;
}

export interface CommunityInfo {
  name: string;
  logo: string;
  fallbackLogo: string;
  fullName: string;
  id?: string;
  description?: string;
  memberCount?: number;
  isActive?: boolean;
  lastActivity?: string;
}

export interface Community {
  id: string;
  name: string;
  displayName?: string;
  description?: string;
  channels: Channel[];
  memberCount?: number;
  imageUrl?: string;
  created_at?: string;
  logo?: string;
  fallbackLogo?: string;
  fullName?: string;
}

export interface ChannelBarProps {
  communityName: string;
  onBack: () => void;
  channels?: Channel[]; 
}

export interface CommunityBarProps {
  onSelectCommunity: (name: string) => void;
  communities?: CommunityInfo[]; 
}

export interface CommunityImageProps {
  community: CommunityInfo;
  onError: (communityName: string) => void;
  hasError: boolean;
}

export interface ImageErrorState {
  [communityName: string]: boolean;
}

export interface CommunityMessage extends MessageType {
  channelName: string;
  communityId: string;
  user?: ChatUser;
}

// Additional interfaces for your DM page
export interface DMPageProps {
  params: Promise<{ chatid: string }>;
}

// Additional interfaces for your Community page
export interface CommunityPageProps {
  params: Promise<{ communityName: string; channelName: string }>;
}

export interface ApiUserResponse {
  id: string;
  name?: string;
  email?: string;
  image?: string;
  username?: string;
  imageUrl?: string;
}

export interface ApiMessageResponse {
  id: number;
  sender_id: string;
  receiver_id?: string;
  room: string;
  message: string;
  created_at: string;
}

// Interface for socket message data
export interface SocketMessageData {
  sender: string;
  message: string;
  created_at: string;
  sender_id?: string;
  user_id?: string;
  room?: string;
}

// Interface for sender name mapping
export interface SenderNameMap {
  [senderId: string]: string;
}