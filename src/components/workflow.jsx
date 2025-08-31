import { DnDProvider, useDnD } from '../dnd';
import Sidebar from './sidebar';
import DropChart from './dropchart';
import UserQueryNode from "./input.jsx";
import KnowledgeBaseNode from "./knowledge.jsx";
import LLMNode from "./llm.jsx";
import OutputNode from "./output.jsx";
import {
  ReactFlowProvider,
} from '@xyflow/react';

const nodeTypes = {
  userQuery: UserQueryNode,
  knowledgeBase: KnowledgeBaseNode,
  llm: LLMNode,
  output: OutputNode,
};

 
export function DnDFlow() {
  return(

    <>
 <div className="flex h-screen">
      {/* Sidebar (left) */}
      <Sidebar />
      {/* Main content (right) */}
      <div className="flex-1 bg-gray-100">
        <main className="h-full w-full p-4">
          <div className="h-full w-full bg-white rounded-lg shadow">
            {/* Replace this with your <Workflow /> */}
            <div className="text-gray-500 flex items-center justify-center h-full">
            <DropChart/>
            </div>
          </div>
        </main>
      </div>
    </div>
    </>
  )
}


export default function Workflow(){
    return(
  <ReactFlowProvider>
    <DnDProvider>
      <DnDFlow />
    </DnDProvider>
  </ReactFlowProvider>
    )
}

