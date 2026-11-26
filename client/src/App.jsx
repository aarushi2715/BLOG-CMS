
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import ArticleDetail from './pages/ArticleDetail';
import CategoryView from './pages/CategoryView';
import NotFound from './pages/NotFound';

import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import PostCreate from './pages/admin/PostCreate';
import PostEdit from './pages/admin/PostEdit';

import ProtectedRoute from './components/common/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/layout/Navbar';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />

        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />

          <Route
            path="/articles/:slug"
            element={<ArticleDetail />}
          />

          <Route
            path="/category/:categorySlug"
            element={<CategoryView />}
          />

          <Route
            path="/admin/login"
            element={<Login />}
          />

          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route
              path="/admin"
              element={<Dashboard />}
            />

            <Route
              path="/admin/posts/new"
              element={<PostCreate />}
            />

            <Route
              path="/admin/posts/:id/edit"
              element={<PostEdit />}
            />
          </Route>

          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>

      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
