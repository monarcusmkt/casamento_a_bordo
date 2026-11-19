import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./contexts/AuthContext";
import { HelmetProvider } from "react-helmet-async";
import { ProtectedLayout } from "./components/admin/ProtectedLayout";

// Lazy Load Pages
const AdminLogin = lazy(() => import("./pages/admin/Login"));
const AdminUsers = lazy(() => import("./pages/admin/Users"));
const AdminDashboard = lazy(() => import("./pages/admin/Dashboard"));
const NewPost = lazy(() => import("./pages/admin/NewPost"));
const EditPost = lazy(() => import("./pages/admin/EditPost"));
const BlogList = lazy(() => import("./pages/blog/BlogList"));
const BlogPost = lazy(() => import("./pages/blog/BlogPost"));
const PoliticaPrivacidade = lazy(() => import("./pages/PoliticaPrivacidade"));
const LGPDPage = lazy(() => import("./pages/LGPD"));


const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-background"><div className="w-8 h-8 animate-spin rounded-full border-4 border-primary border-t-transparent" /></div>}>
            <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
              <Routes>
                <Route path="/" element={<Index />} />

                {/* Public Blog */}
                <Route path="/blog" element={<BlogList />} />
                <Route path="/blog/:slug" element={<BlogPost />} />

                {/* Admin Auth */}
                <Route path="/admin/login" element={<AdminLogin />} />

                {/* Protected Admin Routes */}
                <Route path="/admin" element={<ProtectedLayout />}>
                  <Route index element={<AdminDashboard />} />
                  <Route path="posts" element={<AdminDashboard />} />
                  <Route path="usuarios" element={<AdminUsers />} />
                  <Route path="novo-post" element={<NewPost />} />
                  <Route path="editar-post/:id" element={<EditPost />} />
                </Route>

                {/* Legal Pages */}
                <Route path="/politica-de-privacidade" element={<PoliticaPrivacidade />} />
                <Route path="/lgpd" element={<LGPDPage />} />

                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </Suspense>
        </TooltipProvider>
      </QueryClientProvider>
    </AuthProvider>
  </HelmetProvider>
);

export default App;
