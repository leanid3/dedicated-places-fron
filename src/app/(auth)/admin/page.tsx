'use client'
import useAuth from "@/lib/hooks/useAuth";

const AdminPage = () => {
    
    const { user, loading, error, isAuthenticated} = useAuth();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!isAuthenticated || user?.role !== 'admin') {
        return <div>Not authenticated</div>;
    }
    
    return (
        <div>
            <div>
                <h1>Admin Page</h1>
                <p>Welcome, {user.name}</p>
            </div>
        </div>
    );
};

export default AdminPage;