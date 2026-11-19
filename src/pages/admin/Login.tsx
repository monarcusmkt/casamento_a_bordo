import { useState } from "react";
import { blogApi } from "../../lib/blogApi";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Ship } from "lucide-react";

export default function AdminLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { refresh } = useAuth();
    const { toast } = useToast();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await blogApi.login(email,password);
            await refresh();
            navigate("/admin");
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Erro ao acessar",
                description: "Credenciais inválidas. Verifique os dados digitados.",
            });
        } finally { setLoading(false); }
    };

    return (
        <div className="min-h-screen bg-navy text-pearl flex items-center justify-center relative p-4">
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 -left-32 w-96 h-96 bg-accent/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-secondary/10 rounded-full blur-[100px]" />
            </div>

            <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-elevated relative z-10">
                <div className="flex justify-center mb-8">
                    <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-pearl">
                        <Ship size={32} />
                    </div>
                </div>

                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold mb-2">Painel de Bordo</h1>
                    <p className="text-pearl/60 text-sm">Use suas credenciais para gerenciar os artigos e SEO do site.</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-pearl/80">E-mail</label>
                        <Input
                            type="email"
                            placeholder="seu@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="bg-white/5 border-white/10 text-pearl placeholder:text-pearl/30 focus-visible:ring-accent"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-pearl/80">Senha</label>
                        <Input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="bg-white/5 border-white/10 text-pearl placeholder:text-pearl/30 focus-visible:ring-accent"
                        />
                    </div>

                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-accent hover:bg-accent/90 text-white rounded-xl h-12 mt-4 transition-all duration-300"
                    >
                        {loading ? "Autenticando..." : "Entrar no Painel"}
                    </Button>
                </form>
            </div>
        </div>
    );
}
