import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './components/dashboard';
import AuthPage from './components/login';
import Workflow from './components/workflow';
import Sidebar from './components/sidebar';
import DropChart from './components/dropchart';
import DnDFlow from './dnd';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect root to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Login page */}
        <Route path="/login" element={<AuthPage />} />

        {/* Dashboard page */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* You can add more routes for your other components if needed */}
        <Route path="/workflow" element={<Workflow />} />
        <Route path="/sidebar" element={<Sidebar />} />
        <Route path="/dropchart" element={<DropChart />} />
        <Route path="/dnd" element={<DnDFlow />} />

        {/* Catch all unknown routes */}
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </Router>
  );
}


