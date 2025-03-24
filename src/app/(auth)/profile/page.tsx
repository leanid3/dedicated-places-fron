import ProtectedRoute from "@/components/auth/ProtectedRoute";
import useAuth from "@/lib/hooks/useAuth";


const ProfilePage = () => {
  const { user, checkAuth } = useAuth();
  return (
    <ProtectedRoute>
      <div>
        {user?.name}
        {user?.email}
      </div>
    </ProtectedRoute>
  );
};

export default ProfilePage;
