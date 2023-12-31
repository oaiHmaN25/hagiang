"use client";
import Image from "next/image";
import React, { useCallback, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  Controls,
  MiniMap,
  Background,
  applyEdgeChanges,
  applyNodeChanges,
  ControlButton,
  useReactFlow,
  BackgroundVariant,
} from "reactflow";
import debounce from "lodash.debounce";
import "reactflow/dist/style.css";
import throttle from "lodash.throttle";
import { useDispatch, useSelector } from "react-redux";
import { chartSlice } from "@/redux/slice/chartSlice";
import { putFile } from "@/app/service/servicesApi";
import { useUser } from "@auth0/nextjs-auth0/client";

const initialNodes = [];
const initialEdges = [];
interface RootState {
  chart: {
    flowFunc: any;
    chartData: any[];
    currentFile: number;
  };
}

const { setFlowFunc, setChartData } = chartSlice.actions;
export default function Flowchart() {
  const { user, error, isLoading } = useUser();
  const dispatch = useDispatch();
  const currentFile = useSelector(
    (state: RootState) => state.chart.currentFile,
  );
  const chartData = useSelector((state: RootState) => state.chart.chartData);
  const inputChangeTitle = useRef<HTMLInputElement>(null);
  const connectingNodeId = useRef<string | null>(null);
  const [nodes, setNodes] = useNodesState(initialNodes);
  const [edges, setEdges] = useEdgesState(initialEdges);
  dispatch(setFlowFunc({ setNodes, setEdges }));
  const onNodesChange = useCallback((changes) => {
    return setNodes((nds) => applyNodeChanges(changes, nds));
  }, []);
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [],
  );

  const handleChangeTitleNode = (event, node) => {
    if (inputChangeTitle.current) {
      inputChangeTitle.current.disabled = false;
      inputChangeTitle.current.value = node.data.label;
      inputChangeTitle.current.focus();
      inputChangeTitle.current?.addEventListener("blur", () => {
        const newNodesIndex = nodes.findIndex((n) => n.id === node.id);
        const newNodes = {
          ...nodes[newNodesIndex],
          data: {
            ...nodes[newNodesIndex].data,
            label: inputChangeTitle.current?.value,
          },
        };
        const newNodesArray = [...nodes];
        newNodesArray.splice(newNodesIndex, 1, newNodes);
        setNodes(newNodesArray);
        if (inputChangeTitle.current) inputChangeTitle.current.disabled = true;
      });
    }
  };

  const handleAddNode = () => {
    const newNode = {
      id: uuidv4(),
      data: { label: "Untitled" },
      resizing: true,
      position: { x: 100, y: 100 },
      deletable: true,
    };
    setNodes((nodes) => [...nodes, newNode]);
  };

  const handleClearChart = () => {
    if (nodes.length === 0) return;
    if (!window.confirm("Are you sure you want to clear the chart?")) return;
    setNodes([]);
    setEdges([]);
  };

  const { screenToFlowPosition } = useReactFlow();
  const onConnect = useCallback((params) => {
    connectingNodeId.current = null;
    setEdges((eds) => addEdge(params, eds));
  }, []);

  const onConnectStart = useCallback((_, { nodeId }) => {
    connectingNodeId.current = nodeId;
  }, []);

  const onConnectEnd = useCallback(
    (event) => {
      if (!connectingNodeId.current) return;

      const targetIsPane = event.target.classList.contains("react-flow__pane");

      if (targetIsPane) {
        const id = uuidv4();
        const newNode = {
          id,
          position: screenToFlowPosition({
            x: event.clientX,
            y: event.clientY,
          }),
          data: { label: `Untitled` },
          origin: [0.5, 0.0],
        };

        setNodes((nds) => nds.concat(newNode));
        setEdges((eds) =>
          eds.concat({
            id,
            source: connectingNodeId.current as string,
            target: id,
          }),
        );
      }
    },
    [screenToFlowPosition],
  );

  const handleSaveFlow = () => {
    setTimeout(() => {
      const chartDataSave = { nodes, edges };
      const newChartData = [...chartData];
      newChartData[currentFile] = {
        ...newChartData[currentFile],
        chart: chartDataSave,
      };
      dispatch(setChartData(newChartData));
      putFile(user, newChartData[currentFile]);
    });
  };

  const handleSaveFlowDebounce = debounce(handleSaveFlow, 1000);

  useEffect(() => {
    if (chartData[currentFile]?.chart) {
      handleSaveFlowDebounce();
      putFile(user, chartData[currentFile]);
    }
  }, [nodes.length]);

  function handleNodeDelete(nodesDelete) {
    const newNodes = [...nodes];
    const newChartData = [...chartData];
    nodesDelete.forEach((nodeDelete) => {
      const index = newNodes.findIndex((n) => n.id === nodeDelete.id);
      newNodes.splice(index, 1);
    });
    newChartData[currentFile] = {
      ...newChartData[currentFile],
      chart: { nodes: newNodes, edges },
    };
    dispatch(setChartData(newChartData));
    putFile(user, newChartData[currentFile]);
  }

  return chartData.length ? (
    <div style={{ width: "100%", height: "70vh", border: "1px solid white" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onConnectStart={onConnectStart}
        onConnectEnd={onConnectEnd}
        onNodeDoubleClick={handleChangeTitleNode}
        onNodeDragStop={handleSaveFlowDebounce}
        onNodesDelete={handleNodeDelete}
        fitView
        fitViewOptions={{ padding: 2 }}
        nodeOrigin={[0.5, 0]}
      >
        <MiniMap />
        <Controls showZoom={false} showFitView={false} position="top-left">
          <ControlButton style={{ width: "80px" }} onClick={handleClearChart}>
            Clear
          </ControlButton>
        </Controls>
        <Controls
          showZoom={false}
          showFitView={false}
          showInteractive={false}
          position="top-right"
        >
          <input
            placeholder="Enter your title"
            className="border pl-2"
            ref={inputChangeTitle}
          />
        </Controls>
        <Controls>
          <ControlButton onClick={handleAddNode}>
            <Image
              src="/images/flow-chart/add.png"
              width={20}
              height={20}
              alt="add"
            />
          </ControlButton>
        </Controls>
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </div>
  ) : (
    <p className="mt-10 text-center text-2xl font-bold">Empty</p>
  );
}
