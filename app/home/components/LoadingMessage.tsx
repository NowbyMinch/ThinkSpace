// components/LoadingMessage.tsx
import React from "react";

export default function LoadingMessage() {
  return (
    <div className="flex items-start gap-2 w-full max-w-[600px]">
      {/* Icon */}
      <div className="w-8 h-8 rounded-full flex items-center justify-center">
        <img src="/Think.png" alt="" />
      </div>

      {/* Chat bubble */}
      <div className="bg-[#9b8afb62] text-white rounded-2xl px-4 py-3 max-w-[80%]">
        <div className="typing">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
}
