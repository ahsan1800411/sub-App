import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const token = localStorage.getItem('token');
  return (
    <Nav>
      <Nav.Item style={{ marginRight: '110rem', fontSize: '1.5rem' }}>
        <Link className='class-link' to='/'>
          Home
        </Link>
      </Nav.Item>
      {token && (
        <Nav.Item style={{ fontSize: '1.5rem' }}>
          <Link className='class-link ' to='/'>
            Logout
          </Link>
        </Nav.Item>
      )}
    </Nav>
  );
};

export default Navbar;
