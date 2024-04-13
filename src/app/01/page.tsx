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
    context.fillStyle = 'black';
    context.fillRect(0, 0, width, height);
    context.lineWidth = width * 0.01;

    const w = width * 0.10;
    const h = height * 0.10;
    const gap = width * 0.03;
    const ix = width * 0.17;
    const iy = height * 0.17;

    const off = width * 0.02;

    let x, y;

    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        x = ix + (w + gap) * i;
        y = iy + (h + gap) * j;

        context.beginPath();
        context.rect(x, y, w, h);
        context.stroke();
        context.strokeStyle = 'white';

        if (Math.random() > 0.5) {
          context.beginPath();
          context.rect(x + off / 2, y + off / 2, w - off, h - off);
          context.stroke();
          context.strokeStyle = 'white';
        }
      }
    }
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
