import { useContext } from 'react';
import { Nav } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context';

const Navbar = () => {
  const [state, setState] = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setState({ data: null, error: null, loading: true });
    navigate('/');
  };
  return (
    <Nav>
      <Nav.Item style={{ marginRight: '110rem', fontSize: '1.5rem' }}>
        <Link className='class-link' to='/'>
          Home
        </Link>
      </Nav.Item>
      {state.data && (
        <Nav.Item style={{ fontSize: '1.5rem' }} onClick={handleLogout}>
          <Nav.Link>Logout</Nav.Link>
        </Nav.Item>
      )}
    </Nav>
  );
};

export default Navbar;
