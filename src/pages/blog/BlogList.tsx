import { useEffect, useState } from "react";
import { blogApi } from "../../lib/blogApi";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Loader2 } from "lucide-react";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { Helmet } from "react-helmet-async";

type Post = {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    cover_image: string;
    category: string;
    created_at: string;
};

export default function BlogList() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchPosts() {
            try { setPosts((await blogApi.list()).filter(p=>p.published)); } catch {setPosts([]);}
            setLoading(false);
        }
        fetchPosts();
    }, []);

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Helmet>
                <title>Blog | Casamento a Bordo - Dicas e Guias</title>
                <meta name="description" content="Tudo o que você precisa saber sobre casamentos em cruzeiros. Dicas, destinos, planejamento e muito mais com a Lovetrips On Board." />
            </Helmet>

            <Header />

            <main className="flex-grow pt-32 pb-24">
                <div className="container-custom">

                    <div className="text-center mb-16 animate-fade-in">
                        <h1 className="text-4xl md:text-5xl font-playfair font-bold text-foreground mb-6">
                            Diário de Bordo
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Inspirações, guias completos e tudo o que você precisa saber para transformar seu sonho de casar no mar em uma realidade inesquecível.
                        </p>
                    </div>

                    {loading ? (
                        <div className="flex justify-center py-20">
                            <Loader2 className="w-10 h-10 animate-spin text-accent" />
                        </div>
                    ) : posts.length === 0 ? (
                        <div className="text-center py-20 text-muted-foreground bg-white rounded-3xl border shadow-sm">
                            <p className="text-lg">Nenhum artigo publicado ainda. Volte em breve!</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {posts.map((post) => (
                                <div key={post.id} className="group bg-white rounded-3xl border shadow-sm overflow-hidden hover:shadow-elevated transition-all duration-500 flex flex-col h-full animate-fade-in">
                                    <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                                        {post.cover_image ? (
                                            <img
                                                src={post.cover_image}
                                                alt={post.title}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-muted-foreground/30">
                                                SEM CAPA
                                            </div>
                                        )}
                                        {post.category && (
                                            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-accent shadow-sm">
                                                {post.category}
                                            </div>
                                        )}
                                    </div>

                                    <div className="p-8 flex flex-col flex-grow">
                                        <div className="text-sm text-muted-foreground mb-3 font-medium">
                                            {format(new Date(post.created_at), "dd 'de' MMMM, yyyy", { locale: ptBR })}
                                        </div>

                                        <h2 className="text-xl md:text-2xl font-bold font-playfair mb-3 group-hover:text-accent transition-colors line-clamp-2">
                                            {post.title}
                                        </h2>

                                        <p className="text-muted-foreground line-clamp-3 mb-6 flex-grow">
                                            {post.excerpt}
                                        </p>

                                        <Link
                                            to={`/blog/${post.slug}`}
                                            className="inline-block mt-auto font-bold uppercase tracking-widest text-sm text-foreground hover:text-accent transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-px after:bg-accent hover:after:w-full after:transition-all after:duration-300"
                                        >
                                            Ler Artigo Completo
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="container-custom mt-20 flex justify-center">
                    <Link
                        to="/admin/login"
                        className="text-xs text-muted-foreground/40 hover:text-accent transition-colors flex items-center gap-2"
                        title="Acesso Restrito"
                    >
                        Área da Tripulação
                    </Link>
                </div>
            </main>

            <Footer />
        </div>
    );
}
