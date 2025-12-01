"use client";

import React, { useState, useRef, useEffect } from "react";
import { StickyNote } from "@/app/lib/definitions";
import { TrashIcon, PaintBrushIcon } from "@heroicons/react/24/outline";
import { updateStickyNote, deleteStickyNote } from "@/app/lib/actions";
import { useDebouncedCallback } from "use-debounce";

const colorClasses: Record<StickyNote["color"], string> = {
  yellow: "bg-yellow-200 border-yellow-400",
  pink: "bg-pink-200 border-pink-400",
  blue: "bg-blue-200 border-blue-400",
  green: "bg-green-200 border-green-400",
  orange: "bg-orange-200 border-orange-400",
  purple: "bg-purple-200 border-purple-400",
};

interface StickyNoteProps {
  note: StickyNote;
  onColorChange: (id: string, color: StickyNote["color"]) => void;
  onDelete: (id: string) => void;
}

export function StickyNoteComponent({ note, onColorChange, onDelete }: StickyNoteProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(note.content);
  const [isHovered, setIsHovered] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [position, setPosition] = useState({ x: note.position_x, y: note.position_y });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const noteRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const colorPickerRef = useRef<HTMLDivElement>(null);

  const colors: StickyNote["color"][] = ["yellow", "pink", "blue", "green", "orange", "purple"];

  // Sync content and position when note prop changes
  useEffect(() => {
    setContent(note.content);
    setPosition({ x: note.position_x, y: note.position_y });
  }, [note.content, note.position_x, note.position_y]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [content]);

  // Close color picker when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        colorPickerRef.current &&
        !colorPickerRef.current.contains(event.target as Node)
      ) {
        setShowColorPicker(false);
      }
    }

    if (showColorPicker) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [showColorPicker]);

  const debouncedPositionUpdate = useDebouncedCallback(
    async (x: number, y: number) => {
      try {
        await fetch(`/api/sticky-notes/${note.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ position_x: x, position_y: y }),
        });
      } catch (error) {
        console.error("Failed to update position:", error);
      }
    },
    500
  );

  // Handle drag start (mouse)
  const handleMouseDown = (e: React.MouseEvent) => {
    // Don't start drag if clicking on buttons or textarea
    if (
      (e.target as HTMLElement).closest("button") ||
      (e.target as HTMLElement).tagName === "TEXTAREA" ||
      isEditing
    ) {
      return;
    }

    setIsDragging(true);
    const rect = noteRef.current?.getBoundingClientRect();
    if (rect) {
      // Calculate offset from mouse position to note's current position
      setDragOffset({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      });
    }
    e.preventDefault();
  };

  // Handle drag start (touch)
  const handleTouchStart = (e: React.TouchEvent) => {
    // Don't start drag if clicking on buttons or textarea
    if (
      (e.target as HTMLElement).closest("button") ||
      (e.target as HTMLElement).tagName === "TEXTAREA" ||
      isEditing
    ) {
      return;
    }

    const touch = e.touches[0];
    setIsDragging(true);
    const rect = noteRef.current?.getBoundingClientRect();
    if (rect && touch) {
      // Calculate offset from touch position to note's current position
      setDragOffset({
        x: touch.clientX - position.x,
        y: touch.clientY - position.y,
      });
    }
    e.preventDefault();
  };

  // Handle drag (mouse and touch)
  useEffect(() => {
    if (!isDragging) return;

    const handleMove = (clientX: number, clientY: number) => {
      const newX = clientX - dragOffset.x;
      const newY = clientY - dragOffset.y;
      setPosition({ x: newX, y: newY });
      debouncedPositionUpdate(newX, newY);
    };

    const handleMouseMove = (e: MouseEvent) => {
      handleMove(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        handleMove(touch.clientX, touch.clientY);
        e.preventDefault(); // Prevent scrolling while dragging
      }
    };

    const handleEnd = () => {
      setIsDragging(false);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleEnd);
    document.addEventListener("touchmove", handleTouchMove, { passive: false });
    document.addEventListener("touchend", handleEnd);
    document.addEventListener("touchcancel", handleEnd);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleEnd);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleEnd);
      document.removeEventListener("touchcancel", handleEnd);
    };
  }, [isDragging, dragOffset, debouncedPositionUpdate]);

  const handleContentChange = async (newContent: string) => {
    setContent(newContent);
    const formData = new FormData();
    formData.append("content", newContent);
    formData.append("color", note.color);
    await updateStickyNote(note.id, formData);
  };

  const handleColorSelect = async (color: StickyNote["color"]) => {
    setShowColorPicker(false);
    const formData = new FormData();
    formData.append("content", content);
    formData.append("color", color);
    await updateStickyNote(note.id, formData);
    onColorChange(note.id, color);
  };

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this note?")) {
      await deleteStickyNote(note.id);
      onDelete(note.id);
    }
  };

  // Random rotation for visual interest (-2 to 2 degrees)
  const rotation = ((note.id.charCodeAt(0) + note.id.charCodeAt(1)) % 5) - 2;

  return (
    <div
      ref={noteRef}
      className={`absolute ${colorClasses[note.color]} border-2 rounded-lg shadow-lg p-4 ${
        isDragging ? "cursor-grabbing z-50" : "cursor-move z-10"
      } min-w-[200px] max-w-[300px] overflow-hidden`}
      style={{
        transform: `translate(${position.x}px, ${position.y}px) rotate(${rotation}deg)`,
        width: `${note.width}px`,
        minHeight: `${note.height}px`,
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Drag handle - entire note is draggable */}
      <div className="drag-handle w-full h-full overflow-hidden">
          {/* Action buttons - show on hover */}
          {isHovered && (
            <div className="absolute top-2 right-2 flex gap-1 z-10">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowColorPicker(!showColorPicker);
                }}
                className="p-1 bg-white/80 rounded hover:bg-white transition"
                title="Change color"
              >
                <PaintBrushIcon className="w-4 h-4 text-gray-700" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete();
                }}
                className="p-1 bg-white/80 rounded hover:bg-red-100 transition"
                title="Delete note"
              >
                <TrashIcon className="w-4 h-4 text-red-600" />
              </button>
            </div>
          )}

          {/* Color picker dropdown */}
          {showColorPicker && (
            <div
              ref={colorPickerRef}
              className="absolute top-10 right-2 bg-white rounded-lg shadow-lg p-2 z-20 flex gap-2"
            >
              {colors.map((color) => (
                <button
                  key={color}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleColorSelect(color);
                  }}
                  className={`w-8 h-8 rounded border-2 ${
                    colorClasses[color]
                  } ${note.color === color ? "ring-2 ring-gray-800" : ""}`}
                  title={color}
                />
              ))}
            </div>
          )}

          {/* Content area */}
          {isEditing ? (
            <textarea
              ref={textareaRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onBlur={() => {
                setIsEditing(false);
                handleContentChange(content);
              }}
              onKeyDown={(e) => {
                if (e.key === "Escape") {
                  setIsEditing(false);
                  setContent(note.content);
                }
                if (e.key === "Enter" && e.ctrlKey) {
                  setIsEditing(false);
                  handleContentChange(content);
                }
              }}
              className="w-full bg-transparent border-none outline-none resize-none text-gray-800 font-medium break-words overflow-wrap-anywhere"
              style={{ 
                minHeight: "100px",
                maxWidth: "100%",
                wordWrap: "break-word",
                overflowWrap: "break-word",
                wordBreak: "break-word"
              }}
              autoFocus
            />
          ) : (
            <div
              onClick={() => setIsEditing(true)}
              className="text-gray-800 font-medium whitespace-pre-wrap cursor-text min-h-[100px] break-words overflow-wrap-anywhere"
              style={{
                wordWrap: "break-word",
                overflowWrap: "break-word",
                wordBreak: "break-word",
                overflow: "hidden",
                maxWidth: "100%"
              }}
            >
              {content || "Click to edit..."}
            </div>
          )}
        </div>
      </div>
  );
}

