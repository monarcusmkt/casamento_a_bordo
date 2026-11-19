import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { blogApi } from "../../lib/blogApi";
import { useAuth } from "../../contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Save, Upload, Loader2, Image as ImageIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

// Helper para gerar slug amigável
const generateSlug = (text: string) => {
    return text
        .toString()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]+/g, "")
        .replace(/--+/g, "-");
};

export default function NewPost() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const { toast } = useToast();

    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [excerpt, setExcerpt] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("");
    const [metaTitle, setMetaTitle] = useState("");
    const [metaDescription, setMetaDescription] = useState("");
    const [published, setPublished] = useState(false);

    const [coverImage, setCoverImage] = useState<File | null>(null);
    const [previewImage, setPreviewImage] = useState<string>("");

    const [isSaving, setIsSaving] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Auto gera o slug e o meta title quando o título muda (se o usuário ainda não tiver customizado)
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTitle = e.target.value;
        setTitle(newTitle);
        setSlug(generateSlug(newTitle));
        setMetaTitle(`${newTitle} | Casamento a Bordo`);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setCoverImage(file);
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const handleSave = async () => {
        if (!title || !content) {
            toast({
                variant: "destructive",
                title: "Erro de Validação",
                description: "Título e Conteúdo são obrigatórios.",
            });
            return;
        }

        setIsSaving(true);
        let coverImageUrl = "";

        try {
            // 1. Upload Cover Image (if exists)
            if (coverImage) {
                coverImageUrl = await blogApi.upload(coverImage);
            }

            // 2. Insert Post Row
            await blogApi.create({title,slug,content,excerpt,cover_image:coverImageUrl,category,meta_title:metaTitle,meta_description:metaDescription,published});

            toast({
                title: "Sucesso!",
                description: published ? "Artigo publicado com sucesso." : "Rascunho salvo com sucesso.",
            });

            // Voltamos para o dashboard
            navigate("/admin/posts");

        } catch (error: any) {
            console.error(error);
            toast({
                variant: "destructive",
                title: "Ops! Ocorreu um erro",
                description: error.message || "Tente novamente mais tarde.",
            });
        } finally {
            setIsSaving(false);
        }
    };

    // Configurações do ReactQuill Toolbar
    const modules = {
        toolbar: [
            [{ 'header': [2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['link', 'image'],
            ['clean']
        ],
    };

    return (
        <div className="space-y-8 max-w-5xl mx-auto">
            <div className="flex items-center justify-between bg-white p-4 rounded-2xl shadow-sm border border-border sticky top-4 z-50">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" onClick={() => navigate("/admin/posts")}>
                        <ArrowLeft size={20} />
                    </Button>
                    <h1 className="text-xl font-bold">Novo Artigo</h1>
                </div>
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                        <Switch
                            id="publish-mode"
                            checked={published}
                            onCheckedChange={setPublished}
                        />
                        <Label htmlFor="publish-mode" className="font-bold cursor-pointer">
                            {published ? "Publicar" : "Rascunho"}
                        </Label>
                    </div>
                    <Button onClick={handleSave} disabled={isSaving} className="gap-2 bg-primary hover:bg-primary/90">
                        {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                        Salvar
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Editor Principal (2 colunas) */}
                <div className="col-span-1 lg:col-span-2 space-y-6">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-border space-y-6">
                        <div className="space-y-2">
                            <Label className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Título do Artigo</Label>
                            <Input
                                value={title}
                                onChange={handleTitleChange}
                                placeholder="Ex: Como planejar um casamento no mar"
                                className="text-2xl font-bold h-14"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Conteúdo</Label>
                            <div className="min-h-[400px]">
                                <ReactQuill
                                    theme="snow"
                                    value={content}
                                    onChange={setContent}
                                    modules={modules}
                                    className="h-[350px]"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-border space-y-4">
                        <h3 className="font-bold text-lg mb-4 text-primary">Resumo (Excerpt)</h3>
                        <Textarea
                            value={excerpt}
                            onChange={(e) => setExcerpt(e.target.value)}
                            placeholder="Um breve resumo do artigo que aparecerá nos cards da listagem..."
                            className="resize-none h-24"
                        />
                    </div>
                </div>

                {/* Sidebar Configurações (1 coluna) */}
                <div className="col-span-1 space-y-6">

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-border space-y-6">
                        <h3 className="font-bold text-lg border-b pb-2 text-primary">Capa do Artigo</h3>

                        <div
                            onClick={() => fileInputRef.current?.click()}
                            className="border-2 border-dashed border-border rounded-xl aspect-video flex flex-col items-center justify-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-all overflow-hidden relative group"
                        >
                            {previewImage ? (
                                <>
                                    <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <span className="text-white font-medium flex gap-2 items-center"><Upload size={18} /> Trocar Capa</span>
                                    </div>
                                </>
                            ) : (
                                <div className="text-center p-4">
                                    <ImageIcon className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                                    <p className="text-sm text-muted-foreground font-medium">Clique para fazer upload</p>
                                    <p className="text-xs text-muted-foreground/60 mt-1">Recomendado: 1200x630px JPG, PNG, WEBP</p>
                                </div>
                            )}
                        </div>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleImageChange}
                            accept="image/*"
                            className="hidden"
                        />
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-border space-y-6">
                        <h3 className="font-bold text-lg border-b pb-2 text-primary">Organização</h3>
                        <div className="space-y-2">
                            <Label>Categoria</Label>
                            <Input
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                placeholder="Ex: Cerimônias, Dicas, Destinos"
                            />
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-border space-y-6">
                        <h3 className="font-bold text-lg border-b pb-2 text-primary">SEO (Google)</h3>

                        <div className="space-y-2">
                            <Label>URL Amigável (Slug)</Label>
                            <Input value={slug} onChange={(e) => setSlug(e.target.value)} />
                            <p className="text-xs text-muted-foreground">O endereço final será: /blog/<strong>{slug || '...'}</strong></p>
                        </div>

                        <div className="space-y-2">
                            <Label>Meta Title</Label>
                            <Input value={metaTitle} onChange={(e) => setMetaTitle(e.target.value)} />
                        </div>

                        <div className="space-y-2">
                            <Label>Meta Description</Label>
                            <Textarea
                                value={metaDescription}
                                onChange={(e) => setMetaDescription(e.target.value)}
                                className="h-20 resize-none text-sm"
                                maxLength={160}
                                placeholder="O texto que aparece nos resultados do Google (máx 160 caracteres)."
                            />
                            <p className="text-xs text-muted-foreground text-right">{metaDescription.length}/160</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
