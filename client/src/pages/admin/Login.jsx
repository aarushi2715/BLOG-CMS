import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleTestLogin = () => {
    login('dummy-token-123');
    navigate('/admin');
  };

  return (
    <div>
      <h1>Admin Login</h1>
      <button onClick={handleTestLogin}>Simulate Login</button>
    </div>
  );
}