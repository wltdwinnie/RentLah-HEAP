
import React from 'react';

interface TimestampHeaderProps {
  timestamp: string;
}

const TimestampHeader: React.FC<TimestampHeaderProps> = ({ timestamp }) => {
  return (
    <div className="flex justify-center my-4">
      <div className="bg-gray-300 text-gray-600 text-xs px-3 py-1 rounded-full">
        {timestamp}
      </div>
    </div>
  );
};

export default TimestampHeader;