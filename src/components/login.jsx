import React, { useState } from "react";

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
function Button({ children, onClick, className, type = "button" }) {
  return (
    <button
      type={type}
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

function CardContent({ children, className }) {
  return <div className={`p-6 ${className}`}>{children}</div>;
}

// ================== Auth Page (Login/Register) ==================
export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const url = isLogin
        ? "http://127.0.0.1:8000/user/login"
        : "http://127.0.0.1:8000/user/signup";

      const payload = isLogin
        ? { email, password }
        : { email, name, password, mobile_number: mobile };

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      console.log("Response:", data);

      if (data.success) {
        // Store email in sessionStorage
        sessionStorage.setItem("userEmail", email);
        alert(`${isLogin ? "Login" : "Signup"} successful!`);
      } else {
        setError(data.message || "Something went wrong");
      }
    } catch (err) {
      console.error("Error:", err);
      setError("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-96">
        <CardContent>
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
            {isLogin ? "Login to GenAI Stack" : "Register for GenAI Stack"}
          </h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {!isLogin && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <Input
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Mobile Number
                  </label>
                  <Input
                    type="text"
                    placeholder="Enter your mobile number"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                  />
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <Input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <Button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white"
            >
              {loading ? "Please wait..." : isLogin ? "Login" : "Register"}
            </Button>
          </form>

          {/* Toggle */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              {isLogin
                ? "Don't have an account?"
                : "Already have an account?"}
            </p>
            <Button
              onClick={() => setIsLogin(!isLogin)}
              className="mt-2 w-full border border-gray-300 text-gray-700 bg-white hover:bg-gray-100"
            >
              {isLogin ? "Switch to Register" : "Switch to Login"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
