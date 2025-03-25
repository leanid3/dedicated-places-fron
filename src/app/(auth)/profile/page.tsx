import ProtectedRoute from "@/components/auth/ProtectedRoute";
import useAuth from "@/lib/hooks/useAuth";


const ProfilePage = () => {
  const { user, checkAuth } = useAuth();
  return (
    <ProtectedRoute>
      <div>
        //а вот тут имя и почта (тестовый коммит)
        {user?.name}
        {user?.email}
      </div>
    </ProtectedRoute>
  );
};

export default ProfilePage;
