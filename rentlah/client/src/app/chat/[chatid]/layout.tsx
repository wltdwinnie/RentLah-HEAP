import React from 'react';

// Layout component type definition
interface ChatLayoutProps {
  children: React.ReactNode;
}

// This layout doesn't need to use params directly
const ConversationLayout = ({ children }: ChatLayoutProps) => {
  return (
    <>
      {children}
    </>
  );
};

export default ConversationLayout;
