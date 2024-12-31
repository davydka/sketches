"use client";

import React, { useCallback, useEffect, useRef } from "react";
import { useAppSelector } from "@/store/hooks";
import PageWrapper from "@/components/PageWrapper";
import { type Sketch } from "@p5-wrapper/react";
import { NextReactP5Wrapper } from "@p5-wrapper/next";

export default function Home() {
  const centerColumnTarget = useAppSelector(
    (state) => state.ui.centerColumnTarget,
  );

  const sketch: Sketch = useCallback(
    (p5) => {
      const gridCount = 5; // Number of rows and columns

      p5.setup = () => {
        p5.createCanvas(centerColumnTarget, centerColumnTarget); // Set canvas size
        p5.textAlign(p5.CENTER, p5.CENTER); // Center text alignment
        p5.textSize(12); // Adjust text size
      };

      p5.draw = () => {
        p5.clear(); // Clear the canvas
        p5.background(0, 0, 0, 0); // transparent background
        p5.strokeWeight(p5.width * 0.01); // Set line width

        const w = p5.width * 0.1; // Width of the rectangle
        const h = p5.height * 0.1; // Height of the rectangle
        const gap = p5.width * 0.03; // Gap between rectangles
        const ix = p5.width * 0.17; // Initial x offset
        const iy = p5.height * 0.17; // Initial y offset
        const off = p5.width * 0.02; // Offset for inner rectangles

        for (let i = 0; i < gridCount; i++) {
          for (let j = 0; j < gridCount; j++) {
            const x = ix + (w + gap) * i;
            const y = iy + (h + gap) * j;

            // Draw outer rectangle
            p5.stroke(255); // White stroke
            p5.noFill(); // No fill for rectangles
            p5.rect(x, y, w, h);

            // Draw the text
            p5.fill(255); // White fill for text
            p5.noStroke(); // Disable stroke for text
            // p5.text(`i:${i}, j:${j}`, x + w / 2, y + h / 2); // Text in center of box

            // Draw the inner rectangle with a 50% chance
            if (Math.random() > 0.5) {
              p5.stroke(255); // White stroke
              p5.noFill(); // No fill
              p5.rect(x + off / 2, y + off / 2, w - off, h - off);
            }
          }
        }

        // p5.noLoop(); // Stop looping once the drawing is complete
      };
    },
    [centerColumnTarget],
  );

  return (
    <PageWrapper>
      <NextReactP5Wrapper sketch={sketch} />
    </PageWrapper>
  );
}
