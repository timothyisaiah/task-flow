import React from "react";
import { fetchStickyNotes } from "@/app/lib/data";
import { WhiteboardCanvas } from "@/app/ui/whiteboard/whiteboard-canvas";
import ThemeToggle from "@/app/ui/toggletheme";

export default async function WhiteboardPage() {
  let notes = [];
  try {
    notes = await fetchStickyNotes();
  } catch (error) {
    console.error("Error loading sticky notes:", error);
    // If table doesn't exist yet, return empty array
    notes = [];
  }

  return (
    <div className="relative">
      <div className="absolute top-4 right-4 z-50">
        <ThemeToggle />
      </div>
      <WhiteboardCanvas initialNotes={notes} />
    </div>
  );
}


