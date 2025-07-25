import { useState } from 'react';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      setMsg('Welcome ' + res.data.user.name);
      localStorage.setItem('token', res.data.token);
    } catch (err) {
      setMsg('Login failed');
    }
  };

  return (
    <div className="p-4 max-w-sm mx-auto">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <input className="w-full border p-2" type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input className="w-full border p-2" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        <button className="bg-blue-600 text-white px-4 py-2" type="submit">Login</button>
      </form>
      <p>{msg}</p>
    </div>
  );
}
export default Login;
