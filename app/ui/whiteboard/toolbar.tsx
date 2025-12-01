"use client";

import React from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { StickyNote } from "@/app/lib/definitions";

interface ToolbarProps {
  selectedColor: StickyNote["color"];
  onColorChange: (color: StickyNote["color"]) => void;
  onAddNote: () => void;
}

const colors: StickyNote["color"][] = ["yellow", "pink", "blue", "green", "orange", "purple"];

const colorClasses: Record<StickyNote["color"], string> = {
  yellow: "bg-yellow-200 border-yellow-400",
  pink: "bg-pink-200 border-pink-400",
  blue: "bg-blue-200 border-blue-400",
  green: "bg-green-200 border-green-400",
  orange: "bg-orange-200 border-orange-400",
  purple: "bg-purple-200 border-purple-400",
};

export function Toolbar({ selectedColor, onColorChange, onAddNote }: ToolbarProps) {
  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3 flex items-center gap-3 border border-gray-200 dark:border-gray-700">
      <button
        onClick={onAddNote}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
      >
        <PlusIcon className="w-5 h-5" />
        <span>Add Note</span>
      </button>

      <div className="h-8 w-px bg-gray-300 dark:bg-gray-600" />

      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600 dark:text-gray-300 font-medium">Color:</span>
        <div className="flex gap-2">
          {colors.map((color) => (
            <button
              key={color}
              onClick={() => onColorChange(color)}
              className={`w-8 h-8 rounded border-2 transition ${
                colorClasses[color]
              } ${
                selectedColor === color
                  ? "ring-2 ring-blue-500 ring-offset-2"
                  : "hover:scale-110"
              }`}
              title={color}
            />
          ))}
        </div>
      </div>
    </div>
  );
}


