"use client";

import React, { useCallback, useState } from "react";
import { useAppSelector } from "@/store/hooks";
import PageWrapper from "@/components/PageWrapper";
import { type Sketch } from "@p5-wrapper/react";
import { NextReactP5Wrapper } from "@p5-wrapper/next";

export default function Home() {
  const centerColumnTarget = useAppSelector(
    (state) => state.ui.centerColumnTarget,
  );
  const showDevtools = useAppSelector((state) => state.devtools.showDevtools);

  const [state, setState] = useState({
    speed: 0.01,
  });

  const onRotationChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setState(() => ({
        speed: parseFloat(event.target.value),
      }));
    },
    [],
  );

  const sketch: Sketch = useCallback(
    (p5) => {
      let font: typeof p5.Font;
      let speed = 0.01;

      p5.preload = () => {
        font = p5.loadFont("fonts/Inter_18pt-Regular.ttf");
      };

      p5.setup = () => {
        p5.createCanvas(centerColumnTarget, centerColumnTarget, p5.WEBGL);
        p5.textFont(font);
        p5.textSize(12);
      };

      p5.updateWithProps = (props: any) => {
        if (typeof props.speed === "number") {
          speed = props.speed;
        }
      };

      p5.draw = () => {
        p5.background(0, 0, 0, 0); // transparent background
        p5.noStroke(); // remove the plane outline
        p5.fill(255, 255, 255); // white fill

        if (showDevtools) {
          let fps = p5.frameRate().toFixed(2);
          // Draw text in the bottom-left corner
          p5.push();
          p5.textAlign(p5.LEFT, p5.BOTTOM); // Align text to the bottom-left
          p5.translate(-p5.width / 2, p5.height / 2); // Move origin to bottom-left corner
          p5.text(`FPS: ${fps}`, 10, -10); // Add padding from edges
          p5.text(`speed: ${speed}`, 10, -30); // Add padding from edges
          p5.pop();
        }

        p5.push();
        p5.rotateZ(p5.frameCount * speed);
        p5.rotateX(p5.frameCount * speed);
        p5.rotateY(p5.frameCount * speed);
        p5.plane(centerColumnTarget / 2);
        p5.pop();
      };
    },
    [centerColumnTarget, showDevtools],
  );

  return (
    <PageWrapper>
      {showDevtools && (
        <input
          className="absolute left-0 top-0"
          type="range"
          defaultValue={state.speed}
          min="0.001"
          max=".02"
          step="0.0001"
          onChange={onRotationChange}
        />
      )}
      <NextReactP5Wrapper sketch={sketch} speed={state.speed} />
    </PageWrapper>
  );
}
