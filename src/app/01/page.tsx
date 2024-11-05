"use client";

// @ts-ignore
// import canvasSketch from "../../../canvas-sketch/lib/canvas-sketch";
// @ts-ignore
import canvasSketch from "canvas-sketch";
import React, { useCallback, useEffect, useRef } from "react";
import PageWrapper from "@/components/PageWrapper";
import { useAppSelector } from "@/store/hooks";
import { Canvas } from "@/components/Canvas";

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
      context.fillStyle = "black";
      context.fillRect(0, 0, width, height);
      context.lineWidth = width * 0.01;

      const w = width * 0.1;
      const h = height * 0.1;
      const gap = width * 0.03;
      const ix = width * 0.17;
      const iy = height * 0.17;

      const off = width * 0.02;

      let x, y;

      for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
          x = ix + (w + gap) * i;
          y = iy + (h + gap) * j;

          context.strokeStyle = "white";
          context.beginPath();
          context.rect(x, y, w, h);
          context.stroke();

          // Draw the text
          context.fillText(`i:${i}, j:${j}`, x + w / 2, y + h / 2); // Position text in the center of the box

          if (Math.random() > 0.5) {
            context.strokeStyle = "white";
            context.beginPath();
            context.rect(x + off / 2, y + off / 2, w - off, h - off);
            context.stroke();
          }
        }
      }
    },
    [],
  );

  useEffect(() => {
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
      <Canvas ref={ref} />
    </PageWrapper>
  );
}
