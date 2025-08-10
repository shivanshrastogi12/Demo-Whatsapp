import { ProcessedMessage } from '@/types';
import { getStatusIcon, getStatusColor, formatMessageTime } from '@/lib/statusIcons';
import { cn } from '@/lib/utils';

interface MessageBubbleProps {
  message: ProcessedMessage;
  isOwn: boolean;
}

export default function MessageBubble({ message, isOwn }: MessageBubbleProps) {
  const statusIcon = getStatusIcon(message.status);
  const statusColor = getStatusColor(message.status);
  const time = formatMessageTime(message.timestamp);

  return (
    <div className={cn(
      "flex mb-2",
      isOwn ? "justify-end" : "justify-start"
    )}>
      <div className={cn(
        "message-bubble relative group",
        isOwn ? "message-outgoing" : "message-incoming",
        "max-w-[70%] md:max-w-xs"
      )}>
        <div className="text-sm leading-relaxed">
          {message.text}
        </div>
        
        <div className="flex items-center justify-end gap-1 mt-1 text-xs">
          <span className="text-gray-500 text-[11px]">
            {time}
          </span>
          
          {isOwn && statusIcon && (
            <span className={cn("text-[11px] ml-1", statusColor)}>
              {statusIcon}
            </span>
          )}
        </div>
        
        {/* Tooltip on hover showing full timestamp */}
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none z-10">
          {message.timestamp.toLocaleString()}
        </div>
      </div>
    </div>
  );
}
