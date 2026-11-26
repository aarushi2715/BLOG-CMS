import { Link, useParams } from 'react-router-dom';

export default function PostEdit() {
  const { id } = useParams();

  return (
    <div>
      <h1>Edit Post — ID: {id}</h1>
      <p>PostEdit placeholder — your shared PostForm will load post {id} here.</p>
      <Link to="/admin">Back to Dashboard</Link>
    </div>
  );
}