"use client";

import { Button } from "@/components/ui/button";

const communities = [
  { name: "NUS", description: "National University of Singapore" },
  { name: "NTU", description: "Nanyang Technological University" },
  { name: "SMU", description: "Singapore Management University" },
  { name: "SIT", description: "Singapore Institute of Technology" },
  { name: "SUTD", description: "Singapore University of Technology and Design" },
];

const CommunityBar = () => {
  return (
    <div className="w-full px-4 py-4 border-b border-gray-200 bg-white">
      <h2 className="text-xl font-bold mb-3">Communities</h2>

      <div className="flex flex-wrap gap-3 justify-center">
        {communities.map((community) => (
          <div
            key={community.name}
            className="border rounded-lg px-4 py-2 w-48 shadow-sm bg-gray-50"
          >
            <h3 className="text-md font-semibold">{community.name}</h3>
            <p className="text-sm text-gray-600">{community.description}</p>
          </div>
        ))}
        <Button variant="ghost" className="text-blue-500 self-center">
          View All
        </Button>
      </div>
    </div>
  );
};

export default CommunityBar;