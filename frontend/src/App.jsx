import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import RegisterFisher from './pages/RegisterFisher';
import BoatLicensing from './pages/BoatLicensing';
import Permits from './pages/Permits';

function App() {
  return (
    <div className="p-6">
      <nav className="space-x-4 text-blue-700">
        <Link to="/">Home</Link>
        <Link to="/register">Register Fisher</Link>
        <Link to="/boat">Boat Licensing</Link>
        <Link to="/permits">Permits</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegisterFisher />} />
        <Route path="/boat" element={<BoatLicensing />} />
        <Route path="/permits" element={<Permits />} />
      </Routes>
    </div>
  );
}

export default App;
