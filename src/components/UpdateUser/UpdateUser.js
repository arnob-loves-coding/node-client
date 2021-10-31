import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

const UpdateUser = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});
  useEffect(() => {
    fetch(`http://localhost:5000/users/${id}`)
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, []);
  const handleNameChange = (e) => {
    const updateName = e.target.value;
    const changedUser = { name: updateName, email: user.email };
    setUser(changedUser);
  };
  const handleEmailChange = (e) => {
    const updateEmail = e.target.value;
    const changedUser = { name: user.name, email: updateEmail };
    setUser(changedUser);
  };
  const handleUpdate = (e) => {
    e.preventDefault();
    fetch(`http://localhost:5000/users/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };
  return (
    <div>
      <h1>name :{user.name}</h1>
      <h1>email :{user.email}</h1>
      <p>{id}</p>
      <form onSubmit={handleUpdate}>
        <input
          type="text"
          value={user.name || ""}
          onChange={handleNameChange}
        />
        <input
          type="email"
          value={user.email || ""}
          onChange={handleEmailChange}
        />
        <input type="submit" value="Update" />
      </form>
    </div>
  );
};

export default UpdateUser;
