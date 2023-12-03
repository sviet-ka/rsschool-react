import { NavLink, Outlet } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <div>
        <NavLink to="uncontrolled-form">Link to uncontrolled form</NavLink>
      </div>

      <div>
        <NavLink to="controlled-form">Link to controlled form</NavLink>
      </div>

      <Outlet></Outlet>
      <div />
    </div>
  );
}

export default App;
