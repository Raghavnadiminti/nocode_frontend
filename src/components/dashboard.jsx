import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

/* Reusable primitives */
function Input({ type = "text", placeholder, value, onChange, className = "" }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={
        "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 " +
        className
      }
    />
  );
}

function Button({ children, onClick, className = "", type = "button", disabled }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={
        "px-4 py-2 font-medium rounded-lg transition disabled:opacity-60 disabled:cursor-not-allowed " +
        className
      }
    >
      {children}
    </button>
  );
}

function Card({ children, className = "", onClick }) {
  return (
    <div onClick={onClick} className={"bg-white rounded-2xl shadow-md " + className}>
      {children}
    </div>
  );
}

function CardContent({ children, className = "" }) {
  return <div className={"p-6 " + className}>{children}</div>;
}

/* Accessible Tailwind Modal */
function Modal({ open, title, children, onClose }) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      aria-modal="true"
      role="dialog"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        aria-hidden="true"
      />
      {/* Dialog */}
      <div className="relative bg-white w-full max-w-lg mx-4 rounded-xl shadow-lg">
        <div className="flex items-center justify-between px-5 py-4 border-b">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button
            aria-label="Close"
            className="p-1 rounded hover:bg-gray-100"
            onClick={onClose}
          >
            ×
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}

/* Main component */
export default function Dashboard() {
  const [workflows, setWorkflows] = useState([]);
  const [openCreate, setOpenCreate] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate(); // React Router v6 programmatic navigation

  // Fetch stacks
  useEffect(() => {
    const fetchWorkflows = async () => {
      const email = sessionStorage.getItem("userEmail");
      if (!email) return;

      try {
        const res = await axios.get(
          `http://127.0.0.1:8000/user/workflows/?email=${encodeURIComponent(email)}`
        );
        setWorkflows(res.data || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchWorkflows();
  }, []);

  // Create stack
  const handleCreate = async () => {
    if (!name.trim()) return;
    setSubmitting(true);
    try {
      const email = sessionStorage.getItem("userEmail");
      const payload = {
        name: name.trim(),
        description: description.trim(),
        email,
      };
      // Adjust endpoint/body to match backend
      const res = await axios.post("http://127.0.0.1:8000/workflow/createflow", payload);
      const created = res.data;

      // Refresh list
      const listRes = await axios.get(
        `http://127.0.0.1:8000/user/workflows/?email=${encodeURIComponent(email || "")}`
      );
      setWorkflows(listRes.data || []);

      // Reset and close
      setName("");
      setDescription("");
      setOpenCreate(false);

      // Navigate to the new stack detail if backend returns id
      if (created?.id) navigate(`/workflow/${created.id}`);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 bg-white shadow-sm">
        <h1 className="text-xl font-bold text-gray-800">FlowStack</h1>
        <Button
          className="bg-green-600 hover:bg-green-700 text-white"
          onClick={() => setOpenCreate(true)}
        >
          + New Stack
        </Button>
      </header>

<main className="px-6 py-8">
  <h2 className="text-lg font-semibold mb-4">My Stacks</h2>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
    {workflows.map((wf) => (
      <div
        key={wf.id}
        onClick={() => navigate(`/workflow/${wf.id}`)}
        className="
          group relative overflow-hidden rounded-2xl border border-gray-200 bg-white
          shadow-sm transition-all
          hover:-translate-y-1 hover:shadow-xl hover:border-transparent
          hover:ring-2 hover:ring-green-500/30
          cursor-pointer
        "
      >
        {/* Decorative gradient header */}
        <div
          className="
            h-24 w-full bg-gradient-to-r from-emerald-500/90 via-teal-500/80 to-sky-500/80
            opacity-95
          "
        />

        {/* Floating avatar/icon */}
        <div
          className="
            absolute -top-6 left-5 grid h-12 w-12 place-items-center rounded-xl
            bg-white shadow ring-1 ring-black/5
            transition-transform group-hover:scale-105
          "
        >
          <span className="text-xl">🧩</span>
        </div>

        {/* Content */}
        <div className="p-5">

          <div className="mb-2 flex items-center gap-2">
            <h3 className="text-lg font-semibold text-gray-900">
              {wf.name}
            </h3>
            <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700">
              Active
            </span>
          </div>


          <p className="text-sm text-gray-600 line-clamp-2">
            {wf.Description}
          </p>


          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-600 text-white">
                {String(wf.name || "").slice(0, 1).toUpperCase()}
              </span>
              <span>Stack</span>
            </div>
            <button
              className="
                inline-flex items-center gap-1 rounded-lg bg-gray-100 px-3 py-1.5 text-xs
                font-medium text-gray-700 transition group-hover:bg-gray-200
              "
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/workflow/${wf.id}`);
              }}
            >
              Open
              <svg
                className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 111.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" />
              </svg>
            </button>
          </div>
        </div>


        <div
          className="
            pointer-events-none absolute inset-x-0 bottom-0 h-16
            bg-gradient-to-t from-emerald-50/60 to-transparent
            opacity-0 transition-opacity group-hover:opacity-100
          "
        />
      </div>
    ))}
  </div>
</main>


      {/* Create Modal */}
      <Modal
        open={openCreate}
        onClose={() => !submitting && setOpenCreate(false)}
        title="Create New Stack"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <Input
              placeholder="Chat With PDF"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              placeholder="Chat with your pdf docs"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full h-28 resize-none px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button
              className="bg-gray-100 hover:bg-gray-200"
              onClick={() => setOpenCreate(false)}
              disabled={submitting}
            >
              Cancel
            </Button>
            <Button
              className="bg-green-600 hover:bg-green-700 text-white"
              onClick={handleCreate}
              disabled={!name.trim() || submitting}
            >
              {submitting ? "Creating..." : "Create"}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
