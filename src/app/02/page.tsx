"use client";

// @ts-ignore
// import canvasSketch from "../../../canvas-sketch/lib/canvas-sketch";
// @ts-ignore
import canvasSketch from "canvas-sketch";
// @ts-ignore
import { math, random } from "canvas-sketch-util";
import React, { useCallback, useEffect, useRef } from "react";
import PageWrapper from "@/components/PageWrapper";
import { useAppSelector } from "@/store/hooks";

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

      const cx = width * 0.5;
      const cy = width * 0.5;

      const w = width * 0.01;
      const h = height * 0.1;

      const num = 40;
      const radius = width * 0.3;

      for (let i = 0; i < num; i++) {
        const slice = math.degToRad(360 / num);
        const angle = slice * i;

        const x = cx + radius * Math.sin(angle);
        const y = cy + radius * Math.cos(angle);

        context.fillStyle = "white";
        context.strokeStyle = "white";

        context.save();
        context.translate(x, y);
        context.rotate(-angle);
        context.scale(random.range(0.1, 2), random.range(0.2, 0.5));

        context.beginPath();
        context.rect(-w * 0.5, random.range(0, h * 0.5), w, h);
        context.fill();
        context.restore();

        context.save();
        context.translate(cx, cy);
        context.rotate(-angle);

        context.lineWidth = random.range(5, 20);

        context.beginPath();
        context.arc(
          0,
          0,
          radius * random.range(0.7, 1.3),
          slice * random.range(1, -8),
          slice * random.range(1, 5),
        );
        context.stroke();

        context.restore();
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
        // animate: true,
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
