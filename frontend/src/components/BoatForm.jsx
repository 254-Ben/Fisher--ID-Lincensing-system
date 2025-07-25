import { useState } from 'react';
import axios from 'axios';

function BoatForm() {
  const [boat, setBoat] = useState({ name: '', registrationNumber: '', owner: '' });
  const [msg, setMsg] = useState('');

  const handleChange = (e) => {
    setBoat({ ...boat, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/boats', boat);
      setMsg('Boat registered successfully!');
    } catch (err) {
      setMsg('Failed to register boat');
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Register a Boat</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" placeholder="Boat Name" onChange={handleChange} className="w-full border p-2" />
        <input name="registrationNumber" placeholder="Reg. Number" onChange={handleChange} className="w-full border p-2" />
        <input name="owner" placeholder="Owner" onChange={handleChange} className="w-full border p-2" />
        <button className="bg-blue-600 text-white px-4 py-2">Submit</button>
      </form>
      <p>{msg}</p>
    </div>
  );
}
export default BoatForm;
