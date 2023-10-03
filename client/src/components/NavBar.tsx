import { NavLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="nav nav-pills nav-fill p-2">
      <NavLink to="/" className="nav-link" aria-current="page">
        Today's Entry
      </NavLink>
      <NavLink to="/history" className="nav-link">
        History
      </NavLink>
      <NavLink to="/graph" className="nav-link" aria-disabled="true">
        Graph
      </NavLink>
      <NavLink to="/options" className="nav-link">
        Options
      </NavLink>
    </nav>
  );
};

export default NavBar;
