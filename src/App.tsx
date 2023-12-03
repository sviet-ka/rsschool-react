import { NavLink } from 'react-router-dom';
import { UserList } from './components/UserList/UserList';

function App() {
  return (
    <div className="App">
      <div>
        <NavLink to="uncontrolled-form">Uncontrolled form</NavLink>
      </div>

      <div>
        <NavLink to="controlled-form">Controlled form</NavLink>
      </div>

      <UserList></UserList>
      <div />
    </div>
  );
}

export default App;
