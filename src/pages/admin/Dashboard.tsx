import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { blogApi } from "../../lib/blogApi";
import { Button } from "@/components/ui/button";
import { LogOut, Plus, Edit, Trash2, Globe, FileText, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

type Post = {
    id: string;
    title: string;
    slug: string;
    published: boolean;
    created_at: string;
    updated_at: string;
};

export default function AdminDashboard() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const { toast } = useToast();

    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchPosts = async () => {
        setLoading(true);
        try { setPosts(await blogApi.list()); }
        catch(error) { toast({variant:"destructive",title:"Erro ao buscar posts",description:String(error)}); }
        finally {setLoading(false);}
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const handleSignOut = async () => {
        await logout();
        navigate("/admin/login");
    };

    const handleDelete = async (id: string, title: string) => {
        if (!window.confirm(`Tem certeza que deseja deletar o post "${title}"? Esta ação não pode ser desfeita.`)) {
            return;
        }

        try { await blogApi.remove(id); toast({title:"Post deletado com sucesso"}); await fetchPosts(); }
        catch(error) {toast({variant:"destructive",title:"Erro",description:String(error)});}
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">Artigos Publicados</h1>
                    <p className="text-muted-foreground mt-1">
                        Gerencie o blog do site Casamento a Bordo
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    <Button onClick={() => navigate("/admin/novo-post")} className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground">
                        <Plus size={16} />
                        Escrever Artigo
                    </Button>
                    <Button variant="ghost" onClick={handleSignOut} className="gap-2 text-muted-foreground hover:text-destructive">
                        <LogOut size={16} />
                        Sair
                    </Button>
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center py-20">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
            ) : posts.length === 0 ? (
                <div className="bg-card rounded-2xl border shadow-sm p-12 text-center">
                    <div className="max-w-sm mx-auto space-y-4">
                        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                            <span className="text-muted-foreground font-medium text-xl">0</span>
                        </div>
                        <h3 className="text-lg font-bold">Nenhum artigo ainda</h3>
                        <p className="text-muted-foreground text-sm">
                            Comece criando o primeiro artigo pro seu blog para atrair mais tráfego qualificado de SEO.
                        </p>
                        <Button onClick={() => navigate("/admin/novo-post")} variant="outline" className="mt-4">
                            Meus primeiros rascunhos
                        </Button>
                    </div>
                </div>
            ) : (
                <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-muted/50 text-muted-foreground text-xs uppercase tracking-wider">
                                <tr>
                                    <th className="px-6 py-4 font-bold">Título do Artigo</th>
                                    <th className="px-6 py-4 font-bold">Status</th>
                                    <th className="px-6 py-4 font-bold hidden md:table-cell">Última Edição</th>
                                    <th className="px-6 py-4 font-bold text-right">Ações</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {posts.map((post) => (
                                    <tr key={post.id} className="hover:bg-muted/30 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="font-bold text-foreground mb-1">{post.title}</div>
                                            <div className="text-xs text-muted-foreground">/blog/{post.slug}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {post.published ? (
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                                                    <Globe size={12} /> Publicado
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800">
                                                    <FileText size={12} /> Rascunho
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-muted-foreground hidden md:table-cell">
                                            {format(new Date(post.updated_at), "dd 'de' MMMM, yyyy", { locale: ptBR })}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => navigate(`/admin/editar-post/${post.id}`)}
                                                    title="Editar"
                                                >
                                                    <Edit size={18} className="text-primary" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => handleDelete(post.id, post.title)}
                                                    title="Excluir"
                                                    className="hover:text-destructive hover:bg-destructive/10"
                                                >
                                                    <Trash2 size={18} className="text-destructive/70" />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}
