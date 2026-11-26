import { Link } from 'react-router-dom';

const SAMPLE_POSTS = [
  { _id: '101', title: 'First Sample Article', category: { name: 'Tech' }, status: 'published' },
  { _id: '102', title: 'Second Sample Draft', category: { name: 'Design' }, status: 'draft' },
];

export default function PostTable({ posts = SAMPLE_POSTS, onDelete }) {
  return (
    <table border="1" cellPadding="8" style={{ width: '100%', borderCollapse: 'collapse', marginTop: '16px' }}>
      <thead>
        <tr>
          <th>Title</th>
          <th>Category</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {posts.length === 0 ? (
          <tr>
            <td colSpan="4">No posts found.</td>
          </tr>
        ) : (
          posts.map((post) => (
            <tr key={post._id}>
              <td>{post.title}</td>
              <td>{post.category?.name || 'Uncategorized'}</td>
              <td>{post.status || 'published'}</td>
              <td style={{ display: 'flex', gap: '8px' }}>
                <Link to={`/admin/posts/${post._id}/edit`}>Edit</Link>
                <button
                  type="button"
                  onClick={() => (onDelete ? onDelete(post._id) : console.log('Delete post:', post._id))}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}