import ConversationContainer from '@/components/features/chat/ConversationContainer';


/* type Props = {
  params: {
    conversationId:
    Id<"conversation">;
  };
};

const ChatPage = ({ params: {
  conversationId }}: Props) => {
    const conevrsation = useQuery(api.conversation.get, {
      id: conversationId });
    
  

  return (conversation === undefined ?
  <div className = "w-full h-full flex items-center justify-center">
    <Loader2 className=""h-8 w-8/> : conversation === null ? <p className = "w-full h-full flex items-center justify-center">
        Conversation not found
    </p> : <ConversationContainer>
      <Header name = {conversation.isGroup ? conversationId.name : conversationId.otherMember.username}
      imageUrl = {conversationId.isGroup ? undefined : conversationId.otherMember.imageUrl} />
    </ConversationContainer>
  </div>
  )
}; */

import React from 'react'

const ChatPage = () => {
  return (
    <div>
      Body
    </div>
  )
}


export default ChatPage;

