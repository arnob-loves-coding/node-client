import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);
  const handleDelete = (id) => {
    const url = `http://localhost:5000/users/${id}`;
    fetch(url, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount) {
          const remainingUsers = users.filter((user) => user._id !== id);
          setUsers(remainingUsers);
        }
      });
  };
  return (
    <div>
      <h1>{users.length}</h1>
      {users.map((user) => (
        <li key={user._id}>
          {user._id}
          <Link to={`/users/update/${user._id}`}>
            <button>update</button>
          </Link>
          <button onClick={(id) => handleDelete(user._id)}>X</button>
        </li>
      ))}
    </div>
  );
};

export default Users;
