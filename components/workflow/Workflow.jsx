"use client";
import React, { createContext, useCallback } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  MarkerType,
  useNodesState,
  useEdgesState,
  addEdge,
} from "reactflow";
import "reactflow/dist/style.css";

const nodeStyle = {
  background: "#f0f0f0",
  border: "1px solid #ddd",
  padding: "10px",
  borderRadius: "4px",
  width: 150,
};

const Viewport = { zoom: 1, fitView: true };

const elements = [
  {
    id: "open",
    type: "default",
    targetPosition: "bottom",
    data: { label: "Open" },
    position: { x: 0, y: -600 },
    style: nodeStyle,
  },
  {
    id: "todo",
    type: "default",
    data: { label: "To Do" },
    position: { x: 0, y: -500 },
    style: nodeStyle,
  },
  {
    id: "inprogress",
    type: "default",
    data: { label: "In Progress" },
    position: { x: 0, y: -400 },
    style: nodeStyle,
  },
  {
    id: "cancelled",
    type: "default",
    targetPosition: "bottom",
    data: { label: "Cancelled" },
    position: { x: 250, y: -600 },
    style: nodeStyle,
  },
  {
    id: "reject",
    type: "default",
    targetPosition: "bottom",
    data: { label: "Reject" },
    position: { x: 250, y: -500 },
    style: nodeStyle,
  },
  {
    id: "underreview",
    type: "default",
    data: { label: "Under Review" },
    position: { x: 0, y: -300 },
    style: nodeStyle,
  },
  {
    id: "qaready",
    type: "default",
    data: { label: "QA Ready" },
    position: { x: 0, y: -200 },
    style: nodeStyle,
  },
  {
    id: "reopen",
    type: "default",
    targetPosition: "bottom",
    data: { label: "Re-Open" },
    position: { x: 250, y: -200 },
    style: nodeStyle,
  },
  {
    id: "approved",
    type: "default",
    data: { label: "Approved" },
    position: { x: 0, y: -100 },
    style: nodeStyle,
  },
  {
    id: "done",
    type: "default",
    sourcePosition: "right",
    data: { label: "Done" },
    position: { x: 0, y: 0 },
    style: nodeStyle,
  },
];

const proOptions = { hideAttribution: true };

const initialEdges = [
  {
    id: "open-cancel",
    source: "open",
    target: "cancelled",
    type: "step",
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 20,
      height: 20,
    },
  },
  {
    id: "open-todo",
    source: "open",
    target: "todo",
    type: "step",
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 20,
      height: 20,
    },
  },
  {
    id: "todo-reject",
    source: "todo",
    target: "reject",
    type: "step",
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 20,
      height: 20,
    },
  },
  {
    id: "todo-inp",
    source: "todo",
    target: "inprogress",
    type: "step",
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 20,
      height: 20,
    },
  },
  {
    id: "inp-under",
    source: "inprogress",
    target: "underreview",
    type: "step",
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 20,
      height: 20,
    },
  },
  {
    id: "under-reject",
    source: "underreview",
    target: "reject",
    type: "step",
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 20,
      height: 20,
    },
  },
  {
    id: "under-qa",
    source: "underreview",
    target: "qaready",
    type: "step",
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 20,
      height: 20,
    },
  },
  {
    id: "qa-reo",
    source: "qaready",
    target: "reopen",
    type: "step",
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 20,
      height: 20,
    },
  },
  {
    id: "qa-appr",
    source: "qaready",
    target: "approved",
    type: "step",
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 20,
      height: 20,
    },
  },
  {
    id: "appr-reo",
    source: "approved",
    target: "reopen",
    type: "step",
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 20,
      height: 20,
    },
  },
  {
    id: "appr-done",
    source: "approved",
    target: "done",
    type: "step",
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 20,
      height: 20,
    },
  },
  {
    id: "done-reo",
    source: "done",
    target: "reopen",
    type: "step",
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 20,
      height: 20,
    },
  },
  {
    id: "reo-inp",
    source: "reopen",
    target: "inprogress",
    type: "step",
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 20,
      height: 20,
    },
  },
  {
    id: "reject-inp",
    source: "reject",
    target: "inprogress",
    type: "step",
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 20,
      height: 20,
    },
  },
];

const WorkflowContainer = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(elements);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <div className="d-flex justify-content-center">
      <div className="inner-flow-container">
        <ReactFlow
          defaultViewport={Viewport}
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          proOptions={proOptions}
          onConnect={onConnect}
          fitView="true"
        >
          <Controls position="top-left" className="controls-workflow" />
        </ReactFlow>
      </div>
    </div>
  );
};

export default WorkflowContainer;
