"use client"

import React, {useEffect, useRef} from "react";
import Image from "next/image";
// @ts-ignore
import canvasSketch from "canvas-sketch";

export type CanvasDrawingProps = {
  context: CanvasRenderingContext2D;
  width: number;
  height: number;
  playhead: number;
};

const WIDTH = 400;
const HEIGHT = 400;

export default function Home() {
  const ref = useRef<HTMLCanvasElement | null>(null);

  const draw = ({context, width, height, playhead, ...rest}: CanvasDrawingProps) => {
    // Fill the canvas with pink
    context.fillStyle = 'pink';
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
    context.fillStyle = 'white';
    context.save();
    context.translate(cx, cy);
    context.rotate(rotation);
    context.fillRect(-thickness / 2, -length / 2, thickness, length);
    context.restore();
  };

  useEffect(() => {
    console.log("running canvas useEffect");

    canvasSketch(() => {
      return draw
    }, {
      dimensions: [WIDTH, HEIGHT],
      units: "px",
      resizeCanvas: true,
      styleCanvas: true,
      scaleToView: false,
      canvas: ref.current,
      animate: true,
      duration: 3,
      fps: 30
    });

    return function cleanUp() {
      console.log("Canvas unmounting");
    };
  }, [draw]);

  return (
    <main className="flex p-24 min-h-screen flex-col items-center">
      <div className="w-full items-center justify-between font-mono text-sm">
        <Image
          src="/comedy-and-tragedy.svg"
          alt="Comedy & Tragedy"
          className="dark:invert"
          width={100}
          height={100}
          priority
        />
      </div>
      <canvas
        ref={ref}
      />
    </main>
  );
}
