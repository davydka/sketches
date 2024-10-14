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
import { useAppDispatch } from "@/store/hooks";
import { setCenterColumnTarget } from "@/store/slices/ui.slice";
import Header from "@/components/Header";
import { useGlobalRefs, GlobalRefKeys } from "@/hooks/useGlobalRefs";
import { cn } from "@/utils/styles";
import useResize from "@/hooks/useResize/useResize";

const initialNodes = [
  { id: "1", position: { x: 100, y: 100 }, data: { label: "1" } },
  { id: "2", position: { x: 100, y: 200 }, data: { label: "2" } },
];

const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];

const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();

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
    setDimensions({ width, height, target });
    dispatch(setCenterColumnTarget(target));
  }, [dimensions.width, dimensions.height, dispatch]);
  useResize(handleResize);
  // endregion

  return (
    <main className="grid min-h-screen grid-rows-[auto_1fr_auto] px-4 py-4">
      <Header className="mb-4" />

      <main className="grid grid-cols-1 gap-4 p-4 md:grid-cols-[200px_1fr_200px]">
        <div className="bg-secondary rounded-lg p-4 shadow-md">
          <h2 className="mb-2 text-xl font-semibold">Column left</h2>
          <p className="text-secondary-foreground">
            This is the content for column left.
          </p>
        </div>

        <div
          className={cn([
            "min-w-0", // Override default grid behavior. By default, a grid item cannot be smaller than the size of its content.
            "relative flex items-center justify-center",
          ])}
          ref={centerColumnRef}
        >
          {children}
        </div>

        <div className="bg-secondary rounded-lg p-4 shadow-md">
          <h2 className="mb-2 text-xl font-semibold">Column right</h2>
          <p className="text-secondary-foreground">
            This is the content for column right.
          </p>
        </div>
      </main>

      <footer>hello footer</footer>

      <div className="pointer-events-none fixed inset-0 z-50 h-full">
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
      </div>
    </main>
  );
};

export default PageWrapper;
