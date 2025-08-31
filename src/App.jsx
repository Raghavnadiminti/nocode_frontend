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
 
        <Route path="/" element={<Navigate to="/login" replace />} />

   
        <Route path="/login" element={<AuthPage />} />

  
        <Route path="/dashboard" element={<Dashboard />} />

     
        <Route path="/workflow/:id2" element={<Workflow />} />


  
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </Router>
  );
}


