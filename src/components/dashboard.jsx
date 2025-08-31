import React, { useState } from "react";

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

// Reusable Button Component
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

// Reusable Card Component
function Card({ children, className }) {
  return (
    <div className={`bg-white rounded-2xl shadow-md ${className}`}>{children}</div>
  );
}

function CardContent({ children, className }) {
  return <div className={`p-6 ${className}`}>{children}</div>;
}

// ================== Dashboard ==================
export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 bg-white shadow-sm">
        <h1 className="text-xl font-bold text-gray-800">GenAI Stack</h1>
        <Button className="bg-green-600 hover:bg-green-700 text-white">
          + New Stack
        </Button>
      </header>

      {/* Body */}
      <main className="px-6 py-8">
        <h2 className="text-lg font-semibold mb-4">My Stacks</h2>
        <div className="flex justify-center mt-12">
          <Card className="w-80 text-center">
            <CardContent>
              <h3 className="text-lg font-semibold mb-2">Create New Stack</h3>
              <p className="text-gray-600 mb-4 text-sm">
                Start building your generative AI apps with our essential tools
                and frameworks
              </p>
              <Button className="bg-green-600 hover:bg-green-700 text-white">
                + New Stack
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
