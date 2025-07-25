import { useState } from 'react';
import axios from 'axios';

function PermitForm() {
  const [permit, setPermit] = useState({ fisherId: '', type: '', startDate: '', endDate: '' });
  const [msg, setMsg] = useState('');

  const handleChange = (e) => {
    setPermit({ ...permit, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/permits', permit);
      setMsg('Permit issued successfully!');
    } catch (err) {
      setMsg('Failed to issue permit');
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Issue Seasonal Permit</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="fisherId" placeholder="Fisher ID" onChange={handleChange} className="w-full border p-2" />
        <input name="type" placeholder="Permit Type" onChange={handleChange} className="w-full border p-2" />
        <input name="startDate" type="date" onChange={handleChange} className="w-full border p-2" />
        <input name="endDate" type="date" onChange={handleChange} className="w-full border p-2" />
        <button className="bg-green-600 text-white px-4 py-2">Submit</button>
      </form>
      <p>{msg}</p>
    </div>
  );
}
export default PermitForm;
