import { useState, useCallback,useRef,useEffect } from 'react';
import {
  ReactFlow,
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  useReactFlow,
  Background,
  BackgroundVariant,Panel
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useParams } from 'react-router-dom';
 import { DnDProvider, useDnD } from '../dnd';
import UserQueryNode from "./input.jsx";
import KnowledgeBaseNode from "./knowledge.jsx";
import LLMNode from "./llm.jsx";
import OutputNode from "./output.jsx";
import axios from 'axios';
import LLMOverlay from './llmoutput.jsx';
const nodeTypes = {
  userQuery: UserQueryNode,
  knowledgeBase: KnowledgeBaseNode,
  llm: LLMNode,
  output: OutputNode,
};
const initialNodes = [

];
let id = 0;
const getId = () => `dndnode_${id++}`;
const initialEdges=[] 

export default function DropChart() {

  const reactFlowWrapper = useRef(null);
  const [loading,setLoading]=useState(false)
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [knowledge,setKnowledge] = useState(null)
   const { id2 } = useParams();
   const email=sessionStorage.getItem("userEmail")
  useEffect(() => {
    console.log(id2)
    if (!id2) return; // Safety check

    const fetchWorkflow = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://127.0.0.1:8000/workflow/${id2}`);
           setNodes(response.data.workflow.data)
           setEdges(response.data.workflow.graph)
      } catch (err) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };
    fetchWorkflow();
  }, []);
   const { screenToFlowPosition } = useReactFlow();
     useEffect(() => {
    console.log("All node data:");
    nodes.forEach((node) => {
      console.log(`Node ID: ${node.id}`, node.data);
    });
    console.log(edges)
  }, [nodes]);
  const [type] = useDnD();
  // const onNodesChange = useCallback(
  //   (changes) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
  //   [],
  // );
  // const onEdgesChange = useCallback(
  //   (changes) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
  //   [],
  // );
  const onConnect = useCallback(
    (params) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
    [],
  );
 const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);
 
  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
 
      // check if the dropped element is valid
      if (!type) {
        return;
      }
 

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `${type} node` },
      };
         console.log(newNode)
      setNodes((nds) => nds.concat(newNode));
    },
    [screenToFlowPosition, type],
  );
 
  const onDragStart = (event, nodeType) => {
    setType(nodeType);
    event.dataTransfer.setData('text/plain', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };
const [showLLM, setShowLLM] = useState(false);
const [llmOutput, setLLMOutput] = useState("");

function handleRun(){
 axios.get(`http://127.0.0.1:8000/workflow/execute/${id2}`).then((res) => {
   
    const text = res.data.llm_output.content
    setLLMOutput(text);
    setShowLLM(true);
    console.log(res.data);
  });
}
async function handleSave(){
const file = nodes.find(({ type, data }) => type === "knowledgeBase" && data?.file)?.data.file;
console.log(file)
const formData = new FormData();
formData.append("email",email);
formData.append("workflow_id",id2);
if (file) {
  formData.append("file", file);
}
let knowledgedata=null
if(file){
const res= await axios.post(
  "http://127.0.0.1:8000/workflow/uploadpdf",
  formData,
  { headers: { "Content-Type": "multipart/form-data" } }
)
knowledgedata=res.data.knowledge
}

const reqnodes = nodes.map(({ id, type, data, position }) => {
  let newData = data;

  if (type === "knowledgeBase") {
    newData = {
      ...data,
      file:knowledgedata.id
    };
  }

  return {
    id,
    type,
    data: newData,
    position,
  };
});
 const body={
          nodes:reqnodes,
          email:"raghavnadiminti@gmail.com",
          name:"flow2",
          edges:edges
        }
        axios.post(`http://127.0.0.1:8000/workflow/${id2}`,body).then((res)=>{
          console.log(res.data)
        })
       
}



  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        onConnect={onConnect}
         onDrop={onDrop}
          onDragStart={onDragStart}
          onDragOver={onDragOver}
        fitView
      
      >
          <Background
        id="dots"
        variant={BackgroundVariant.Dots} // dotted pattern        color="#d4d4d4"                  // light gray dot color
        bgColor="#ffffff"                // white canvas-
        gap={24}                         // distance between dots
        size={1}                         // dot radius
      />
     <Panel position="top-left">
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-500 text-white rounded shadow"
            >
              Save
            </button>
            <button
              onClick={handleRun}
              className="px-4 py-2 bg-green-500 text-white rounded shadow"
            >
              Run
            </button>
          </div>
        </Panel>
      </ReactFlow>
        <LLMOverlay
    open={showLLM}
    onClose={() => setShowLLM(false)}
    title="LLM Output"
    content={llmOutput || "No output produced."}
  />
    </div>
  );
}