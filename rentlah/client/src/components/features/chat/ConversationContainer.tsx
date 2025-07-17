import React from 'react';
import { Card } from '@/components/ui/card';

type Props = React.PropsWithChildren<Record<string, never>>;
const ConversationContainer: React.FC<Props> = ({ children }) => {
  return (
    <Card className="w-full h-[calc(100svh)] lg:h-full p-2 flex flex-col gap-2">
        {children}
    </Card>  
  );
}

export default ConversationContainer
