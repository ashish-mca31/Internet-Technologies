import React, { useState, useEffect } from 'react';
import UserForm   from './components/UserForm';
import UserTable  from './components/UserTable';
import Pagination from './components/Pagination';
import { useUsers } from './hooks/useUsers';
import './App.css';

export default function App() {
  const {
    users, total, totalPages, loading, error, message,
    fetchUsers, addUser, editUser, removeUser,
  } = useUsers();

  const [search,   setSearch]   = useState('');
  const [sortBy,   setSortBy]   = useState('name');
  const [order,    setOrder]    = useState('asc');
  const [page,     setPage]     = useState(1);
  const [selected, setSelected] = useState(null); // user being edited

  // Re-fetch whenever search/sort/page changes
  useEffect(() => {
    fetchUsers({ search, sortBy, order, page, limit: 5 });
  }, [search, sortBy, order, page]);

  const handleSort = (field) => {
    if (sortBy === field) {
      setOrder(order === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setOrder('asc');
    }
    setPage(1);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this user?')) removeUser(id);
  };

  return (
    <div className="container">
      <h1>User Manager</h1>

      {message && <p className="success">{message}</p>}
      {error   && <p className="error">{error}</p>}

      {/* Add / Edit form */}
      <UserForm
        editUser={selected}
        onSubmit={(data) => {
          if (selected) {
            editUser(selected.id, data, () => setSelected(null));
          } else {
            addUser(data);
          }
        }}
        onCancel={() => setSelected(null)}
      />

      <hr />

      {/* Search */}
      <div style={{ marginBottom: '10px' }}>
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={handleSearch}
          style={{ padding: '5px', width: '250px' }}
        />
        <span style={{ marginLeft: '10px', color: '#555' }}>Total: {total} user(s)</span>
      </div>

      {/* Table */}
      <UserTable
        users={users}
        loading={loading}
        sortBy={sortBy}
        order={order}
        onSort={handleSort}
        onEdit={(user) => { setSelected(user); window.scrollTo(0, 0); }}
        onDelete={handleDelete}
      />

      {/* Pagination */}
      <Pagination page={page} totalPages={totalPages} onPage={setPage} />
    </div>
  );
}
