import React from "react";
import { useDnD } from "../dnd.jsx";
import UserQueryNode from "./input.jsx";
import KnowledgeBaseNode from "./knowledge.jsx";
import LLMNode from "./llm.jsx";
import OutputNode from "./output.jsx";


const items = [
  { id: "input", label: "Input",type:"userQuery" },
  { id: "llm", label: "LLM (Gemini)",type:"llm" },
  { id: "kb", label: "Knowledge Base",type:"knowledgeBase" },
  { id: "output", label: "Output",type:"output"},
];

export default function Sidebar() {
  const [_, setType] = useDnD();

  const onDragStart = (event, nodeType) => {
    setType(nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside className="w-64 bg-gray-50 p-4 border-r border-gray-200">
      <h2 className="text-sm font-semibold text-gray-600 tracking-wide mb-3">
        Components
      </h2>

      <div className="space-y-2">
        {items.map((item) => (
          <div
            key={item.id}
            onDragStart={(event) => onDragStart(event, item.type)}
            draggable
            className="w-full flex items-center justify-between gap-3 rounded-md border border-gray-200 bg-white px-3 py-2 text-left shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 cursor-grab"
          >
            {item.label}

            {/* Right grip icon */}
            <span className="text-gray-400">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M9 6h10M5 12h14M9 18h10" />
              </svg>
            </span>
          </div>
        ))}
      </div>
    </aside>
  );
}
