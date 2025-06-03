import React from 'react';
import type { UserData } from "../types/UserData"; // Adjust the import path as necessary

// ==============================
// TODO: Props Definition
// ==============================

interface UserListProps {
  users: UserData[] | null; 
  // NOTE `users` can be null or an array of user objects from the API
}

// ==============================
// TODO: UserList Component
// ==============================

const UserList: React.FC<UserListProps> = ({ users }) => {
  return (
    <>
      <h2 className="pb-5">
        Check out all your friends!
      </h2>

      {/* TODO: Map and render user cards */}
      {users && users.map((user) => (
        <div className="row align-center mb-5" key={user.id}>
          <div className="col-md-6">
            <h3>{user.id}. {user.username}</h3>
          </div>
          <div className="col-md-6">
            <h4>
              <a href={`mailto:${user.email}`}>{user.email}</a>
            </h4>
          </div>
        </div>
      ))}
    </>
  );
};

export default UserList;
// NOTE Used to render a list of user data from /api/users