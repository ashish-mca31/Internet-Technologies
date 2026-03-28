import { useState, useCallback } from 'react';
import * as api from '../api/users';

export function useUsers() {
  const [users,      setUsers]      = useState([]);
  const [total,      setTotal]      = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading,    setLoading]    = useState(false);
  const [error,      setError]      = useState('');
  const [message,    setMessage]    = useState('');
  const [backup,     setBackup]     = useState([]);

  const showMsg = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 3000);
  };

  // Fetch users from server
  const fetchUsers = useCallback(async (params) => {
    setLoading(true);
    setError('');
    try {
      const res = await api.getUsers(params);
      setUsers(res.data.users);
      setTotal(res.data.total);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      setError('Could not load users.');
    } finally {
      setLoading(false);
    }
  }, []);

  // Add user — optimistic: show in list right away
  const addUser = async (data, onDone) => {
    const tempUser = { ...data, id: 'temp_' + Date.now(), _pending: true };
    setBackup(users);
    setUsers((prev) => [tempUser, ...prev]);
    try {
      const res = await api.createUser(data);
      // Replace temp row with real row from server
      setUsers((prev) => prev.map((u) => (u.id === tempUser.id ? res.data : u)));
      showMsg('User added!');
      if (onDone) onDone();
    } catch (err) {
      setUsers(backup); // rollback on failure
      setError(err.response?.data?.error || 'Failed to add user.');
    }
  };

  // Edit user — optimistic: update row right away
  const editUser = async (id, data, onDone) => {
    setBackup(users);
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, ...data, _pending: true } : u)));
    try {
      const res = await api.updateUser(id, data);
      setUsers((prev) => prev.map((u) => (u.id === id ? res.data : u)));
      showMsg('User updated!');
      if (onDone) onDone();
    } catch (err) {
      setUsers(backup); // rollback on failure
      setError(err.response?.data?.error || 'Failed to update user.');
    }
  };

  // Delete user — optimistic: remove row right away
  const removeUser = async (id) => {
    setBackup(users);
    setUsers((prev) => prev.filter((u) => u.id !== id));
    try {
      await api.deleteUser(id);
      showMsg('User deleted.');
    } catch (err) {
      setUsers(backup); // rollback on failure
      setError('Failed to delete user.');
    }
  };

  return { users, total, totalPages, loading, error, message, fetchUsers, addUser, editUser, removeUser };
}
