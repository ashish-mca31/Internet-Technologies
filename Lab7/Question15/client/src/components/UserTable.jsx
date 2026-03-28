import React from 'react';

export default function UserTable({ users, loading, onEdit, onDelete, sortBy, order, onSort }) {
  if (loading) return <p>Loading...</p>;
  if (users.length === 0) return <p>No users found.</p>;

  const arrow = (field) => sortBy === field ? (order === 'asc' ? ' ▲' : ' ▼') : '';

  return (
    <table border="1" cellPadding="8" cellSpacing="0" width="100%">
      <thead>
        <tr style={{ backgroundColor: '#f0f0f0' }}>
          <th style={{ cursor: 'pointer' }} onClick={() => onSort('name')}>Name{arrow('name')}</th>
          <th style={{ cursor: 'pointer' }} onClick={() => onSort('email')}>Email{arrow('email')}</th>
          <th style={{ cursor: 'pointer' }} onClick={() => onSort('age')}>Age{arrow('age')}</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id} style={{ opacity: user._pending ? 0.5 : 1 }}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.age || '—'}</td>
            <td>
              <button onClick={() => onEdit(user)}>Edit</button>{' '}
              <button onClick={() => onDelete(user.id)} style={{ color: 'red' }}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
