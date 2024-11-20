/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from 'react';
import { Excalidraw } from "@excalidraw/excalidraw";
import { useTheme } from "next-themes";
import { cn } from '@/lib/utils';

interface CanvasProps {
  documentId: string;
  canvasData?: any[];
  onChange: (newElements: any[]) => void;
  isArchived?:boolean
}

export const Canvas = ({ isArchived,documentId, canvasData, onChange }: CanvasProps) => {
  const { resolvedTheme } = useTheme();
  const [elements, setElements] = useState(canvasData || []);

  useEffect(() => {
    setElements(canvasData);
  }, [canvasData]);

  const handleChange = (newElements) => {
    setElements(newElements);
    onChange(newElements);
  };

  return (
    <div className={cn(!isArchived && "h-[94%] mt-10", isArchived && "mt-24 h-[87%]","overflow-hidden w-full ")}>
      <Excalidraw
        theme={resolvedTheme === "dark" ? "dark" : "light"}
        initialData={{ elements }}
        onChange={handleChange}
      />
    </div>
  );
};
