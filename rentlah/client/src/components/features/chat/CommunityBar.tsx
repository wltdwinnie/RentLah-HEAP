"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { Card } from "@/components/ui/card";

const communities = [
  {
    name: "NUS",
    logo: "/logos/NUS.jpg",
    fallbackLogo: "https://ui-avatars.com/api/?name=NUS&size=64&background=003d7a&color=ffffff&format=png",
    fullName: "National University of Singapore"
  },
  {
    name: "NTU",
    logo: "https://logo.clearbit.com/ntu.edu.sg",
    fallbackLogo: "https://ui-avatars.com/api/?name=NTU&size=64&background=e31837&color=ffffff&format=png",
    fullName: "Nanyang Technological University"
  },
  {
    name: "SMU",
    logo: "https://logo.clearbit.com/smu.edu.sg",
    fallbackLogo: "https://ui-avatars.com/api/?name=SMU&size=64&background=8b0000&color=ffffff&format=png",
    fullName: "Singapore Management University"
  },
  {
    name: "SIT",
    logo: "/logos/SIT.png",
    fallbackLogo: "https://ui-avatars.com/api/?name=SIT&size=64&background=0066cc&color=ffffff&format=png",
    fullName: "Singapore Institute of Technology"
  },
  {
    name: "SUTD",
    logo: "/logos/SUTD.png",
    fallbackLogo: "https://ui-avatars.com/api/?name=SUTD&size=64&background=ff6b35&color=ffffff&format=png",
    fullName: "Singapore University of Technology and Design"
  },
];


type Props = {
  onSelectCommunity: (name: string) => void;
};

const CommunityBar = ({ onSelectCommunity }: Props) => {
  const [open, setOpen] = useState(true);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const handleImageError = (communityName: string) => {
    setImageErrors(prev => ({ ...prev, [communityName]: true }));
  };

  return (
    <Card className="p-4 w-full max-w-full">
      <div
        className="flex items-center justify-between cursor-pointer select-none"
        onClick={() => setOpen(!open)}
      >
        <h2 className="text-2xl font-bold tracking-tight text-[#192e9a]">Communities</h2>
        <ChevronDown
          className={`h-4 w-4 text-gray-500 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </div>

      {open && (
        <div className="mt-2 space-y-1">
          {communities.map((comm) => (
            <button
              key={comm.name}
              onClick={() => onSelectCommunity(comm.name.toLowerCase())}
              className="flex items-center gap-3 hover:bg-gray-100 p-2 rounded-md w-full"
              title={comm.fullName}
            >
              <div className="relative w-10 h-10 flex-shrink-0">
                <Image
                  src={imageErrors[comm.name] ? comm.fallbackLogo : comm.logo}
                  alt={`${comm.name} logo`}
                  width={40}
                  height={40}
                  className="object-contain rounded"
                  onError={() => handleImageError(comm.name)}
                />
              </div>
              <span className="text-sm font-medium whitespace-nowrap overflow-hidden text-ellipsis">
                {comm.name}
              </span>
            </button>
          ))}
        </div>
      )}
    </Card>
  );
};

export default CommunityBar;