import { MessageType } from "@/app/chat/types/chat"

// Helper function to ensure we're working with proper Date objects
const parseTimestamp = (timestamp: string | Date): Date => {
  if (timestamp instanceof Date) {
    return timestamp;
  }
  
  // If the timestamp doesn't end with 'Z' and doesn't have timezone info,
  // assume it's UTC and add 'Z' to make it explicit
  if (typeof timestamp === 'string' && 
      !timestamp.endsWith('Z') && 
      !timestamp.includes('+') && 
      !timestamp.includes('-', 10)) {
    return new Date(timestamp + 'Z');
  }
  
  return new Date(timestamp);
};

// Helper function to add 8 hours to any timestamp
const addEightHours = (date: Date): Date => {
  const newDate = new Date(date);
  newDate.setHours(newDate.getHours() + 8);
  return newDate;
};

export const formatTimestamp = (timestamp: string | Date): string => {
  const date = parseTimestamp(timestamp);
  
  if (isNaN(date.getTime())) {
    return 'Invalid date';
  }
  
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  const messageDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  
  // Add 8 hours to the time for display only
  const displayTime = addEightHours(date);
  
  if (messageDate.getTime() === today.getTime()) {
    return displayTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
  
  if (messageDate.getTime() === yesterday.getTime()) {
    return `Yesterday ${displayTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  }
  
  const weekAgo = new Date(today);
  weekAgo.setDate(weekAgo.getDate() - 7);
  if (messageDate > weekAgo) {
    return `${date.toLocaleDateString([], { weekday: 'long' })} ${displayTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  }
  
  return `${date.toLocaleDateString([], { month: 'short', day: 'numeric' })} ${displayTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
};

export const shouldShowTimestampHeader = (
  currentMsg: MessageType, 
  previousMsg: MessageType | undefined, 
  timeGapHours: number = 2
): boolean => {
  if (!previousMsg) return true;
  
  const currentTime = parseTimestamp(currentMsg.created_at);
  const previousTime = parseTimestamp(previousMsg.created_at);

  if (isNaN(currentTime.getTime()) || isNaN(previousTime.getTime())) {
    return false;
  }
  
  const timeDiff = (currentTime.getTime() - previousTime.getTime()) / (1000 * 60 * 60); // Convert to hours
  
  return timeDiff >= timeGapHours;
};

export const getTimestampHeader = (timestamp: string | Date): string => {
  const date = parseTimestamp(timestamp);
  
  if (isNaN(date.getTime())) {
    return 'Invalid date';
  }
  
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  const messageDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  

  if (messageDate.getTime() === today.getTime()) {
    return "Today";
  }

  if (messageDate.getTime() === yesterday.getTime()) {
    return "Yesterday";
  }
  
  const weekAgo = new Date(today);
  weekAgo.setDate(weekAgo.getDate() - 7);
  if (messageDate > weekAgo) {
    return date.toLocaleDateString([], { weekday: 'long' });
  }
  
  // For older messages
  return date.toLocaleDateString([], { month: 'long', day: 'numeric', year: 'numeric' });
};

export const isSameDay = (timestamp1: string | Date, timestamp2: string | Date): boolean => {
  const date1 = parseTimestamp(timestamp1);
  const date2 = parseTimestamp(timestamp2);
  
  return date1.getDate() === date2.getDate() &&
         date1.getMonth() === date2.getMonth() &&
         date1.getFullYear() === date2.getFullYear();
};

export const shouldShowTimestampHeaderByDate = (
  currentMsg: MessageType, 
  previousMsg: MessageType | undefined
): boolean => {
  if (!previousMsg) return true;
  
  return !isSameDay(currentMsg.created_at, previousMsg.created_at);
};





