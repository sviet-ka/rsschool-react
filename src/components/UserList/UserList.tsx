import { useAppSelector } from '../../app/hooks';

export const UserList: React.FC = () => {
  const users = useAppSelector((state) => state.users.userList);

  return (
    <div>
      <table className="users-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Email</th>
            <th>Password</th>
            <th>Gender</th>
            <th>Picture</th>
            <th>Country</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.age}</td>
              <td>{user.email}</td>
              <td>{user.password}</td>
              <td>{user.gender}</td>
              <td>{user.picture}</td>
              <td>{user.country}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
