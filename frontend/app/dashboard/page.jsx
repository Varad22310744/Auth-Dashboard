'use client';
import { useEffect, useState } from 'react';
import api from '../../lib/api';
import { useRouter } from 'next/navigation';
import TaskForm from '../../components/TaskForm';
import TaskList from '../../components/TaskList';
import Loader from '../../components/Loader';

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) router.push('/login');
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await api.get('/tasks');
      setTasks(res.data);
    } catch {
      router.push('/login');
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (data) => {
    const res = await api.post('/tasks', data);
    setTasks([...tasks, res.data]);
  };

  const deleteTask = async (id) => {
    await api.delete(`/tasks/${id}`);
    setTasks(tasks.filter((t) => t._id !== id));
  };

  const toggleTask = async (task) => {
    const updated = await api.put(`/tasks/${task._id}`, {
      status: task.status === 'pending' ? 'completed' : 'pending'
    });
    setTasks(tasks.map((t) => (t._id === task._id ? updated.data : t)));
  };

  const logout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  if (loading) return <Loader />;

  return (
    <div className="max-w-xl mx-auto mt-10">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl">Dashboard</h1>
        <button onClick={logout} className="text-red-500">
          Logout
        </button>
      </div>

      <TaskForm onCreate={createTask} />
      <TaskList tasks={tasks} onDelete={deleteTask} onToggle={toggleTask} />
    </div>
  );
}
