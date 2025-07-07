import { MessageSquare } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

const useNavigation = () => {
  const pathname = usePathname();

  const paths = useMemo(() => [
    {
      name: "Chat",
      href: "/chat",
      icon: MessageSquare,
      active: pathname.startsWith("/chat"),
    },
  ], [pathname]); 

  return paths;
};

export default useNavigation;
