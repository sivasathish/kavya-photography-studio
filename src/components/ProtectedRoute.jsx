import { Navigate } from 'react-router-dom';
import { useAuthState } from '../hooks/useAuthState';

function ProtectedRoute({ children }) {
  const { user, loading } = useAuthState();

  // Wait for Firebase to resolve the auth state before redirecting
  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <p>Verifying session...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
