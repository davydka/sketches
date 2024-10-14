"use client";

// @ts-ignore
// import canvasSketch from "../../canvas-sketch/lib/canvas-sketch";
// @ts-ignore
import canvasSketch from "canvas-sketch";
import React, { useCallback, useEffect, useRef } from "react";
import { useAppSelector } from "@/store/hooks";
import PageWrapper from "@/components/PageWrapper";

export type CanvasDrawingProps = {
  context: CanvasRenderingContext2D;
  width: number;
  height: number;
  playhead: number;
};

export default function Home() {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const { centerColumnTarget } = useAppSelector((state) => state.ui);

  const draw = useCallback(
    ({ context, width, height, playhead, ...rest }: CanvasDrawingProps) => {
      // Fill the canvas with pink
      context.fillStyle = "black";
      context.fillRect(0, 0, width, height);

      // Get a seamless 0..1 value for our loop
      const t = Math.sin(playhead * Math.PI);

      // Animate the thickness with 'playhead' prop
      const thickness = Math.max(5, Math.pow(t, 0.55) * width * 0.5);

      // Rotate with PI to create a seamless animation
      const rotation = playhead * Math.PI;

      // Draw a rotating white rectangle around the center
      const cx = width / 2;
      const cy = height / 2;
      const length = height * 0.5;
      context.fillStyle = "white";
      context.save();
      context.translate(cx, cy);
      context.rotate(rotation);
      context.fillRect(-thickness / 2, -length / 2, thickness, length);
      context.restore();
    },
    [],
  );

  useEffect(() => {
    if (!centerColumnTarget) return;

    canvasSketch(
      () => {
        return draw;
      },
      {
        dimensions: [centerColumnTarget, centerColumnTarget],
        units: "px",
        resizeCanvas: true,
        styleCanvas: true,
        scaleToView: false,
        canvas: ref.current,
        animate: true,
        duration: 3,
        fps: 30, // export frame rate
      },
    );
  }, [centerColumnTarget, draw]);

  return (
    <PageWrapper>
      <canvas ref={ref} />
    </PageWrapper>
  );
}
