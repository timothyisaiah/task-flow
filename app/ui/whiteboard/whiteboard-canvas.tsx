"use client";

import React, { useState, useEffect } from "react";
import { StickyNoteComponent } from "./sticky-note";
import { Toolbar } from "./toolbar";
import { StickyNote } from "@/app/lib/definitions";
import { createStickyNote } from "@/app/lib/actions";
import { useRouter } from "next/navigation";

interface WhiteboardCanvasProps {
  initialNotes: StickyNote[];
}

export function WhiteboardCanvas({ initialNotes }: WhiteboardCanvasProps) {
  const [notes, setNotes] = useState<StickyNote[]>(initialNotes);
  const [selectedColor, setSelectedColor] = useState<StickyNote["color"]>("yellow");
  const router = useRouter();

  // Sync notes when initialNotes change (from router.refresh)
  useEffect(() => {
    setNotes(initialNotes);
  }, [initialNotes]);

  // Refresh notes periodically to get updates from other users
  useEffect(() => {
    const interval = setInterval(() => {
      router.refresh();
    }, 3000); // Refresh every 3 seconds

    return () => clearInterval(interval);
  }, [router]);

  const handleAddNote = async () => {
    // Get viewport center
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const scrollX = window.scrollX || window.pageXOffset;
    const scrollY = window.scrollY || window.pageYOffset;

    const centerX = scrollX + viewportWidth / 2 - 100; // Offset by half note width
    const centerY = scrollY + viewportHeight / 2 - 100; // Offset by half note height

    const formData = new FormData();
    formData.append("content", "");
    formData.append("color", selectedColor);
    formData.append("position_x", centerX.toString());
    formData.append("position_y", centerY.toString());
    formData.append("width", "200");
    formData.append("height", "200");

    await createStickyNote(formData);
    router.refresh();
  };

  const handleColorChange = (id: string, color: StickyNote["color"]) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) => (note.id === id ? { ...note, color } : note))
    );
  };

  const handleDelete = (id: string) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
    router.refresh();
  };

  return (
    <div className="relative w-full min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Toolbar */}
      <Toolbar
        selectedColor={selectedColor}
        onColorChange={setSelectedColor}
        onAddNote={handleAddNote}
      />

      {/* Infinite canvas */}
      <div
        className="relative"
        style={{
          minWidth: "100vw",
          minHeight: "100vh",
          backgroundImage: `
            linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      >
        {notes.map((note) => (
          <StickyNoteComponent
            key={note.id}
            note={note}
            onColorChange={handleColorChange}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}

