import { useParams } from 'react-router-dom';

export default function CategoryView() {
  const { categorySlug } = useParams();
  return <h1>Category View — Category: {categorySlug}</h1>;
}