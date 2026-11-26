import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav style={{ display: 'flex', gap: '12px', padding: '12px', borderBottom: '1px solid #ccc' }}>
      <Link to="/">Home</Link>
      <Link to="/articles/sample-post">Sample Article</Link>
      <Link to="/category/tech">Tech Category</Link>
      <Link to="/admin">Dashboard</Link>
      <Link to="/admin/posts/new">New Post</Link>
      <Link to="/admin/posts/123/edit">Edit Post 123</Link>
      {isAuthenticated ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <Link to="/admin/login">Login</Link>
      )}
    </nav>
  );
}