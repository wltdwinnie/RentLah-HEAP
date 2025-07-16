import React from 'react';

type Props = {
  children: React.ReactNode;
  params: { chatid: string };
};

const ConversationLayout = ({ children }: Props) => {
  return (
    <>
      {children}
    </>
  );
};

export default ConversationLayout;
