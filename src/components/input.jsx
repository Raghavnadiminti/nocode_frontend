import { useState, useEffect } from "react";
import { useReactFlow, Handle, Position } from "@xyflow/react";

const UserQueryNode = ({ id, data }) => {
  const { setNodes } = useReactFlow();
  const [query, setQuery] = useState(data.query || "");

  // keep node state updated in ReactFlow
  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === id ? { ...node, data: { ...node.data, query } } : node
      )
    );
  }, [query, id, setNodes]);

  return (
    <div className="p-3 border rounded-lg bg-white shadow-md w-80">
      {/* Title */}
      <h3 className="font-semibold">💬 User Query</h3>
      <p className="text-sm text-gray-500 mb-2">
        Enter your question or request
      </p>

      {/* Textarea */}
      <textarea
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Write your query here..."
        className="w-full p-2 mt-2 border rounded resize-none"
        rows={3}
      />

      {/* Handle (output only) */}
      <Handle
        type="source"
        position={Position.Right}
        id="queryOut"
        style={{ top: "50%" }}
      />
    </div>
  );
};

export default UserQueryNode;
