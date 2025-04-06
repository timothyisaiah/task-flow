"use client";
import { useEffect, useState } from "react";

export const DateDisplay = ({ date }: { date: string }) => {
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    const d = new Date(date);
    setFormattedDate(
      d.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    );
  }, [date]);

  return <span>{formattedDate}</span>;
};
