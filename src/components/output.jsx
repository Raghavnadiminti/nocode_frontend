// OutputNode.jsx
import React from "react";
import { Handle, Position } from "@xyflow/react";

const OutputNode = ({ data }) => {
  return (
    <div className="p-3 border rounded-lg bg-white shadow-md w-auto">
      {/* Title */}
      <h3 className="font-semibold">Query</h3>
      <p className="text-sm text-gray-500 mb-2">
     your output
      </p>

      {/* Handle (output only) */}
      <Handle
        type="source"
        position={Position.Right}
        id="iouo"
        style={{ top: "20%" }}
      />
    </div>
  );
};

export default OutputNode;
