import { Link, useParams } from 'react-router-dom';
import PostForm from '../../components/admin/PostForm';

export default function PostEdit() {
  const { id } = useParams();

  return (
    <div>
      <h1>Edit Post — ID: {id}</h1>
      <PostForm
        mode="edit"
        initialData={{ title: `Sample Post ${id}`, content: 'Placeholder content to edit...' }}
      />
      <Link to="/admin">Back to Dashboard</Link>
    </div>
  );
}