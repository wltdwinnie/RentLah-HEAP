export const formatTimestamp = (timestamp: string | Date): string => {
  // Handle both ISO strings and Date objects
  const date = new Date(timestamp);
  
  // Check if date is valid
  if (isNaN(date.getTime())) {
    return 'Invalid date';
  }
  
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  const messageDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  
  // Check if it's today
  if (messageDate.getTime() === today.getTime()) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
  
  // Check if it's yesterday
  if (messageDate.getTime() === yesterday.getTime()) {
    return `Yesterday ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  }
  
  // Check if it's within this week
  const weekAgo = new Date(today);
  weekAgo.setDate(weekAgo.getDate() - 7);
  if (messageDate > weekAgo) {
    return `${date.toLocaleDateString([], { weekday: 'long' })} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  }
  
  // For older messages
  return `${date.toLocaleDateString([], { month: 'short', day: 'numeric' })} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
};

export const shouldShowTimestampHeader = (
  currentMsg: MessageType, 
  previousMsg: MessageType | undefined, 
  timeGapHours: number = 2
): boolean => {
  if (!previousMsg) return true;
  
  const currentTime = new Date(currentMsg.created_at);
  const previousTime = new Date(previousMsg.created_at);
  
  // Check if dates are valid
  if (isNaN(currentTime.getTime()) || isNaN(previousTime.getTime())) {
    return false;
  }
  
  const timeDiff = (currentTime.getTime() - previousTime.getTime()) / (1000 * 60 * 60); // Convert to hours
  
  return timeDiff >= timeGapHours;
};

export const getTimestampHeader = (timestamp: string | Date): string => {
  const date = new Date(timestamp);
  
  // Check if date is valid
  if (isNaN(date.getTime())) {
    return 'Invalid date';
  }
  
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  const messageDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  
  // Check if it's today
  if (messageDate.getTime() === today.getTime()) {
    return "Today";
  }
  
  // Check if it's yesterday
  if (messageDate.getTime() === yesterday.getTime()) {
    return "Yesterday";
  }
  
  // Check if it's within this week
  const weekAgo = new Date(today);
  weekAgo.setDate(weekAgo.getDate() - 7);
  if (messageDate > weekAgo) {
    return date.toLocaleDateString([], { weekday: 'long' });
  }
  
  // For older messages
  return date.toLocaleDateString([], { month: 'long', day: 'numeric', year: 'numeric' });
};

// Helper function to check if two timestamps are on the same day
export const isSameDay = (timestamp1: string | Date, timestamp2: string | Date): boolean => {
  const date1 = new Date(timestamp1);
  const date2 = new Date(timestamp2);
  
  return date1.getDate() === date2.getDate() &&
         date1.getMonth() === date2.getMonth() &&
         date1.getFullYear() === date2.getFullYear();
};

// Alternative: Show timestamp header only when date changes (not just time gap)
export const shouldShowTimestampHeaderByDate = (
  currentMsg: MessageType, 
  previousMsg: MessageType | undefined
): boolean => {
  if (!previousMsg) return true;
  
  return !isSameDay(currentMsg.created_at, previousMsg.created_at);
};

// Type definitions
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
