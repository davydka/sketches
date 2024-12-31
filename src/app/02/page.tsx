"use client";

import React, { useCallback } from "react";
import PageWrapper from "@/components/PageWrapper";
import { useAppSelector } from "@/store/hooks";
import { type Sketch } from "@p5-wrapper/react";
import { NextReactP5Wrapper } from "@p5-wrapper/next";

export default function Home() {
  const centerColumnTarget = useAppSelector(
    (state) => state.ui.centerColumnTarget,
  );

  const sketch: Sketch = useCallback(
    (p5) => {
      const num = 40; // Number of shapes in the circle
      let radius: number;
      let w: number, h: number;

      p5.setup = () => {
        p5.createCanvas(centerColumnTarget, centerColumnTarget); // Set canvas size
        p5.rectMode(p5.CENTER); // Center rectangles at their position
        radius = p5.width * 0.3; // Circle radius
        w = p5.width * 0.01; // Width of each rectangle
        h = p5.height * 0.1; // Height of each rectangle
      };

      p5.draw = () => {
        p5.background(0); // Clear the canvas with black background

        const cx = p5.width * 0.5; // Center x
        const cy = p5.height * 0.5; // Center y
        const slice = p5.TWO_PI / num; // Angle for each slice

        for (let i = 0; i < num; i++) {
          const angle = slice * i; // Calculate angle for this slice

          // Calculate positions for rectangle
          const x = cx + radius * Math.sin(angle);
          const y = cy + radius * Math.cos(angle);

          // Draw rectangle
          p5.push();
          p5.translate(x, y); // Move to calculated position
          p5.rotate(-angle); // Rotate based on angle
          const scaleX = p5.random(0.1, 2); // Random scale factor for x
          const scaleY = p5.random(0.2, 0.5); // Random scale factor for y
          p5.scale(scaleX, scaleY); // Apply scaling
          const rectY = p5.random(0, h * 0.5); // Random y offset for rect
          p5.noStroke();
          p5.fill(255); // White fill
          p5.rect(0, rectY, w, h); // Draw centered rectangle
          p5.pop();

          // Draw arcs
          p5.push();
          p5.translate(cx, cy); // Move to center of canvas
          p5.rotate(-angle); // Rotate based on angle
          const arcRadius = radius * p5.random(0.7, 1.3); // Random radius for arc
          const arcStart = slice * p5.random(-8, 1); // Random start angle
          const arcEnd = slice * p5.random(1, 5); // Random end angle
          const lineWidth = p5.random(5, 20); // Random line width
          p5.stroke(255); // White stroke
          p5.strokeWeight(lineWidth); // Set stroke weight
          p5.noFill();
          p5.arc(0, 0, arcRadius * 2, arcRadius * 2, arcStart, arcEnd); // Draw arc
          p5.pop();
        }
      };
      p5.noLoop(); // Stop looping once the drawing is complete
    },
    [centerColumnTarget],
  );

  return (
    <PageWrapper>
      <NextReactP5Wrapper sketch={sketch} />
    </PageWrapper>
  );
}
