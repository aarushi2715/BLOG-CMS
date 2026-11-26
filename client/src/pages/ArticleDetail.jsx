import { useParams } from 'react-router-dom';

export default function ArticleDetail() {
  const { slug } = useParams();
  return <h1>Article Detail — Slug: {slug}</h1>;
}