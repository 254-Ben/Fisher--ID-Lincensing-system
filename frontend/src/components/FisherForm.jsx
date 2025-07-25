import { useState } from 'react';
import axios from 'axios';

function FisherForm() {
  const [fisher, setFisher] = useState({ name: '', nationalId: '', boatName: '' });
  const [msg, setMsg] = useState('');

  const handleChange = (e) => {
    setFisher({ ...fisher, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/fishers', fisher);
      setMsg('Fisher registered successfully!');
    } catch (err) {
      setMsg('Registration failed');
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Register a Fisher</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" placeholder="Full Name" onChange={handleChange} className="w-full border p-2" />
        <input name="nationalId" placeholder="National ID" onChange={handleChange} className="w-full border p-2" />
        <input name="boatName" placeholder="Boat Name" onChange={handleChange} className="w-full border p-2" />
        <button className="bg-green-600 text-white px-4 py-2">Submit</button>
      </form>
      <p>{msg}</p>
    </div>
  );
}
export default FisherForm;
