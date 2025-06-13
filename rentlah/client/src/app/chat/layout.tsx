import CommunityBar from "@/components/features/chat/CommunityBar";
import ItemList from "@/components/features/chat/item-list/ItemList";
import DMConversationItem from "@/app/chat/_components/DMConversationItem";

type Props = {
  children: React.ReactNode;
};

const ChatLayout = ({ children }: Props) => {
  return (
    <div className="flex flex-col h-screen">
      <CommunityBar />

      <div className="flex flex-1 overflow-hidden">
        <ItemList title="Chat" action={null} className="overflow-y-auto">
          <DMConversationItem 
          key={"1"}
          id={"1"}
          username={"Alice"}
          imageUrl={"https://i.pravatar.cc/150?img=1"}/>
        </ItemList>


        <main className="flex-1 p-4 overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  );
};

export default ChatLayout;