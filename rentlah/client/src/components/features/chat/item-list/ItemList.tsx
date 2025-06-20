import React from 'react';
import { Card } from "@/components/ui/card"

type Props = React.PropsWithChildren<{
    title: string;
    action: React.ReactNode;
    className?: string;
}>

const ItemList = ({ children, title, action: Action, className = "" }: Props) => {
  return (
    <Card className={`w-full max-w-full p-2 overflow-hidden ${className}`}>
        <div className="mb-4 flex items-center justify-between overflow-hidden">
            <h2 className="text-2xl font-bold tracking-tight truncate">{title}</h2>
            {Action ? <div className="flex-shrink-0">{Action}</div> : null}
        </div>
        <div className="w-full h-full flex flex-col items-center justify-start gap-2 overflow-x-hidden overflow-y-auto">
            {children}
        </div>
    </Card>
  )
};

export default ItemList
