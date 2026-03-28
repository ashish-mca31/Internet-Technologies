import React, { useState, useEffect } from 'react';

const empty = { name: '', email: '', age: '' };

export default function UserForm({ editUser, onSubmit, onCancel }) {
  const [form, setForm] = useState(empty);
  const [err,  setErr]  = useState('');

  useEffect(() => {
    setForm(editUser ? { name: editUser.name, email: editUser.email, age: editUser.age || '' } : empty);
    setErr('');
  }, [editUser]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) {
      setErr('Name and Email are required.');
      return;
    }
    onSubmit(form);
  };

  return (
    <div className="form-box">
      <h2>{editUser ? 'Edit User' : 'Add New User'}</h2>
      {err && <p className="error">{err}</p>}
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label>Name:</label>
          <input name="name" value={form.name} onChange={handleChange} placeholder="John Doe" />
        </div>
        <div className="field">
          <label>Email:</label>
          <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="john@example.com" />
        </div>
        <div className="field">
          <label>Age:</label>
          <input name="age" type="number" value={form.age} onChange={handleChange} placeholder="25" />
        </div>
        <div className="form-btns">
          <button type="submit">{editUser ? 'Update' : 'Add User'}</button>
          {editUser && <button type="button" onClick={onCancel}>Cancel</button>}
        </div>
      </form>
    </div>
  );
}
