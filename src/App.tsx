import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { FamilyProvider, useFamily } from './context/FamilyContext';
import Home from './pages/Home';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import QRCodes from './pages/QRCodes';
import Profile from './pages/Profile';

const AppRoutes = () => {
  const { familyData } = useFamily();

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route 
        path="/dashboard" 
        element={familyData ? <Dashboard /> : <Navigate to="/register" />} 
      />
      <Route 
        path="/qrs" 
        element={familyData ? <QRCodes /> : <Navigate to="/register" />} 
      />
      <Route path="/profile/:memberId" element={<Profile />} />
    </Routes>
  );
};

function App() {
  return (
    <FamilyProvider>
      <Router>
        <div className="min-h-screen bg-google-light-grey">
          <AppRoutes />
        </div>
      </Router>
    </FamilyProvider>
  );
}

export default App;
