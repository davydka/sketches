"use client";

import * as React from "react";
import { useAppSelector } from "@/store/hooks";
import { cn } from "@/utils/styles";

const Canvas = React.forwardRef<
  HTMLCanvasElement,
  React.HTMLAttributes<HTMLCanvasElement>
>(({ className, ...props }, ref) => {
  const { showDevtools } = useAppSelector((state) => state.devtools);

  return (
    <canvas
      ref={ref}
      className={cn(showDevtools && "border border-white", className)}
      {...props}
    />
  );
});

Canvas.displayName = "Canvas";

export { Canvas };
