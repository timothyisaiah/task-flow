"use client"
import { useState } from "react";

export function ExpandableDescription({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false);
  const isLong = text.length > 150;
  const displayText = expanded || !isLong ? text : text.slice(0, 150) + "...";

  return (
    <p className="text-gray-700 dark:text-gray-300 text-sm">
      {displayText}
      {isLong && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="ml-2 text-blue-600 dark:text-blue-400 underline"
        >
          {expanded ? "Show less" : "Read more"}
        </button>
      )}
    </p>
  );
}
