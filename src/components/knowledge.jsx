import { useState, useEffect } from "react";
import {
  useReactFlow,Handle,Position
} from '@xyflow/react';

const KnowledgeBaseNode = ({ id, data }) => {
  const { setNodes } = useReactFlow();
  const [file, setFile] = useState(data.file || null);
  const [embeddingModel, setEmbeddingModel] = useState(data.embeddingModel || "text-embedding-3-large");
  const [apiKey, setApiKey] = useState(data.apiKey || "");

  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === id
          ? { ...node, data: { ...node.data, file, embeddingModel, apiKey } }
          : node
      )
    );
  }, [file, embeddingModel, apiKey, id, setNodes]);

  return (
    <div className="p-3 border rounded-lg bg-white shadow-md w-72">
      {/* Title */}
      <h3 className="font-semibold flex items-center gap-2">
        📘 Knowledge Base
      </h3>
      <p className="text-sm text-gray-500 mb-3">
        Let LLM search info in your file
      </p>

      {/* File Upload */}
      <label className="block text-sm font-medium text-gray-700">
        File for Knowledge Base
      </label>
      <div className="mt-1 border-2 border-dashed rounded-lg p-3 text-center text-gray-400 cursor-pointer hover:border-blue-400">
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="hidden"
          id={`file-upload-${id}`}
        />
        <label htmlFor={`file-upload-${id}`} className="cursor-pointer">
          {file ? file.name : "Upload File ⬆️"}
        </label>
      </div>

      {/* Embedding Model */}
      <label className="block text-sm font-medium text-gray-700 mt-4">
        Embedding Model
      </label>
      <select
        value={embeddingModel}
        onChange={(e) => setEmbeddingModel(e.target.value)}
        className="w-full p-2 mt-1 border rounded"
      >
        <option value="text-embedding-3-large">text-embedding-3-large</option>
        <option value="text-embedding-3-small">text-embedding-3-small</option>
      </select>

      {/* API Key */}
      <label className="block text-sm font-medium text-gray-700 mt-4">
        API Key
      </label>
      <div className="flex items-center mt-1">
        <input
          type="password"
          placeholder="****************"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      {/* Handles */}
      <Handle type="target" position={Position.Left} id="queryIn" style={{ top: "80%" }} />
      <Handle type="source" position={Position.Right} id="contextOut" style={{ top: "80%" }} />
    </div>
  );
};

export default KnowledgeBaseNode;
