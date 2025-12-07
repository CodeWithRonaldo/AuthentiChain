import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage/LandingPage';
import BrandDashboard from './pages/BrandDashboard/BrandDashboard';
import CreateProduct from './pages/CreateProduct/CreateProduct';
import VerifyProduct from './pages/VerifyProduct/VerifyProduct';
import VerificationResult from './pages/VerificationResult/VerificationResult';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/brand" element={<BrandDashboard />} />
        <Route path="/brand/create" element={<CreateProduct />} />
        <Route path="/verify" element={<VerifyProduct />} />
        <Route path="/result/:status" element={<VerificationResult />} />
      </Routes>
    </Router>
  );
}

export default App;
