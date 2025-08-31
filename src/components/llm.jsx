import { useState, useEffect } from "react";
import { useReactFlow, Handle, Position } from "@xyflow/react";

const LLMNode = ({ id, data }) => {
  const { setNodes } = useReactFlow();

  const [model, setModel] = useState(data.model || "GPT 4o- Mini");
  const [apiKey, setApiKey] = useState(data.apiKey || "");
  const [prompt, setPrompt] = useState(
    data.prompt ||
      "You are a helpful PDF assistant. Use web search if the PDF lacks context\n\nCONTEXT: {context}\nUser Query: {query}"
  );
  const [temperature, setTemperature] = useState(data.temperature || 0.75);
  const [serpApiKey, setSerpApiKey] = useState(data.serpApiKey || "");
  const [showApi, setShowApi] = useState(false);
  const [showSerpApi, setShowSerpApi] = useState(false);

  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === id
          ? { ...node, data: { ...node.data, model, apiKey, prompt, temperature, serpApiKey } }
          : node
      )
    );
  }, [model, apiKey, prompt, temperature, serpApiKey, id, setNodes]);

  return (
    <div className="p-3 border rounded-lg bg-white shadow-md w-80">
      {/* Title */}
      <h3 className="font-semibold">🤖 LLM (OpenAI)</h3>
      <p className="text-sm text-gray-500 mb-3">Run a query with OpenAI LLM</p>

      {/* Model */}
      <label className="block text-sm font-medium text-gray-700">Model</label>
<select
  value={model}
  onChange={(e) => setModel(e.target.value)}
  className="w-full p-2 mt-1 border rounded"
>
  <option value="gemini-2.5-pro">Gemini 2.5 Pro</option>
  <option value="gemini-2.5-flash">Gemini 2.5 Flash</option>
  <option value="gemini-2.5-flash-lite">Gemini 2.5 Flash Lite</option>
  <option value="gemini-2.0-flash">Gemini 2.0 Flash</option>
  <option value="gemini-2.0-flash-lite">Gemini 2.0 Flash Lite</option>
  <option value="gemini-1.5-pro">Gemini 1.5 Pro (Legacy)</option>
  <option value="gemini-1.5-flash">Gemini 1.5 Flash (Legacy)</option>
</select>

      {/* API Key */}
      <label className="block text-sm font-medium text-gray-700 mt-4">API Key</label>
      <div className="flex items-center gap-2">
        <input
          type={showApi ? "text" : "password"}
          placeholder="****************"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <button
          onClick={() => setShowApi((prev) => !prev)}
          className="px-2 text-gray-600"
        >
          
        </button>
      </div>

      {/* Prompt */}
      <label className="block text-sm font-medium text-gray-700 mt-4">Prompt</label>
      <textarea
        placeholder="Enter your prompt..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        rows={4}
        className="w-full p-2 mt-1 border rounded"
      />

      {/* Temperature */}
      <label className="block text-sm font-medium text-gray-700 mt-4">Temperature</label>
      <input
        type="number"
        step="0.1"
        min="0"
        max="1"
        value={temperature}
        onChange={(e) => setTemperature(parseFloat(e.target.value))}
        className="w-full p-2 mt-1 border rounded"
      />

      {/* SERP API */}
      <label className="block text-sm font-medium text-gray-700 mt-4">SERP API Key</label>
      <div className="flex items-center gap-2">
        <input
          type={showSerpApi ? "text" : "password"}
          placeholder="****************"
          value={serpApiKey}
          onChange={(e) => setSerpApiKey(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <button
          onClick={() => setShowSerpApi((prev) => !prev)}
          className="px-2 text-gray-600"
        >
          
        </button>
      </div>

      {/* Handles */}
      <Handle type="target" position={Position.Left} id="contextIn" style={{ top: "50%" }} />
      <Handle type="target" position={Position.Left} id="queryIn" style={{ top: "70%" }} />
      <Handle type="source" position={Position.Right} id="output" style={{ top: "60%" }} />
    </div>
  );
};

export default LLMNode;
