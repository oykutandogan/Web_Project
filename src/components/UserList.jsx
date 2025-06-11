import React from "react";

function UserList({ users }) {
  return (
    <div>
      <h2>Kullanıcı Listesi</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name} ({user.email})</li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;