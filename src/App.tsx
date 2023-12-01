import { NavLink, Outlet } from 'react-router-dom';

function App() {
  return (
    <>
      <div>
        <NavLink to="uncontrolled-form">Link to uncontrolled form</NavLink>
      </div>

      <div>
        <NavLink to="controlled-form">Link to controlled form</NavLink>
      </div>

      <Outlet></Outlet>
    </>
  );
}

export default App;
