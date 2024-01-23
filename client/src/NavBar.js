import { NavLink, useNavigate } from 'react-router-dom';
import './style/Navbar.css'

const Navbar = () => {
  const navigate = useNavigate()


  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
    window.location.reload()
  };

  
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <NavLink to="/home" className="navLogo">
            <img src='https://static.vecteezy.com/system/resources/previews/001/918/865/large_2x/management-icon-on-white-vector.jpg' alt='icon' />
        </NavLink>
      </div>
      <div className="navbar-right">
        <NavLink to="/home" activeClassName="active-link" className="active">Home</NavLink>
        <NavLink to="/dash" activeClassName="active-link" className="active">Dash</NavLink>
        <button onClick={handleLogout} className='logout'>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
