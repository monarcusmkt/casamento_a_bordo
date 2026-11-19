import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { Loader2 } from "lucide-react";

export const ProtectedLayout = () => {
    const { session, loading } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    if (!session) {
        return <Navigate to="/admin/login" replace />;
    }

    // Admin layout wrapper
    return (
        <div className="min-h-screen bg-muted/30">
            {/* Aqui entrará um Header ou Sidebar simples do Admin futuramente */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Outlet />
            </main>
        </div>
    );
};
