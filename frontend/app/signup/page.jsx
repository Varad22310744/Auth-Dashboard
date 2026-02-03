'use client';
import { useState } from 'react';
import api from '../../lib/api';
import { useRouter } from 'next/navigation';

export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await api.post('/auth/signup', form);
      router.push('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-6 w-80 rounded shadow">
        <h2 className="text-xl mb-4">Signup</h2>

        {error && <p className="text-red-500">{error}</p>}

        <input
          className="border p-2 w-full mb-2"
          placeholder="Name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />

        <input
          className="border p-2 w-full mb-2"
          placeholder="Email"
          type="email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />

        <input
          className="border p-2 w-full mb-4"
          placeholder="Password"
          type="password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />

        <button className="bg-blue-600 text-white w-full py-2 rounded">
          Signup
        </button>
      </form>
    </div>
  );
}
