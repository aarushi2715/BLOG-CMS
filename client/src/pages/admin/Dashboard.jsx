import { Link } from 'react-router-dom';
import PostTable from '../../components/admin/PostTable';

export default function Dashboard() {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <Link to="/admin/posts/new">+ Create New Post</Link>
      <PostTable />
    </div>
  );
}