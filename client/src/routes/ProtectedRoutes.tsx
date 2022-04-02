import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../context';

interface ProtectedRoutesProps {
  children: any;
}

const ProtectedRoutes = ({ children }: ProtectedRoutesProps) => {
  const [state] = useContext(UserContext);
  if (!state.data) {
    return <Navigate to='/' />;
  }

  return children;
};

export default ProtectedRoutes;
