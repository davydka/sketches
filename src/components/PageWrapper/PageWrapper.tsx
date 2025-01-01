import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ReactFlow,
  MiniMap,
  Connection,
  Controls,
  useNodesState,
  useEdgesState,
  addEdge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setCenterColumnTarget } from "@/store/slices/ui.slice";
import Header from "@/components/Header";
import { useGlobalRefs, GlobalRefKeys } from "@/hooks/useGlobalRefs";
import { cn } from "@/utils/styles";
import useResize from "@/hooks/useResize/useResize";

const initialNodes = [
  {
    id: "frameCount",
    position: { x: 100, y: 100 },
    data: { label: "Frame Count" },
  },
  {
    id: "speedMultiplier0",
    position: { x: 100, y: 200 },
    data: { label: "Speed Multiplier" },
  },
  {
    id: "speedMultiplier1",
    position: { x: 300, y: 200 },
    data: { label: "Speed Multiplier" },
  },
  {
    id: "speedMultiplier2",
    position: { x: 500, y: 200 },
    data: { label: "Speed Multiplier" },
  },
  {
    id: "rotationX",
    position: { x: 100, y: 300 },
    data: { label: "Rotation X" },
  },
  {
    id: "rotationY",
    position: { x: 300, y: 300 },
    data: { label: "Rotation Y" },
  },
  {
    id: "rotationZ",
    position: { x: 500, y: 300 },
    data: { label: "Rotation Z" },
  },
];

const initialEdges = [
  { id: "e1-2", source: "frameCount", target: "speedMultiplier0" },
];

const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const showDevtools = useAppSelector((state) => state.devtools.showDevtools);

  const centerColumnRef = useRef<HTMLDivElement>(null);
  const { setRef } = useGlobalRefs();

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  useEffect(() => {
    setRef(GlobalRefKeys.CENTER_COLUMN, centerColumnRef);
  }, [setRef]);

  // region Resize
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
    target: 0,
  });

  const handleResize = useCallback(() => {
    const { width: _width, height: _height } =
      centerColumnRef?.current?.getBoundingClientRect() || {};

    const width = Math.floor(_width || 0);
    const height = Math.floor(_height || 0);

    if (width === undefined || height === undefined) return;
    if (width === dimensions.width && height === dimensions.height) return;

    let target = width;
    if (width > height) {
      target = height;
    }

    if (showDevtools) {
      console.log("PageWrapper handleResize - setCenterColumnTarget");
      console.table({ target, width, height });
    }

    setDimensions({ target, width, height });
    dispatch(setCenterColumnTarget(target));
  }, [dimensions.width, dimensions.height, showDevtools, dispatch]);
  useResize(handleResize);
  // endregion

  const MenuList = ({
    className,
    items,
  }: {
    className?: string;
    items: string[]; // todo: temp item datatype
  }) => {
    return (
      <ul
        className={cn([
          "bg-secondary p text-secondary-foreground flex flex-1 items-center rounded-lg shadow-md md:flex-col",
          showDevtools && "border border-white",
          className,
        ])}
      >
        {items.map((item, index) => (
          <li key={index} className="cursor-pointer">
            {item}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <main className="grid min-h-screen grid-rows-[auto_1fr_auto] px-4 py-4">
      <Header className="mb-4" />

      <main className="grid grid-cols-1 grid-rows-[40px_40px_1fr] gap-4 md:grid-cols-[40px_1fr_40px] md:grid-rows-1">
        <MenuList items={["◉", "✿", "✿"]} />

        {/*Mobile*/}
        <MenuList
          className={cn([
            "flex flex-row-reverse md:hidden", // Show on mobile
          ])}
          items={["◉", "✿", "✿"]}
        />

        <div
          className={cn([
            "min-w-0", // Override default grid behavior. By default, a grid item cannot be smaller than the size of its content.
            "relative flex justify-center md:items-center",
            showDevtools &&
              "[&_canvas]:rounded-lg [&_canvas]:border [&_canvas]:border-white",
          ])}
          ref={centerColumnRef}
        >
          {children}
        </div>

        {/*Desktop*/}
        <MenuList
          className={cn([
            "hidden md:flex", // Hide on mobile
          ])}
          items={["◉", "✿", "✿"]}
        />
      </main>

      <footer
        className={cn([
          "bg-secondary text-secondary-foreground p-4 text-center",
        ])}
      >
        <span className="cursor-pointer">皿</span>
      </footer>

      <div className="pointer-events-none fixed inset-0 z-50 h-full">
        {showDevtools && (
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            colorMode="dark"
            proOptions={{ hideAttribution: true }}
            style={{
              backgroundColor: "transparent",
            }}
          >
            <MiniMap />
            <Controls />
          </ReactFlow>
        )}
      </div>
    </main>
  );
};

export default PageWrapper;
