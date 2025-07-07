import React from 'react';

type Props = {
  children: React.ReactNode;
  params: { chatid: string }; // optional, if you need the route param
};

const ConversationLayout = ({ children }: Props) => {
  return (
    <>
      {children}
    </>
  );
};

export default ConversationLayout;
