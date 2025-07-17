import * as React from "react";
import Image from "next/image";

type AvatarProps = {
  children: React.ReactNode;
  className?: string;
};

export function Avatar({ children, className }: AvatarProps) {
  return (
    <div className={`relative h-10 w-10 rounded-full overflow-hidden bg-gray-200 ${className}`}>
      {children}
    </div>
  );
}

type AvatarImageProps = {
  src?: string;
  alt?: string;
  className?: string;
};

export function AvatarImage({ src, alt = "avatar", className }: AvatarImageProps) {
  const fallback = "/assets/profile_pic.webp";
  const safeSrc = !src ? fallback : src;

  return (
    <Image 
      src={safeSrc}
      alt={alt}
      className={`h-full w-full object-cover ${className}`} 
      width={40} 
      height={40} 
    />
  );
}

type AvatarFallbackProps = {
  children: React.ReactNode;
  className?: string;
};

export function AvatarFallback({ children, className }: AvatarFallbackProps) {
  return (
    <div className={`flex items-center justify-center h-full w-full text-sm text-gray-500 ${className}`}>
      {children}
    </div>
  );
}