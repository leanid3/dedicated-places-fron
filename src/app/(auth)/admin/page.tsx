'use client'
import useAuth from "@/lib/hooks/useAuth";

const AdminPage = () => {
    const { user, loading, error, isAuthenticated} = useAuth();

    

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <strong className="font-bold">Error: </strong>
                    <span className="block sm:inline">{error}</span>
                </div>
            </div>
        );
    }

    if (!isAuthenticated || user?.role !== 'admin') {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative" role="alert">
                    <strong className="font-bold">Access Denied: </strong>
                    <span className="block sm:inline">You are not authorized to view this page.</span>
                </div>
            </div>
        );
    }
    
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <div className="bg-white shadow rounded-lg p-6">
                        <div className="border-b border-gray-200 pb-4 mb-4">
                            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                            <p className="mt-2 text-sm text-gray-600">Welcome back, {user.name}</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {/* Add your admin dashboard cards/widgets here */}
                            <div className="bg-blue-50 p-6 rounded-lg shadow-sm">
                                <h3 className="text-lg font-medium text-blue-900">Quick Stats</h3>
                                <p className="mt-2 text-sm text-blue-700">Coming soon...</p>
                            </div>
                            <div className="bg-green-50 p-6 rounded-lg shadow-sm">
                                <h3 className="text-lg font-medium text-green-900">Recent Activity</h3>
                                <p className="mt-2 text-sm text-green-700">Coming soon...</p>
                            </div>
                            <div className="bg-purple-50 p-6 rounded-lg shadow-sm">
                                <h3 className="text-lg font-medium text-purple-900">System Status</h3>
                                <p className="mt-2 text-sm text-purple-700">Coming soon...</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPage;