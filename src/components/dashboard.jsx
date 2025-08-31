import React, { useState,useEffect } from "react";
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
// Reusable Input Component
function Input({ type, placeholder, value, onChange }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
    />
  );
}


function Button({ children, onClick, className }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 font-medium rounded-lg transition ${className}`}
    >
      {children}
    </button>
  );
}


function Card({ children, className }) {
  return (
    <div className={`bg-white rounded-2xl shadow-md ${className}`}>{children}</div>
  );
}
function Card2({ children, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-white border rounded-lg p-4 cursor-pointer hover:shadow-md transition"
    >
      {children}
    </div>
  );
}
function CardContent({ children, className }) {
  return <div className={`p-6 ${className}`}>{children}</div>;
}
export default function Dashboard() {
  const [workflows, setWorkflows] = useState([]);
//   const router = useNavigate();

  useEffect(() => {
    const fetchWorkflows = async () => {
      const email = sessionStorage.getItem("userEmail");
      console.log("ohooho",email)
      if (!email) return;

      try {
        const res = await axios.get(
          `http://127.0.0.1:8000/user/workflows/?email=${email}`
        );
     
        const data = await res.data;
        setWorkflows(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchWorkflows();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">

      <header className="flex justify-between items-center px-6 py-4 bg-white shadow-sm">
        <h1 className="text-xl font-bold text-gray-800">GenAI Stack</h1>
        <Button
          className="bg-green-600 hover:bg-green-700 text-white"
        //   onClick={() => router.push("/workflow/new")}
        >
          + New Stack
        </Button>
      </header>


      <main className="px-6 py-8">
        <h2 className="text-lg font-semibold mb-4">My Stacks</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">




          {workflows.map((workflow) => (
            <Card
              key={workflow.id}
              className="cursor-pointer hover:shadow-lg transition"
              onClick={() => router(`/workflow/${workflow.id}`)}
            >
              <CardContent>
                <h3 className="text-lg font-semibold mb-2">{workflow.name}</h3>
                <p className="text-gray-600 text-sm">{workflow.Description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}