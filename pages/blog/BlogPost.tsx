import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Loader2, ArrowLeft } from "lucide-react";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { Helmet } from "react-helmet-async";

type Post = {
    id: string;
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    cover_image: string;
    category: string;
    meta_title: string;
    meta_description: string;
    created_at: string;
    updated_at: string;
};

export default function BlogPost() {
    const { slug } = useParams<{ slug: string }>();
    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchPost() {
            if (!slug) return;
            const { data } = await supabase
                .from('posts')
                .select('*')
                .eq('slug', slug)
                .eq('published', true)
                .single();

            setPost(data);
            setLoading(false);
        }
        fetchPost();
    }, [slug]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <Loader2 className="w-10 h-10 animate-spin text-accent" />
            </div>
        );
    }

    if (!post) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4 text-center">
                <h1 className="text-4xl font-playfair font-bold mb-4">Artigo Não Encontrado</h1>
                <p className="text-muted-foreground mb-8">O conteúdo que você procura foi removido ou não está publicado.</p>
                <Link to="/blog" className="px-8 py-4 bg-accent text-white rounded-full font-bold hover:bg-accent/90 transition-all">
                    Voltar para o Blog
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-background flex flex-col min-h-screen">
            <Helmet>
                <title>{post.meta_title || `${post.title} | Casamento a Bordo`}</title>
                <meta name="description" content={post.meta_description || post.excerpt} />
                {post.cover_image && <meta property="og:image" content={post.cover_image} />}
                <meta property="og:title" content={post.meta_title || post.title} />
                <meta property="og:description" content={post.meta_description || post.excerpt} />
                <meta property="og:type" content="article" />
            </Helmet>

            <Header />

            <main className="flex-grow pt-24">
                <article className="pb-24">

                    {/* Post Header */}
                    <header className="container-custom max-w-4xl pt-16 pb-12 text-center">
                        <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-muted-foreground hover:text-accent mb-8 transition-colors">
                            <ArrowLeft size={16} /> Voltar ao Diário de Bordo
                        </Link>

                        {post.category && (
                            <div className="mb-6">
                                <span className="bg-accent/10 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-accent">
                                    {post.category}
                                </span>
                            </div>
                        )}

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-foreground mb-6 leading-tight">
                            {post.title}
                        </h1>

                        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                            {post.excerpt}
                        </p>

                        <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                            <span>Publicado em {format(new Date(post.created_at), "dd 'de' MMMM, yyyy", { locale: ptBR })}</span>
                        </div>
                    </header>

                    {/* Cover Image */}
                    {post.cover_image && (
                        <div className="container-custom max-w-5xl mb-16">
                            <div className="aspect-[21/9] rounded-3xl overflow-hidden shadow-elevated">
                                <img
                                    src={post.cover_image}
                                    alt={post.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    )}

                    {/* Post Content */}
                    <div className="container-custom max-w-3xl">
                        {/* 
              Quill CSS requires wrapper classes `.ql-editor` to properly style lists, 
              blockquote, etc. We also use Prose (Tailwind Typography) if configured, 
              but since we didn't add the plugin, we use custom targeting or Quill defaults.
            */}
                        <div
                            className="ql-editor prose prose-lg prose-headings:font-playfair prose-headings:text-foreground prose-a:text-accent hover:prose-a:text-accent/80 mx-auto"
                            dangerouslySetInnerHTML={{ __html: post.content }}
                        />
                    </div>

                </article>
            </main>

            <Footer />
        </div>
    );
}
